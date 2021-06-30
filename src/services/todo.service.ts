import { getConnection } from "typeorm";
import { TodoEntity } from "../database/entities/todo.entity";
import { TodoRepository } from "../repository/todo.repository";

export class TodoService {
  private todoRepository: TodoRepository;

  constructor() {
    this.todoRepository =
      getConnection("todo").getCustomRepository(TodoRepository);
  }

  public index = async () => {
    const todos = await this.todoRepository.find();
    return todos;
  };

  public getATodo = async (id: number) => {
    const todo = await this.todoRepository.findOne(id);
    return todo;
  };

  public create = async (todo: TodoEntity) => {
    const newTodo = await this.todoRepository.create(todo);
    return newTodo;
  };

  public update = async (todo: TodoEntity, id: number) => {
    const updatedTodo = await this.todoRepository.update(id, todo);
    return updatedTodo;
  };

  public delete = async (id: number) => {
    const deletedTodo = await this.todoRepository.delete(id);
    return deletedTodo;
  };
}
