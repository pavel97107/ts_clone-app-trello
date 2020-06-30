import React, {useState} from 'react';

type TypeEditMode = {
    title: string
    saveTitle: (value: string) => void
}

export const EditableSpan = ({title, saveTitle}: TypeEditMode) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title)

    const onEditMode = () => {
        setIsEdit(true)
    }

    const offEditMode = () => {
        setIsEdit(false)
        saveTitle(newTitle)
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

