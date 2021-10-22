import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardComponent } from './board.component';
import { BoardPageColumnsComponent } from './components/board-page-columns/board-page-columns.component';
import { BoardPageHeaderComponent } from './components/board-page-header/board-page-header.component';
import { BoardPageSidebarComponent } from './components/board-page-sidebar/board-page-sidebar.component';
import { BoardPageTopBarComponent } from './components/board-page-top-bar/board-page-top-bar.component';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, reducer } from './store/board.reducer';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamManagementComponent } from './components/team-management/team-management.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectorModule } from '../../../reusable/selector/selector.module';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from './store/board.effects';
import { MatButtonModule } from '@angular/material/button';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: BoardComponent }
    ]),
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([BoardEffects]),
    CommonModule,
    SelectorModule,
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    DragDropModule,
    MatCardModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    BoardComponent,
    BoardPageColumnsComponent,
    BoardPageHeaderComponent,
    BoardPageSidebarComponent,
    BoardPageTopBarComponent,
    CreateTaskComponent,
    TeamManagementComponent,
    UserCardComponent
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'auth'
    }
  ]
})
export class BoardModule {}
