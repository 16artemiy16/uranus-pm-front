import { NgModule } from '@angular/core';
import { TaskRoutePipe } from '@shared/pipes/task-route/task-route.pipe';

@NgModule({
  declarations: [TaskRoutePipe],
  exports: [TaskRoutePipe]
})
export class TaskRouteModule {}
