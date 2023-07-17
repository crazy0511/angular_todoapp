import { Injectable, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable, ObservableLike } from 'rxjs';
import { Filter } from '../models/filter.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService{

  private static readonly TodoStorageKey = "todos";

  private todos!: Todo[];
  private filterTodos!: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter: Filter = Filter.All;

  todo$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService) {  }

  fetchFromLocalStorage(){
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filterTodos = [...this.todos.map(todo => ({...todo}) )];
    this.updateTodosData();
  }

  updateToLocalStorage(){
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.filterTodo(this.currentFilter, false);
    this.updateTodosData();
  }

  filterTodo(filter: Filter, isFiltering: boolean = true){
    this.currentFilter = filter;
    switch(filter){
      case Filter.Active:
        this.filterTodos = this.todos.filter(todo => !todo.isCompleted);
        break;
      case Filter.Completed:
        this.filterTodos = this.todos.filter(todo => todo.isCompleted);
        break;
      case Filter.All:
        this.filterTodos = [...this.todos.map(todo => ({...todo}) )];
        break;
    }

    if(isFiltering){
      this.updateTodosData();
    }
  }

  private updateTodosData(){
    this.displayTodosSubject.next(this.filterTodos);
    this.lengthSubject.next(this.todos.length);
  }
}
