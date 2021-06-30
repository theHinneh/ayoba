import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo")
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  content: string | undefined;

  @Column()
  date: Date = new Date();
}
