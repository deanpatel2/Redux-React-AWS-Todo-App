import { useSelector } from "react-redux";
import { selectTodosRemaining, selectTodos } from "../redux/tasksSlice";
import * as React from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
// import Fotmob from 'fotmob'
const axios = require('axios').default;


const Footer = () => {
    const tasksRemaining = useSelector(selectTodosRemaining)
    const [open, setOpen] = React.useState(false);
    const tasks = useSelector(selectTodos);

    const handleSave = () =>  {
        try{
            // post to API
            axios.post('https://txcyylnjri.execute-api.us-east-1.amazonaws.com/prod/savetasks', tasks)
            // display success message
            setOpen(true);
        } catch (error) {
            console.error(error)
        }
    }

    // const fotmob = new Fotmob();
    // const cityVsvilla = fotmob.getMatchDetails('3610308')

    return (
        <>
            <div>
            <Collapse in={open}>
                <Alert
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                Save Successful!
                </Alert>
            </Collapse>
            </div>
            <div className="footer">
                <div>{"Tasks Remaining: " + tasksRemaining}</div>
                <div>
                <Button
                    onClick={handleSave}
                    size="small"
                    variant="contained"
                    >
                    Save
                </Button>
                </div>
            </div>
        </>
    )
}

export default Footer;