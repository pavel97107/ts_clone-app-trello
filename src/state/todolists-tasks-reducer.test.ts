import {addTodoListAC, tasksReducer} from "./tasks-reducer";
import {DeleteTodoAC, todoListsReducer} from "./todolists-reducer";
import {TaskTypeObject, TodoListType} from '../App'



describe('todolists and task reducers test', () => {


    test('ids should be equals', () => {
        const startTasksState: TaskTypeObject = {};
        const startTodolistsState: Array<TodoListType> = [];

        const action = addTodoListAC("new todolist");

        const endTasksState = tasksReducer(startTasksState, action)
        const endTodolistsState = todoListsReducer(startTodolistsState, action)

        const keys = Object.keys(endTasksState);
        const idFromTasks = keys[0];
        const idFromTodolists = endTodolistsState[0].id;

        expect(idFromTasks).toBe(action.todoListId);
        expect(idFromTodolists).toBe(action.todoListId);
    });


    test('property with todolistId should be deleted', () => {
        const startState: TaskTypeObject = {
            "todolistId1": [
                { id: "1", title: "CSS", isDone: false },
                { id: "2", title: "JS", isDone: true },
                { id: "3", title: "React", isDone: false }
            ],
            "todolistId2": [
                { id: "1", title: "bread", isDone: false },
                { id: "2", title: "milk", isDone: true },
                { id: "3", title: "tea", isDone: false }
            ]
        };

        const action = DeleteTodoAC("todolistId2");

        const endState = tasksReducer(startState, action)


        const keys = Object.keys(endState);

        expect(keys.length).toBe(1);
        expect(endState["todolistId2"]).not.toBeDefined();
    });


})