import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

type HttpRequestCacheMethod = (...args: any[]) => Observable<any>;

export class CacheStorage {
  private static instance: CacheStorage;
  private readonly storage: Record<string, any> = {};

  private constructor() {}

  static getInstance(): CacheStorage {
    if (!CacheStorage.instance) {
      CacheStorage.instance = new CacheStorage();
    }

    return CacheStorage.instance;
  }

  setItem(key: string, item: Observable<any>): void {
    this.storage[key] = item;
  }

  getItem(key: string): Observable<any> | undefined {
    return this.storage[key];
  }
}

/*
 *  Caches an Http Request. Should be applied on a method returning Observable
 */
export function HttpRequestCache() {
  return (
    target: Record<string, any>,
    methodName: string,
    descriptor: TypedPropertyDescriptor<HttpRequestCacheMethod>
  ): TypedPropertyDescriptor<HttpRequestCacheMethod> => {
    if (!(descriptor?.value instanceof Function)) {
      throw Error(`'@HttpRequestCache' can be applied only to the class method which returns Observable`);
    }

    const cacheKeyPrefix = `${ target.constructor.name }_${ methodName }`;
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): Observable<any> {
      const storage = CacheStorage.getInstance();
      const key = `${ cacheKeyPrefix }_${ JSON.stringify(args) }`;
      const cachedValue = storage.getItem(key);

      if (cachedValue !== undefined) {
        return of(cachedValue);
      }

      return originalMethod.apply(this, args).pipe(
        tap((value) => storage.setItem(key, value))
      );
    };

    return descriptor;
  }
}
