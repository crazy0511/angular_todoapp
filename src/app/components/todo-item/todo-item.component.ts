import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  isHovered = false;
  isEditing = false;
  
  constructor(){}

  ngOnInit(){
    
  }

  changeTodoStatus(){
    this.changeStatus.emit({...this.todo, isCompleted: !this.todo.isCompleted});
  }

  // Nhận event gõ phím
  submitEdit(event: KeyboardEvent){
    const {keyCode} = event;
    event.preventDefault();
    // Nếu keyCode là phím Enter
    if(keyCode === 13){
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  removeTodo(){
    this.deleteTodo.emit(this.todo);
  }

}
