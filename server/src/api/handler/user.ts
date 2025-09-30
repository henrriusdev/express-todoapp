import {RequestHandler} from "express";
import {createUser, deleteUser, updateUser} from "../../lib/service/user";

export const create: RequestHandler = async (req, res) => {
    try {
        const result = await createUser(req.body)
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
        const result = await updateUser({userId: req.params.userId!, ...req.body})
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
        const result = await deleteUser(req.params.userId!)
        res.status(200).json(result)
    } catch (error) {
        console.error("Error deleting todo", error)
        res.status(500).json({
            message: "Error deleting todo",
            success: false,
        })
    }
}