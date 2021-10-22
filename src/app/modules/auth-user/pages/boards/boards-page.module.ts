import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardsPageComponent } from './boards-page.component';
import { BoardFavouriteBtnComponent } from './components/board-favourite-btn/board-favourite-btn.component';
import { BoardsGridViewComponent } from './components/boards-grid-view/boards-grid-view.component';
import { BoardsListViewComponent } from './components/boards-list-view/boards-list-view.component';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, reducer } from './store/boards.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './store/boards.effects';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SnackModule } from '../../../common/snack/snack.module';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: BoardsPageComponent }
    ]),
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([BoardsEffects]),
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TranslocoModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    SnackModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'auth'
    }
  ],
  declarations: [
    BoardsPageComponent,
    BoardFavouriteBtnComponent,
    BoardsGridViewComponent,
    BoardsListViewComponent,
    CreateBoardComponent
  ]
})
export class BoardsPageModule {}
