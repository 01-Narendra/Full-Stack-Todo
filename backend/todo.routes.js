import { Router } from 'express'
import { addTodo, completeTodo, deleteTodo, getTodo } from './todo.controller.js'

const todoRouter = Router()

todoRouter.post("/addTodo", addTodo)
todoRouter.get("/getTodo",getTodo)
todoRouter.post("/deleteTodo", deleteTodo)
todoRouter.post("/complete", completeTodo)

export default todoRouter