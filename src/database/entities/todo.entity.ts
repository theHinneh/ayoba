import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo")
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: string = Math.random().toString(16).substr(2, 8);

  @Column()
  content: string = "";

  @Column()
  date: Date = new Date();
}
