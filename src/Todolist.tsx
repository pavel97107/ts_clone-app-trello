import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {EditableTodoTitle} from "./EditableTodoTitle";


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


    return <div>
        <EditableTodoTitle todoID={props.id} changeTitleTodo={props.changeTitleTodo} title={props.title}>{}
            <button onClick={props.deleteTodo(props.id)}>X</button>
        </EditableTodoTitle>
        <AddItemForm onClick={addTasksItem}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeIsDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }
                    return <li className={props.filter !== 'completed' && t.isDone ? 'is-done' : ''} key={t.id}>
                        <input type="checkbox" onChange={onChangeIsDoneTask} checked={t.isDone}/>
                        <EditableSpan changeTitleItemTasks={props.changeTitleItemTasks}
                                      itemID={t.id} todoID={props.id}
                                      title={t.title}/>
                        <button onClick={onClickHandler}>x</button>

                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
