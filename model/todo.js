import mongoose from "mongoose";
import { maxLength, trim } from "zod";

const todoSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxLength: [100, "Title cannot exceed 100 characters"]
        },
        description: {
            type: String,
            trim: true,
            maxLength: [500, "Description cannot exceed 500 characters"]
        },
        completed: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },
    }, 
    {
        timestamps: true
    }
)

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema)