import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  // Nhận giá trị từ todo$ ở ToDoService
  todos$!: Observable<Todo[]>;

  constructor(private todoService: TodoService){

  }

  ngOnInit(): void {
      this.todos$ = this.todoService.todo$;
  }

  // Thay đổi trang thái todo
  onChangeTodoStatus(todo: Todo){
    this.todoService.changeTodoStatus(todo.id, todo.isCompleted);
  }

  // Sửa todo
  onEditTodo(todo: Todo){
    this.todoService.editTodo(todo.id, todo.content);
  }

  // Xóa todo
  onDeleteTodo(todo: Todo){
    this.todoService.deleteTodo(todo.id);
  }
}
