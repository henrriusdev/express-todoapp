import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm"

@Entity()
class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "timestamp without time zone"})
    createdAt: Date

    @Column({type: "timestamp without time zone"})
    updatedAt: Date

    @Column({type: "timestamp without time zone"})
    deletedAt: Date

    constructor() {
        this.id = ""
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.deletedAt = new Date()
    }
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
    todos!: Todo[]

    constructor() {
        super()
        this.firstName = ""
        this.lastName = ""
        this.email = ""
        this.password = ""
        this.isActive = false
    }
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

    constructor() {
        super()
        this.title = ""
        this.description = ""
        this.isDone = false
        this.user = new User()
    }
}
