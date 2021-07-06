import { createConnection, getConnection } from "typeorm";
// import { getAyoba } from "../../lib/microapp.js";
import { TodoEntity } from "../database/entities/todo.entity";
import { TodoRepository } from "../repository/todo.repository";

const ayoba = require("../../lib/microapp.js");

export class TodoService {
  private todoRepository: TodoRepository | any;

  constructor() {
    // this.todoRepository =
    //   getConnection("rango").getCustomRepository(TodoRepository);

    (async () => {
      const connection = await createConnection({
        type: "postgres",
        entities: ["build/database/entities/**/*.js"],
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
    const Ayoba = ayoba.getAyoba();
    // const getMsisdn = Ayoba.getMsisdn();

    // console.log("getMsisdn", getMsisdn);
    console.log(Ayoba);

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
