import { Pipe, PipeTransform } from '@angular/core';
import { RoutingService } from '@services/routing.service';

type HavingId = { _id: string };

@Pipe({
  name: 'boardRoute'
})
export class BoardRoutePipe implements PipeTransform {
  constructor(
    private readonly routingService: RoutingService
  ) {}

  /**  By board or board Id forms the board navigation link **/
  transform(value: HavingId | string, ...args: unknown[]): string {
    // TODO: maybe create isString() util
    const boardId = typeof value === 'string' ? value : value._id;
    return this.routingService.getRouteBoard(boardId);
  }

}
