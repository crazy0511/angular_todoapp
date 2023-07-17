import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hasTodo$!: Observable<boolean>;

  constructor(private todoService: TodoService){

  }

  ngOnInit(): void {
      this.todoService.fetchFromLocalStorage();
      this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0));
  }
}
