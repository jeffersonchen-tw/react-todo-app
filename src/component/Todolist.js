import '../App.css'
import React ,{ useContext } from 'react'
import { Button, ListItem, ListItemText, Typography } from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { db } from '../firebase_config' 
import { AuthContext } from './Auth'
import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontFamily: "Arial sans-serif"
  },
}));

export default function Todolist({todo_things,in_progress,id,deadline,detail}) {
    const {currentUser} = useContext(AuthContext)
    function toggleInprogress() {
        db.collection("Users").doc(currentUser.uid).collection("task").doc(id).update(
            {
                in_progress: !in_progress
            }
        )
    }
    
    function deleteTodo() {
        db.collection("Users").doc(currentUser.uid).collection("task").doc(id).delete()
    }
   
    
    const [anchorEl, setAnchorEl] = React.useState(null);

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const open = Boolean(anchorEl);
      const popoverid = open ? 'simple-popover' : undefined;
      const classes = useStyles()
    return (
        <div className="list">
        <ListItem>
        <ListItemText primary={<Typography style={in_progress? {}: {textDecoration: "line-through"}}>{todo_things}</Typography>} secondary={in_progress ? "In progress" : "Completed"}/>
        <h5>{deadline}</h5>
        <Button onClick={handleClick}>detail</Button>
    <Popover
            id={popoverid}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography className={classes.typography}>{detail}</Typography>
          </Popover>
        <Button onClick={toggleInprogress}>{ in_progress? "Done" : "UnDone"}</Button>
        <Button onClick={deleteTodo}><DeleteOutlineOutlinedIcon/></Button>
        </ListItem> 
        </div>
    )
}
