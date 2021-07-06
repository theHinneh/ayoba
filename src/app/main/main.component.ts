import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
declare var getAyoba: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  todos!: Array<any>;
  loading!: boolean;
  content!: string;
  editTodo!: boolean;

  todoIndex!: number;
  editedTodo: any = {
    content: '',
    date: '',
    id: null,
  };

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(): void {
    this.mainService
      .getAllTodos()
      .subscribe(
        (res: Array<any>) => (this.todos = res.sort((a, b) => b.id - a.id))
      );
    console.log(this.todos);
  }

  addTodo(): void {
    if (this.content === '') return;
    const data = { content: this.content };
    this.content = '';
    this.loading = true;
    this.mainService.createTodo(data).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        this.getAllTodos();
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  deleteTodo(todo: any): void {
    const todoIndex = this.todos.indexOf(todo);
    const todoId: number = todo.id;
    this.todos.splice(todoIndex, 1);

    this.mainService.deleteTodo(todoId).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    console.log(todo);
  }

  updateTodo(todo: any): void {
    this.todoIndex = this.todos.indexOf(todo);
    this.editedTodo = todo;
    this.todos.splice(this.todoIndex, 1);
    this.editTodo = true;
  }

  submitUpdate(): void {
    this.todos.unshift(this.editedTodo);
    // this.editTodo = false;

    this.mainService.editTodo(this.editedTodo.id, this.editedTodo).subscribe(
      (res) => {
        this.editTodo = false;
        console.log(res);
      },
      () => (this.editTodo = false)
    );
  }

  cancelUpdate(): void {
    this.todos.unshift(this.editedTodo);
    this.editTodo = false;
  }
}
