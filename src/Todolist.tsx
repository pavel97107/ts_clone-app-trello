import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (id: string, value: FilterValuesType) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    deleteTodo: (id: string) => () => void
    changeTitleItemTasks: (title: string, itemID: string, todoID: string) => void
    changeTitleTodo: (title: string, todoID: string) => void
}

export function TodoList(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");


    const addTasksItem = (title: string) => {
        props.addTask(title, props.id)
    }


    const onChangeTitleTodo = (value: string) => {
        props.changeTitleTodo(value, props.id)
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} saveTitle={onChangeTitleTodo} />
            <IconButton onClick={props.deleteTodo(props.id)}><DeleteIcon/></IconButton>
        </h3>


        <AddItemForm onClick={addTasksItem}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeIsDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }

                    const onChangeTitleTasks = (value: string) => {
                        props.changeTitleItemTasks(value, t.id, props.id)
                    }

                    return <div className={props.filter !== 'completed' && t.isDone ? 'is-done' : ''} key={t.id}>
                        <Checkbox color="primary" onChange={onChangeIsDoneTask} checked={t.isDone}/>
                        <EditableSpan title={t.title} saveTitle={onChangeTitleTasks} />
                        <IconButton onClick={onClickHandler}><DeleteIcon/></IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button  size='small' color={'default'} variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}>All</Button>
            <Button  size='small' color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}>Active
            </Button>
            <Button  size='small' color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
