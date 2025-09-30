import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm"

@Entity()
class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "datetime"})
    createdAt: Date

    @Column({type: "datetime"})
    updatedAt: Date

    @Column({type: "datetime"})
    deletedAt: Date
}

@Entity()
export class User extends BaseEntity {
    @Column("text")
    firstName: string

    @Column("text")
    lastName: string

    @Column({unique: true, type: "text"})
    email: string

    @Column("text")
    password: string

    @Column()
    isActive: boolean

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[]
}

@Entity()
export class Todo extends BaseEntity {
    @Column("text")
    title: string

    @Column("text")
    description: string

    @Column()
    isDone: boolean

    @ManyToOne(() => User, (user) => user.todos)
    user: User
}
