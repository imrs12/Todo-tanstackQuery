"use server"

import { revalidatePath } from "next/cache"
import connectDB from "@/lib/db"
import Todo from "@/model/todo"
import { createTodoSchema } from "@/validations/todo"
import { success } from "zod"

export async function createTodo(data){
    try {
        console.log(data)
        const validatedData = createTodoSchema.parse(data)

        await connectDB();

        const todo = await Todo.create(validatedData)

        revalidatePath("/")

        return {
            success:true,
            data: JSON.parse(JSON.stringify(todo))
        }
    } catch (error) {
        console.error("Error creating todo", error)
    
        return {
            success: false,
            error: error ? error.message : "Failed to create todo"
        }
    }
}

export async function getTodos(){
    try {
        await connectDB()

        const todos = await Todo.find({}).sort({createdAt: -1})

        console.log(todos)

        return {
            success:true,
            data: JSON.parse(JSON.stringify(todos))
        }
    } catch (error) {
        console.error("Error fetching todos:", error)
        return {
            success: false,
            error: "Failed  to fetch todos"
        }
    }
}

