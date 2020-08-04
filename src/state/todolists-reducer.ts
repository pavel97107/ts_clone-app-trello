import {TodoListType, FilterValuesType} from "../App";
import {v1} from 'uuid'
import {TypeAddTodoList} from "./tasks-reducer";


export type TypeAction = DeleteTodoActionType |
    ChangeTodoTitleActionType | ChangeTodolistFilterActionType | TypeAddTodoList

export const todoListsReducer = (state: TodoListType[], action: TypeAction): TodoListType[] => {
    let copyState = [...state]
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {id: action.todoListId, title: action.title, filter: "all"}
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            copyState = state.map((todo) => {
                if (todo.id === action.id) {
                    return {...todo, title: action.title}
                }
                return todo
            })
            return copyState
        case 'CHANGE-TODOLIST-FILTER':
            copyState = state.map((todo) => {
                if (todo.id === action.id) {
                    return {...todo, filter: action.filter}
                }
                return todo
            })
            return copyState

        default:
            return state
    }
}


export type DeleteTodoActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType
    id: string
}
export type ChangeTitleItemTasksActionType = {
    type: 'CHANGE-TITLE-TASKS',
    title: string,
    todoId: string,
    itemId: string
}
export type ChangeTodoTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}

export const DeleteTodoAC = (id: string): DeleteTodoActionType => {
    return {type: "REMOVE-TODOLIST", id}
}
export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, id}
}