"use server"

import { revalidatePath } from "next/cache"
import connectDB from "@/lib/db"
import Todo from "@/model/todo"
import { createTodoSchema } from "@/validations/todo"
import { success } from "zod"

export async function createTodo({data}){
    try {
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
            error: error? error.message : "Failed to create todo"
        }
    }
}

