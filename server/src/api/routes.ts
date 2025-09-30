import {Router} from "express"
import * as user from "./handler/user"
import * as todo from "./handler/todo"

export function todoRoutes(){
    const e = Router()
    e.get("/:userId", todo.getAll)
    e.post("/:userId", todo.create)
    e.patch("/:todoId", todo.update)
    e.delete("/:todoId", todo.del)
    return e
}

export function userRoutes(){
    const e = Router()
    e.post("/", user.create)
    e.patch("/:userId", user.update)
    e.delete("/:userId", user.del)
    return e
}