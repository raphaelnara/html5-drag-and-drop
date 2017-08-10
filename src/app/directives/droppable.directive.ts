import { Input, Output, Directive, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { DragService } from '../shared/drag.service'

@Directive({
  selector: '[droppable]'
})
export class DroppableDirective {
  data: any;
  zone: string;

  @Output('onDrop') drop = new EventEmitter();

  constructor(private dragService: DragService){
  }

  @Input()
  set dropped(data: any) {
    if (data) {
      this.data = {
        content: data
      };
    }
  }

  @Input()
  set dropScope(zone: string) {
    if (zone) {
      this.zone = zone;
    }
  }

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {   
    event.dataTransfer.dropEffect = "move";
    if (this.dragService.accepts(this.zone)){
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const data = JSON.parse(event.dataTransfer.getData('text/components'));

    data.dropped = this.data.content;
    data.dropScope = this.zone;
    
    this.drop.next(data);
  }
}