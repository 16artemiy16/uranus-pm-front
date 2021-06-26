import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsPageComponent } from './pages/boards/boards-page.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateBoardComponent } from './components/modals/create-board/create-board.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { BoardComponent } from './pages/board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTaskComponent } from './components/modals/create-task/create-task.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './store/effects/boards.effects';
import { FEATURE_NAME, reducers } from './store';
import { ColumnsEffects } from './store/effects/columns.effects';
import { MatMenuModule } from '@angular/material/menu';
import { BoardPageHeaderComponent } from './pages/board/components/board-page-header/board-page-header.component';
import { BoardPageTopBarComponent } from './pages/board/components/board-page-top-bar/board-page-top-bar.component';
import { BoardPageColumnsComponent } from './pages/board/components/board-page-columns/board-page-columns.component';
import { BoardPageSidebarComponent } from './pages/board/components/board-page-sidebar/board-page-sidebar.component';

@NgModule({
  declarations: [
    BoardsPageComponent,
    CreateBoardComponent,
    BoardComponent,
    CreateTaskComponent,
    BoardPageHeaderComponent,
    BoardPageTopBarComponent,
    BoardPageColumnsComponent,
    BoardPageSidebarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule.forChild([
      { path: 'boards', component: BoardsPageComponent },
      { path: 'boards/:id', component: BoardComponent },
      { path: '**', redirectTo: 'boards' }
    ]),
    TranslocoModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([BoardsEffects, ColumnsEffects])
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'auth'
    }
  ]
})
export class PmModule { }
