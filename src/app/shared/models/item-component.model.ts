import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../models/item.model';

export abstract class ItemComponent {
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