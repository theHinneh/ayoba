import { createConnection, getConnection } from "typeorm";
import { AyobaAppApi } from "../../lib/microapp";
import { TodoEntity } from "../database/entities/todo.entity";
import { TodoRepository } from "../repository/todo.repository";

export class TodoService {
  private todoRepository: TodoRepository | any;

  constructor() {
    // this.todoRepository =
    //   getConnection("rango").getCustomRepository(TodoRepository);

    (async () => {
      const connection = await createConnection({
        type: "postgres",
        entities: ["build/src/database/entities/**/*.js"],
        synchronize: true,

        /**
         * Heroku Setup
         */

        url: process.env.DATABASE_URL,
        ssl: true,
        extra: {
          ssl: { rejectUnauthorized: false },
        },

        /**
         * Dev setup
         */

        // port: 5432,
        // username: "theHinneh",
        // password: "theHinneh",
        // database: "theHinneh",
        // name: "rango",
      });
      this.todoRepository = connection.getCustomRepository(TodoRepository);
    })();
  }

  public index = async () => {
    const user: any = await AyobaAppApi();
    // const msisdn = user.getMsisdn();

    console.log("user", user);

    const todos = await this.todoRepository.find();
    return todos;
  };

  public getATodo = async (id: number) => {
    const todo = await this.todoRepository.findOne(Number(id));
    return todo;
  };

  public create = async (todo: TodoEntity) => {
    console.log(todo);

    const newTodo = await this.todoRepository.save(todo);
    return newTodo;
  };

  public update = async (todo: TodoEntity, id: number) => {
    const updatedTodo = await this.todoRepository.update(Number(id), todo);
    return updatedTodo;
  };

  public delete = async (id: number) => {
    const deletedTodo = await this.todoRepository.delete(Number(id));
    return deletedTodo;
  };
}
