import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
let todoListID1 = v1()
let todoListID2 = v1()

type TaskTypeObject = {
    [key: string] : Array<TaskType>
}

function App() {




    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListID1, title: 'Common Baby', filter: 'all'},
        {id: todoListID2, title: 'How to lear JS', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskTypeObject>({
            [todoListID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todoListID2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
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
        let newTasks = {...tasks, [todoListID] : [...tasks[todoListID], task]}
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


    return (
        <div className="App">
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
                    <Todolist key={todoObj.id}
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
