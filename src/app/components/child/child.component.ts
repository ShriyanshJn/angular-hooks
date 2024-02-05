import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnChanges, OnInit {
  @Input() myCounter!: number
  @Input() num2!: number
  public changeLog: string[] = [];

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
}
