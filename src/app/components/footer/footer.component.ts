import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Filter, FilterButton } from 'src/app/models/filter.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy{
  filterButtons: FilterButton[] = [
    {type: Filter.All, label: 'All', isActive: true},
    {type: Filter.Active, label: 'Active', isActive: false},
    {type: Filter.Completed, label: 'Completed', isActive: false},
  ]

  length = 0;
  hasCompletes$!: Observable<boolean>;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService){

  }

  ngOnInit(){
    //takeUntil
    this.hasCompletes$ = this.todoService.todo$.pipe(
      map(todos => todos.some(t => t.isCompleted)),
      takeUntil(this.destroy$)
    );

    this.todoService.length$.pipe(takeUntil(this.destroy$))
      .subscribe(length => {
        this.length = length;
      })
  }

  filter(type: Filter){
    this.setActiveFilterBtn(type);
    this.todoService.filterTodo(type);
  }

  clearCompleted(){
    this.todoService.clearCompleted();
  }

  private setActiveFilterBtn(type: Filter){
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type;
    });
  }

  // Destroy khi không có Task nào
  ngOnDestroy(){
      this.destroy$.next;
      this.destroy$.complete();
  }
}

