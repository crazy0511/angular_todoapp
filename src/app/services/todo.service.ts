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

  addTodo(content: string){
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, content);
    this.todos.unshift(newTodo);
    this.updateToLocalStorage();
  }

  changeTodoStatus(id: number, isCompleted: boolean){
    const index = this.todos.findIndex(t => t.id === id);
    const todo = this.todos[index];
    todo.isCompleted = isCompleted;
    // Thay đổi index thành todo mới
    this.todos.splice(index, 1, todo);
    this.updateToLocalStorage();
  }

  filterTodo(filter: Filter, isFiltering: boolean = true){
    this.currentFilter = filter;
    switch(filter){
      // Với todo.isCompleted = fasle
      case Filter.Active:
        this.filterTodos = this.todos.filter(todo => !todo.isCompleted);
        break;
      // Với todo.isCompleted = true
      case Filter.Completed:
        this.filterTodos = this.todos.filter(todo => todo.isCompleted);
        break;
      // Với tất cả các todo
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
