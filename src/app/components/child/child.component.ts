//! ngOnChanges works for primitive types like boolean, number, string, etc, When the value of the primive type is changed, its address is updated, so ngChanges is triggred
//! ngDoCheck is used for non-primitive types like array, object, etc, When the value of the primitive type is changed, its address stays the same, so ngDoCheck is triggred
//!     But if we reinitialize array/object their memory location gets updated and ngOnChanges is triggred instead of ngDoCheck

import { CommonModule } from '@angular/common';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnChanges, OnInit, DoCheck {
  @Input() myCounter!: number
  @Input() num2!: number
  public changeLog: string[] = [];
  @Input() numbers!: number[];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges')
    console.log(changes)
    for (let propName in changes) {
      const change: SimpleChange = changes[propName]
      const currentValue = JSON.stringify(change.currentValue)
      const previousValue = JSON.stringify(change.previousValue)
      this.changeLog.push(`ngOnChanges ${propName}: currentValue: ${currentValue}, previousValue: ${previousValue}, firstChange: ${change.firstChange}`)
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.changeLog.push('ngOnInit')
  }

  //* triggered initially and whenever a new value comes in ngOnChanges
  ngDoCheck(): void {
    console.log("ngDoCheck")
    this.changeLog.push(`ngDoCheck: ${this.numbers.toString()}`)
  }
}
