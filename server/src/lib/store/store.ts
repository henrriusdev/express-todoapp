import {DataSource, Repository} from "typeorm";
import {Todo, User} from "../model/entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "your-secret-password",
    database: "nodejs-todoapp",
    synchronize: true,
    subscribers: [],
    migrations: [],
    entities: [User, Todo],
    logging: true,
})

export let todoRepo: Repository<Todo>;
export let userRepo: Repository<User>;

export async function initializeStore(){
    try{
        await AppDataSource.initialize();
        todoRepo = AppDataSource.getRepository(Todo);
        userRepo = AppDataSource.getRepository(User);
    } catch (error){
        console.error("Error during Data Source initialization", error);
        process.exit(1);
    }
}