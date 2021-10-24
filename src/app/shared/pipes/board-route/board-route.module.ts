import { NgModule } from '@angular/core';
import { BoardRoutePipe } from '@shared/pipes/board-route/board-route.pipe';

@NgModule({
  declarations: [BoardRoutePipe],
  exports: [BoardRoutePipe]
})
export class BoardRouteModule {}
