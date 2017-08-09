import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'item-component',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
    @Input() item: Item = new Item();

    @Output() public drag = new EventEmitter();
    @Output() public drop = new EventEmitter();

    onDrag(event){
        this.drag.emit(event);
    }
    onDrop(event){ 
        this.drop.emit(event);
    }
}