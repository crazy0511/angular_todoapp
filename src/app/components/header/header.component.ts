import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private todoService: TodoService){
    
  }

  toggleAll(){
    this.todoService.toggleAll();
  }

  ngOnInit(): void {
      
  }
}
