import { Todo } from "./todo.model.js";

// Add todo

const addTodo = async(req, res) => {
    const {todo, completed} = req.body;

    const newTodo = new Todo({
        todo,
        completed
    });
    
    try {
        const savedTodo = await newTodo.save();

        res.status(201).json({
            success: true,
            message: "Todo added successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error saving todo ${err}` });
    }
}


// Get todo

const getTodo = async(req, res) => {
    try {
        const todos = await Todo.find({});

        // Transform the data to include only id, todo, and completed
        const responseTodos = todos.map(todo => ({
            id: todo._id,
            todo: todo.todo,
            completed: todo.completed
        }));

        res.status(200).json({
            success: true,
            data: responseTodos
        })
    } catch (error) {
        console.log("Error while getting todos ", error);
        res.status(500).json({
            success: false,
            message: "Error while getting todos"
        })
    }
}


// Delete todo

const deleteTodo = async (req, res) => {
    const { id } = req.body;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
        return res.status(404).json({ 
            success: false,
            message: "Todo not found"
        });
    }
    res.status(200).json({ 
        success: true, 
        message: 'Todo deleted successfully ❌'
    });

    } catch (error) {
        console.error('Error while deleting todo:', error);
        res.status(500).json({ success: false, message: 'Error while deleting todo' });
    }
};

// Mark as complete todo

const completeTodo = async(req, res) => {
    const { id } = req.body;

    try {
        const todo = await Todo.findById({_id: id})
        if(!todo) {
            return new Error("Todo not Found")
        }

        todo.completed = !todo.completed
        const updatedTodo = await todo.save()
        
        return res.status(200).json({
            success: true,
            isCompleted: updatedTodo.completed, 
            message: "Done"
        })

    } catch (error) {
        console.log("error while marking todo ",error);
        return res.status(500).json({
            success: false,
            message: "Error !!"
        })
    }
}



export {addTodo, getTodo, deleteTodo, completeTodo}