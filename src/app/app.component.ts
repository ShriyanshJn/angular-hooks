import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from "./components/child/child.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, ChildComponent]
})
export class AppComponent {

  private num: number = 4;
  num2: number = 40;
  numbers: number[] = [];

  get counter() {
    return this.num;
  }

  set counter(value: number) {
    this.num = value
  }

  increment() {
    this.counter++
  }

  decrement() {
    this.counter--
  }

  add() {
    this.numbers.push(1)
  }
}
