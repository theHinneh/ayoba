import { getConnection } from "typeorm";
import { TodoEntity } from "../database/entities/todo.entity";
import { TodoRepository } from "../repository/todo.repository";

export class TodoService {
  private todoRepository: TodoRepository | any;

  constructor() {
    // this.todoRepository =
    //   getConnection("rango").getCustomRepository(TodoRepository);
  }

  public index = async () => {
    const connection = await getConnection("rango");
    this.todoRepository = connection.getCustomRepository(TodoRepository);
    // console.log(connection.getCustomRepository(TodoRepository));
    
    const todos = await this.todoRepository.find();
    return todos;
  };

  public getATodo = async (id: string) => {
    const connection = await getConnection("rango");
    this.todoRepository = connection.getCustomRepository(TodoRepository);
    const todo = await this.todoRepository.findOne(id);
    return todo;
  };

  public create = async (todo: TodoEntity) => {
    const connection = await getConnection("rango");
    this.todoRepository = connection.getCustomRepository(TodoRepository);
    const newTodo = await this.todoRepository.create(todo);
    return newTodo;
  };

  public update = async (todo: TodoEntity, id: string) => {
    const connection = await getConnection("rango");
    this.todoRepository = connection.getCustomRepository(TodoRepository);
    const updatedTodo = await this.todoRepository.update(id, todo);
    return updatedTodo;
  };

  public delete = async (id: string) => {
    const connection = await getConnection("rango");
    this.todoRepository = connection.getCustomRepository(TodoRepository);
    const deletedTodo = await this.todoRepository.delete(id);
    return deletedTodo;
  };
}
