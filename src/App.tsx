import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TaskTypeObject = {
    [key: string]: Array<TaskType>
}

function App() {


    let [todoLists, setTodoLists] = useState<TodoListType[]>([])

    let [tasks, setTasks] = useState<TaskTypeObject>({}
        )
    ;


    function deleteTodo(id: string) {
        return () => {
            let newTodoLists = todoLists.filter((el) => el.id !== id)
            delete tasks[id]
            setTodoLists(newTodoLists)
            setTasks({...tasks})
        }
    }

    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListID];
        let newTasks = {...tasks, [todoListID]: [...tasks[todoListID], task]}
        // tasks[todoListID] = [task, ...todoListTasks]
        setTasks(newTasks);
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find((task) => task.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }

    function changeFilter(id: string, value: FilterValuesType) {
        let todoList = todoLists.find((el) => el.id === id)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }


    function createTodoList(title: string) {
        let newId = v1()
        let newTodoLit: TodoListType = {id: newId, title: title, filter: 'all'}
        setTodoLists([...todoLists, newTodoLit])
        setTasks({...tasks, [newId]: []})
    }

    function changeTitleItemTasks(title: string, itemID: string, todoID: string) {
            let itemTask = tasks[todoID].find(el => el.id === itemID)
            if(itemTask) {
                itemTask.title = title
                setTasks({...tasks})
            }
    }

    function changeTitleTodo(title: string, todoID: string) {
        let itemTask = todoLists.find(el => el.id === todoID)
        if(itemTask) {
            itemTask.title = title
            setTasks({...tasks})
        }
    }



    return (
        <div className="App">
            <div>
                Название TodoList)
                <AddItemForm onClick={createTodoList}/>
            </div>
            {todoLists.map(todoObj => {
                let allTasks = tasks[todoObj.id];
                let tasksForTodoList = allTasks;

                if (todoObj.filter === "active") {
                    tasksForTodoList = allTasks.filter(t => t.isDone === false);
                }
                if (todoObj.filter === "completed") {
                    tasksForTodoList = allTasks.filter(t => t.isDone === true);
                }

                return (
                    <TodoList changeTitleTodo={changeTitleTodo}
                              changeTitleItemTasks={changeTitleItemTasks}
                              key={todoObj.id}
                              deleteTodo={deleteTodo}
                              id={todoObj.id}
                              title={todoObj.title}
                              changeStatus={changeStatus}
                              tasks={tasksForTodoList}
                              removeTask={removeTask}
                              filter={todoObj.filter}
                              changeFilter={changeFilter}
                              addTask={addTask}/>

                )
            })}

        </div>
    );
}

export default App;
