import React, {useState} from 'react';

type TypeEditMode = {
    title: string
    itemID: string
    todoID: string
    changeTitleItemTasks: (title: string, itemID: string, todoID: string) => void
}

export const EditableSpan = ({title, itemID, todoID, changeTitleItemTasks}: TypeEditMode) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title)

    const onEditMode = () => {
        setIsEdit(true)
    }

    const offEditMode = () => {
        setIsEdit(false)
        changeTitleItemTasks(newTitle, itemID, todoID)
    }

    const onChangeNewTitle = (event: any) => {
        setNewTitle(event.target.value)
    }


    return (
        <>
            {isEdit ? <input autoFocus onBlur={offEditMode} onChange={onChangeNewTitle} type="text" value={newTitle}/> :
                <span onDoubleClick={onEditMode}>{title}</span>}
        </>

    );
}

