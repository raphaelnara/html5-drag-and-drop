import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [ ItemComponent ]
})
export class AppComponent implements OnInit {
  dragIndex: number
  dropIndex: number
  items: Array<any>;
  components: Array<ItemComponent>;

  @ViewChild('container', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { 
  }

  ngOnInit(): void {
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

    this.components = new Array<ItemComponent>();

    for (var index = 0; index < this.items.length; index++) {
      var component = new ItemComponent();

      component.item.position = index;
      component.item.text = this.items[index].name;
      
      this.components.push(component);      
    }
    
    this.renderComponents();
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

  renderComponents(){    
    this.viewContainerRef.clear();

    for (let index = 0; index < this.components.length; index++){
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ItemComponent);
      let componentRef = this.viewContainerRef.createComponent(componentFactory);
      
      let self = this;

      let component = <ItemComponent> componentRef.instance;
      
      component.item.position = index;
      component.item.text = this.components[index].item.text;

      component.drop.subscribe(event =>{
        let tempArray = new Array<any>();
        let index = 0;

        while(index < self.components.length){
          if (index != event.dragged.position){
            if (index == event.dropped.position){
              tempArray.push(self.components[event.dragged.position]);
            }
            tempArray.push(self.components[index]);
          }
          index++;
        }
        self.components = tempArray;
        self.renderComponents();
      });
    }
  }
}