import {RequestHandler} from "express";
import {createTodo, deleteTodo, getUserTodos, updateTodo} from "../../lib/service/todo";

/**
 * @swagger
 * /todos/{userId}:
 *   get:
 *     summary: Get all todos for a user
 *     description: Retrieve a paginated list of todos for a specific user
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of items to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of items to return
 *     responses:
 *       200:
 *         description: Successfully retrieved todos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 total:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       isDone:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */
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

/**
 * @swagger
 * /todos/{userId}:
 *   post:
 *     summary: Create a new todo
 *     description: Create a new todo item for a specific user
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The todo title
 *               description:
 *                 type: string
 *                 description: The todo description
 *     responses:
 *       200:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     isDone:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */
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

/**
 * @swagger
 * /todos/{todoId}:
 *   patch:
 *     summary: Update a todo
 *     description: Update an existing todo item
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated todo title
 *               description:
 *                 type: string
 *                 description: The updated todo description
 *               isCompleted:
 *                 type: boolean
 *                 description: Whether the todo is completed
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     isDone:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */
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

/**
 * @swagger
 * /todos/{todoId}:
 *   delete:
 *     summary: Delete a todo
 *     description: Delete an existing todo item
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID to delete
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     isDone:
 *                       type: boolean
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */
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