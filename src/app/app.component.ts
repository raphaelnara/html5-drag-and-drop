import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dragIndex: number
  dropIndex: number
  items: Array<any>;

  constructor(){
    this.items = new Array<any>();
    this.items.push({ name: "Drop1", scope: "scope1" });
    this.items.push({ name: "Drop2", scope: "scope2" });
    this.items.push({ name: "Drop3", scope: "scope2" });
    this.items.push({ name: "Drop4", scope: "scope2" });
    this.items.push({ name: "Drop5", scope: "scope1" });
    this.items.push({ name: "Drop6", scope: "scope1" });
    this.items.push({ name: "Drop7", scope: "scope1" });
    this.items.push({ name: "Drop8", scope: "scope2" });
    this.items.push({ name: "Drop9", scope: "scope2" });
  }

  onDrag(event, dragIndex) {
    this.dragIndex = dragIndex;
  }
  
  onDrop(event, dropIndex) {
    this.dropIndex = dropIndex;
    let tempItems = new Array<any>();
    let index = 0;

    while (index < this.items.length){
      if (index != this.dragIndex){
        if (index == this.dropIndex){
          tempItems.push(this.items[this.dragIndex]);
        }
        tempItems.push(this.items[index]);
      }
      index++;
    }

    this.items = tempItems;
  }
}