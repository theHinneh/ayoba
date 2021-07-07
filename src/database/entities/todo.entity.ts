import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo")
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  date!: Date;

  @Column()
  msisdn!: string;
}
