import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Toolbar, IconButton, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TaskTypeObject = {
    [key: string]: Array<TaskType>
}

function App() {


    let [todoLists, setTodoLists] = useState<TodoListType[]>([])

    let [tasks, setTasks] = useState<TaskTypeObject>({})


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
        // let todoListTasks = tasks[todoListID];
        let newTasks = {...tasks, [todoListID]: [...tasks[todoListID], task]}
        // tasks[todoListID] = [task, ...todoListTasks]
        setTasks(newTasks);
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find((task) => task.id === id)
        if (task) {
            const copy = {...task, isDone}
            const newCopyTodoLists = todoListTasks.map(el => {
                if(el.id === id) return copy
                return el
            })

            setTasks({...tasks, [todoListID] : newCopyTodoLists})
        }

    }

    function changeFilter(id: string, value: FilterValuesType) {
        let todoList = todoLists.find((el) => el.id === id)
        if (todoList) {
            const copy =  {...todoList, filter : value}
            const newCopyTodoLists = todoLists.map(el => {
                if(el.id === id) return copy
                return el
            })
            setTodoLists(newCopyTodoLists)
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
        if (itemTask) {
            const copy =  {...itemTask, title}
            const newCopyTodoLists = tasks[todoID].map(el => {
                if(el.id === itemID) return copy
                return el
            })
            setTasks({...tasks, [todoID] : newCopyTodoLists})
        }
    }

    function changeTitleTodo(title: string, todoID: string) {
        let itemTask = todoLists.find(el => el.id === todoID)
        if (itemTask) {
            const copy = {...itemTask, title}
            const newCopyTodoLists = todoLists.map(el => {
                if (el.id === todoID) return copy
                return el
            })
            setTodoLists(newCopyTodoLists)
        }
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm onClick={createTodoList}/>
                </Grid>
                <Grid container spacing={3}>
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
                            <Grid item key={todoObj.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList changeTitleTodo={changeTitleTodo}
                                              changeTitleItemTasks={changeTitleItemTasks}
                                              deleteTodo={deleteTodo}
                                              id={todoObj.id}
                                              title={todoObj.title}
                                              changeStatus={changeStatus}
                                              tasks={tasksForTodoList}
                                              removeTask={removeTask}
                                              filter={todoObj.filter}
                                              changeFilter={changeFilter}
                                              addTask={addTask}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

            </Container>

        </div>
    );
}

export default App;
