import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ItemComponent } from '../shared/models/item-component.model';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'item-blue',
  templateUrl: './item-blue.component.html'
})
export class ItemBlueComponent extends ItemComponent {
}