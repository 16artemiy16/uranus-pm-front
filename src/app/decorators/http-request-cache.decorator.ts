import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

type HttpRequestCacheMethod = (...args: any[]) => Observable<any>;

export class CacheStorage {
  static storage: Record<string, any> = {};

  static setItem(key: string, item: Observable<any>): void {
    CacheStorage.storage[key] = item;
  }

  static getItem(key: string): Observable<any> | undefined {
    return CacheStorage.storage[key];
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
      const storage = CacheStorage;
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
