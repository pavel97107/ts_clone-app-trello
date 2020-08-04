import {TaskTypeObject, FilterValuesType} from "../App";
import {v1} from "uuid";
import {DeleteTodoActionType} from "./todolists-reducer";



type TypeRemoveTask = {
    type: 'REMOVE-TASK',
    taskId: string,
    todoListId: string
}
type TypeAddTask = {
    type: 'ADD-TASK',
    title: string,
    todoListId: string
}
type TypeChangeTaskStatus = {
    type: 'CHANGE-STATUS-TASK',
    taskId: string,
    todoListId: string,
    isCompleted: boolean
}
type TypeChangeTaskTitle = {
    type: 'CHANGE-TITLE-TASK',
    taskId: string,
    todoListId: string,
    title: string
}
export type TypeAddTodoList = {
    type: 'ADD-TODOLIST',
    todoListId: string,
    title: string
}
type TypeAction = TypeRemoveTask | TypeAddTask | TypeChangeTaskStatus | TypeChangeTaskTitle | TypeAddTodoList | DeleteTodoActionType





export const tasksReducer = (state: TaskTypeObject, action: TypeAction): TaskTypeObject => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todoListId]: [...state[action.todoListId]].filter(el => el.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
            }
        case 'CHANGE-STATUS-TASK':
            return {
                ...state, [action.todoListId]: [...state[action.todoListId]].map(el => {
                    if (el.id === action.taskId) {
                        return {...el, isDone: action.isCompleted}
                    }
                    return el
                })
            }
        case 'CHANGE-TITLE-TASK':
            return {
                ...state, [action.todoListId]: [...state[action.todoListId]].map(el => {
                    if (el.id === action.taskId) {
                        return {...el, title: action.title}
                    }
                    return el
                })
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todoListId]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }

}


export const removeTaskAC = (taskId: string, todoListId: string): TypeRemoveTask => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}

export const addTaskAC = (title: string, todoListId: string): TypeAddTask => {
    return {type: 'ADD-TASK', title, todoListId}
}
export const changeTaskStatusAC = (taskId: string, isCompleted: boolean, todoListId: string) : TypeChangeTaskStatus => {
    return {type: 'CHANGE-STATUS-TASK', taskId, todoListId, isCompleted}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) : TypeChangeTaskTitle => {
    return {type: 'CHANGE-TITLE-TASK', taskId, todoListId, title}
}

export const addTodoListAC = (title: string) : TypeAddTodoList => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()}
}


