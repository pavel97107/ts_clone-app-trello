import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import { AddBox, Menu} from '@material-ui/icons';
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';

type TypeForm = {
    onClick: (title : string) => void
}


export const AddItemForm = ( props : TypeForm) => {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)
    const addTaskOrTodo = () => {
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
            addTaskOrTodo();
        }
    }

    return (
        <div onBlur={() => setError(null)}>
            <TextField  error={!!error}  value={title}
                        label='Title'
                        helperText={error}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler} id="outlined-basic"  variant="outlined" size='small'/>
            <IconButton onClick={addTaskOrTodo} color="primary">
                <AddBox />
            </IconButton>
            {/*<Button variant="contained"  >ADD</Button>*/}
        </div>
    )
}