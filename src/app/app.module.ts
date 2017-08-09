import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DraggableDirective } from './directives/draggable.directive';
import { DroppableDirective } from './directives/droppable.directive';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { DragService } from './shared/drag.service';

@NgModule({
  declarations: [
    AppComponent, DraggableDirective, DroppableDirective, ItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ DragService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
