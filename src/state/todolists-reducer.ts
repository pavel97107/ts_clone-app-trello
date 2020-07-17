import {TodoListType, FilterValuesType} from "../App";
import {v1} from 'uuid'


export type TypeAction = DeleteTodoActionType |
    CreateTodoListActionType | ChangeTodoTitleActionType | ChangeTodolistFilterActionType

export const todoListsReducer = (state : TodoListType[], action: TypeAction):TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodoList : TodoListType = {id: v1(), title: action.title, filter: "all"}
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todo = state.find(todo => todo.id === action.id)
            if (todo) {
                todo.title = action.title
                return [...state]
            }
            return state
        case 'CHANGE-TODOLIST-FILTER':

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
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListID: string,
    title: string
}
export type ChangeStatusTaskActionType = {
    type: 'CHANGE-STATUS-TASK',
    id: string,
    isDone: boolean,
    todoListID: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType
    id: string
}
export type CreateTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string,
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





export const DeleteTodoAC = (id: string) : DeleteTodoActionType => {
    return {type: "REMOVE-TODOLIST", id }
}

export const CreateTodoLisAC = (title: string) : CreateTodoListActionType => {
    return {type: 'ADD-TODOLIST', title}
}