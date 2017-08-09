import { Injectable } from '@angular/core';

@Injectable()
export class DragService {
  private zone: string;

  startDrag(draggedZone: string) {
    this.zone = draggedZone;
  }

  accepts(droppedZone: string): boolean {
    return droppedZone == this.zone;
  }
}