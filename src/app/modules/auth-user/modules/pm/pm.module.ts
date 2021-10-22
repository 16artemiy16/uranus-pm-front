import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTaskComponent } from './components/modals/create-task/create-task.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SharedModule } from '../../../shared/shared.module';
import { SelectorModule } from '../../../reusable/selector/selector.module';

@NgModule({
  declarations: [
    CreateTaskComponent,
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
    MatMenuModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSelectModule,
    DragDropModule,
    MatButtonToggleModule,
    SelectorModule,
    RouterModule.forChild([
      { path: '', loadChildren: () => import('./pages/boards/boards-page.module').then(m => m.BoardsPageModule) },
      { path: ':id', loadChildren: () => import('./pages/board/board.module').then(m => m.BoardModule) },
      {
        path: ':id/task',
        loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule)
      },
      { path: '**', redirectTo: 'boards' }
    ]),
    TranslocoModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'auth'
    }
  ]
})
export class PmModule { }
