import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ItemComponent } from '../shared/models/item-component.model';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'item-red',
  templateUrl: './item-red.component.html'
})
export class ItemRedComponent extends ItemComponent {
}