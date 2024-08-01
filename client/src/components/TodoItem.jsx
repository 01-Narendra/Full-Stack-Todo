import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

function TodoItem({ todo, fetchTodo }) {
    
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    

    const toggleCompleted = async() => {
        try {
            const response = await axios.post("http://localhost:4000/api/v1/todo/complete", {
                id: todo.id
            })

            if(response.data.success) {
                if(response.data.isCompleted)
                    toast.success("Done")
                else    
                    toast.error("Undone")
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        fetchTodo()
    }
    
    const deleteTodo = async() => {
        try {
            const response = await axios.post("http://localhost:4000/api/v1/todo/deleteTodo", {
                id: todo.id
            })
            if(response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        fetchTodo()
    }

    


    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg
                    border-transparent ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                readOnly
                onChange={(e) => setTodoMsg(e.target.value)}
            />
            
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={deleteTodo}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
