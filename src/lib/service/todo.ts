import {todoRepo as repo} from "../store/store";
import {TodoResponse, TodosResponse} from "../model/response";
import {CreateTodoRequest, GetTodosRequest, UpdateTodoRequest} from "../model/request";

export async function getUserTodos(request: GetTodosRequest): Promise<TodosResponse> {
    try {
        const data = await repo.find({
            where: {
                user: {id: request.userId}
            },
            skip: request.offset,
            take: request.limit,
        })
        return {
            data,
            message: "Todos fetched successfully",
            success: true,
            total: data.length,
        }
    } catch (error) {
        console.error("Error fetching todos", error)
        throw error
    }
}

export async function createTodo(request: CreateTodoRequest): Promise<TodoResponse> {
    try {
        const todo = repo.create({
            title: request.title,
            description: request.description,
            user: {id: request.userId},
        })
        await repo.save(todo)
        return {
            data: todo,
            message: "Todo created successfully",
            success: true,
        }
    } catch (error) {
        console.error("Error creating todo", error)
        throw error
    }
}

export async function updateTodo(request: UpdateTodoRequest): Promise<TodoResponse> {
    try {
        const todo = await repo.findOneBy({id: request.todoId})
        if (!todo) {
            return {
                data: null,
                message: "Todo not found",
                success: false,
            }
        }

        repo.merge(todo, {
            ...request,
            user: {id: request.userId},
        })
        const result = await repo.save(todo)
        return {
            data: result,
            message: "Todo updated successfully",
            success: true,
        }
    } catch (error) {
        console.error("Error updating todo", error)
        throw error
    }
}

export async function deleteTodo(todoId: string): Promise<TodoResponse> {
    try {
        const todo = await repo.findOneBy({id: todoId})
        if (!todo) {
            return {
                data: null,
                message: "Todo not found",
                success: false,
            }
        }

        await repo.createQueryBuilder()
            .update()
            .set({deletedAt: "CURRENT_DATETIME"})
            .where("id = :id", {id: todoId})
            .execute()

        return {
            data: todo,
            message: "Todo deleted successfully",
            success: true,
        }
    } catch (error) {
        console.error("Error deleting todo", error)
        throw error
    }
}