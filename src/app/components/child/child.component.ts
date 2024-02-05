//! ngOnChanges works for primitive types like boolean, number, string, etc, When the value of the primive type is changed, its address is updated, so ngChanges is triggred
//! ngDoCheck is used for non-primitive types like array, object, etc, When the value of the primitive type is changed, its address stays the same, so ngDoCheck is triggred
//!     But if we reinitialize array/object their memory location gets updated and ngOnChanges is triggred instead of ngDoCheck

import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit {
  @Input() myCounter!: number
  @Input() num2!: number
  public changeLog: string[] = [];
  @Input() numbers!: number[];

  //* triggered initially and whenever a new value comes in ngOnChanges
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

  ngDoCheck(): void {
    console.log("ngDoCheck")
    this.changeLog.push(`ngDoCheck: ${this.numbers.toString()}`)
  }

  //* ngAfterContentInit hook is used to check if the data coming from the parent component (ng-content) has been initialized properly and also for complex computations
  //* only <ng-content>
  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
    this.changeLog.push("ngAfterContentInit")
  }

  //* triggered after ngDoCheck and after ngAfterContentInit
  //* used to check if the data coming from the parent component is successfully initialised and to do dom MANIPLUAITON ON THAT COMPONENT
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked")
    this.changeLog.push("ngAfterContentChecked")
  }

  //* ngAfterViewInit hook is used to check if the data coming from the parent component (whole) has been initialized properly and loaded successfully in UI
  //* whole child component
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit")
    this.changeLog.push("ngAfterViewInit")
  }
}
