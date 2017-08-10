import { Input, Output, Directive, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { DragService } from '../shared/drag.service';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {
  data: any;
  zone: string;

  @Output('onDrag') drag = new EventEmitter();

  constructor(private dragService: DragService){    
  }

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

  @Input()
  set dragged(data: any) {
    if (data) {
      this.data = {
        content: data
      };
    }
  }

  @Input()
  set dragScope(zone: string) {
    if (zone) {
      this.zone = zone;
    }
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    let obj = {
      dragScope: this.zone,
      dragged: this.data.content,
      dropScope: {},      
      dropped: {}
    };

    event.dataTransfer.setData('text/components', JSON.stringify(obj));  
    
    this.dragService.startDrag(obj.dragScope);  
    this.drag.next(obj);
  }
}