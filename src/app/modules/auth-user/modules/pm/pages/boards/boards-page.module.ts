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
import { SnackModule } from '../../../../../common/snack/snack.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: BoardsPageComponent }
    ]),
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([BoardsEffects]),
    CommonModule,
    TranslocoModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    SnackModule
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
    BoardsListViewComponent
  ]
})
export class BoardsPageModule {}
