import mongoose, {Schema} from "mongoose";


const todoSchema = new Schema(
    {
    todo: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
    }
}, {timestamps: true})



export const Todo = mongoose.model('Todo', todoSchema)