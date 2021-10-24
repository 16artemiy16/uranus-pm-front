import { Pipe, PipeTransform } from '@angular/core';
import { RoutingService } from '@services/routing.service';

@Pipe({
  name: 'taskRoute'
})
export class TaskRoutePipe implements PipeTransform {
  constructor(private readonly routingService: RoutingService) {}

  /**  By task forms the task navigation link **/
  transform(value: { _id: string, boardId: string }, ...args: unknown[]): string {
    const { boardId, _id } = value;
    return this.routingService.getRouteTask(boardId, _id);
  }
}
