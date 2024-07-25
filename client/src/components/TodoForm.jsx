import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

function TodoForm({fetchTodo}) {
    
    const [todo, setTodo] = useState("")

    const add = async(e) => {
        e.preventDefault()
        if(!todo) return 
        try {
            const response = await axios.post("http://localhost:4000/api/v1/todo/addTodo", { 
              todo,
              completed: false
            })
            if(response.data.success) {
              toast.success(response.data.message)
            }
            else {
              toast.error(response.data.message)
            }
    
          } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log("Error while adding todo ", error);
          }
        setTodo("")
        fetchTodo()
    }


    return (
        <form onSubmit={add}  className="flex">
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

