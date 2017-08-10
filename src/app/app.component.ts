import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { ItemBlueComponent } from './item-blue/item-blue.component'
import { ItemRedComponent } from './item-red/item-red.component'
import { ItemComponent } from './shared/models/item-component.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [ ItemRedComponent, ItemBlueComponent ]
})
export class AppComponent implements OnInit {
  dragIndex: number
  dropIndex: number
  items: Array<any>;
  components: Array<any>;
  entryComponents: { [name: string]: any }

  @ViewChild('container', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { 
  }

  ngOnInit(): void {
    this.items = new Array<any>();
    this.items.push({ class: "ItemRedComponent", name: "Drop1", scope: "scope1" });
    this.items.push({ class: "ItemBlueComponent", name: "Drop2", scope: "scope2" });
    this.items.push({ class: "ItemRedComponent", name: "Drop3", scope: "scope2" });
    this.items.push({ class: "ItemRedComponent", name: "Drop4", scope: "scope2" });
    this.items.push({ class: "ItemBlueComponent", name: "Drop5", scope: "scope1" });
    this.items.push({ class: "ItemBlueComponent", name: "Drop6", scope: "scope1" });
    this.items.push({ class: "ItemRedComponent", name: "Drop7", scope: "scope1" });
    this.items.push({ class: "ItemBlueComponent", name: "Drop8", scope: "scope2" });
    this.items.push({ class: "ItemBlueComponent", name: "Drop9", scope: "scope2" });

    this.entryComponents = {
        "ItemBlueComponent": ItemBlueComponent,
        "ItemRedComponent": ItemRedComponent
    }

    this.components = new Array<any>();

    for (var index = 0; index < this.items.length; index++) {
      let className = this.items[index].class;
      let component = new this.entryComponents[className]();
      
      component.item.position = index;
      component.item.text = this.items[index].name;
      
      this.components.push({ class: className, instance: component });      
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
      
      let factories = Array.from(this.componentFactoryResolver['_factories'].keys());
      let factoryClass = <Type<any>>factories.find((x: any) => x.name == this.components[index].class);

      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(factoryClass);
      let componentRef = this.viewContainerRef.createComponent(componentFactory);
      
      let self = this;
      
      componentRef.instance.item.position = index;
      componentRef.instance.item.text = this.components[index].instance.item.text;

      componentRef.instance.drop.subscribe(event =>{
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