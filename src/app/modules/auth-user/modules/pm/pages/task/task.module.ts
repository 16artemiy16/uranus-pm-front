import { NgModule } from '@angular/core';
import { TaskComponent } from './task.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, reducer } from './store/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/task.effects';
import { CommonModule } from '@angular/common';
import { SelectorModule } from '../../../../../reusable/selector/selector.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: ':id', component: TaskComponent }]),
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([TaskEffects]),
    SelectorModule,
    FormsModule
  ],
  declarations: [TaskComponent],
})
export class TaskModule {}