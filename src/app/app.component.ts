import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // check xem có todo không?
  hasTodo$!: Observable<boolean>;

  constructor(private todoService: TodoService){

  }

  ngOnInit(): void {
    // Lấy data
    this.todoService.fetchFromLocalStorage();
    // length > 0 -> hasTodo4 = true
    this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0));
  }
}
