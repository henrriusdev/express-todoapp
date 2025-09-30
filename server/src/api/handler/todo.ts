import {RequestHandler} from "express";
import {createTodo, deleteTodo, getUserTodos, updateTodo} from "../../lib/service/todo";

export const getAll: RequestHandler = async (req, res) => {
    try {
        const result = await getUserTodos({userId: req.params.userId!, offset: parseInt((req.query.offset as string) || "0"), limit: parseInt((req.query.limit as string) || "10")})
        res.status(200).json(result)
    } catch (error) {
        console.error("Error fetching todos", error)
        res.status(500).json({
            message: "Error fetching todos",
            success: false,
        })
    }
}

export const create: RequestHandler = async (req, res) => {
    try {
        const result = await createTodo({userId: req.params.userId!, title: req.body.title, description: req.body.description})
        res.status(200).json(result)
    } catch (error) {
        console.error("Error creating todo", error)
        res.status(500).json({
            message: "Error creating todo",
            success: false,
        })
    }
}

export const update: RequestHandler = async (req, res) => {
    try {
        const result = await updateTodo({userId: req.params.userId!, todoId: req.params.todoId!, title: req.body.title, description: req.body.description})
        res.status(200).json(result)
    } catch (error) {
        console.error("Error updating todo", error)
        res.status(500).json({
            message: "Error updating todo",
            success: false,
        })
    }
}

export const del: RequestHandler = async (req, res) => {
    try {
        const result = await deleteTodo(req.params.todoId!)
        res.status(200).json(result)
    } catch (error) {
        console.error("Error deleting todo", error)
        res.status(500).json({
            message: "Error deleting todo",
            success: false,
        })
    }
}