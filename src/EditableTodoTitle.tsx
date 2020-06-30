import React, {ReactElement, useState} from 'react';

type TypeEditableTodoTitle = {
    title: string
    children: any
    changeTitleTodo: (title: string, todoID: string) => void
    todoID: string
}

export const EditableTodoTitle = ({title, children, changeTitleTodo,todoID}: TypeEditableTodoTitle) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [newTitle, setNewTitle] = useState<string>(title)
    //
    const onEditMode = () => {
        setIsEdit(true)
    }

    const offEditMode = () => {
        setIsEdit(false)
        changeTitleTodo(newTitle,todoID)
    }

    const onChangeNewTitle = (event: any) => {
        setNewTitle(event.target.value)
    }


    return (
        <>
            {isEdit ? <input autoFocus onBlur={offEditMode} onChange={onChangeNewTitle} type="text" value={newTitle}/> :
                <h3 onDoubleClick={onEditMode}>{title}{children}</h3>}
        </>

    );
}

