import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type TypeForm = {
    onClick: (title : string) => void
}


export const AddItemForm = ( props : TypeForm) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim()) {
            props.onClick(title)
        } else {
            setError('error-message')
        }
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''} value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}