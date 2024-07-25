import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import axios from 'axios'
import  {Toaster} from 'react-hot-toast'

function App() {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/todo/getTodo");
      if (response.data.success ) {
        const todos = response.data.data;
        if(todos && todos.length > 0) {
          setTodos(todos)
        }
        else if(todos.length === 0) {
          setTodos([])
        }
      } else {
        console.error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect( () => {
    fetchTodos();
  } ,[])


  return (
    <>

      <div className="bg-[#172842] min-h-screen py-8">
                
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm fetchTodo={fetchTodos} />
                    </div>
                    
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.slice().reverse().map((todo) => (
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo} fetchTodo={fetchTodos} />
                          </div>
                        ))}
                    </div>
                </div>
        </div>
        <Toaster />
    </>
  )
}

export default App
