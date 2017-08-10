import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DraggableDirective } from './directives/draggable.directive';
import { DroppableDirective } from './directives/droppable.directive';
import { AppComponent } from './app.component';
import { ItemComponent } from './shared/models/item-component.model';
import { ItemBlueComponent } from './item-blue/item-blue.component';
import { ItemRedComponent } from './item-red/item-red.component';
import { DragService } from './shared/drag.service';

@NgModule({
  declarations: [
    AppComponent, DraggableDirective, DroppableDirective, ItemBlueComponent, ItemRedComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ DragService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
