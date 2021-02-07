import React, { useEffect, useState, useContext} from 'react'
import '../App.css';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import firebase from 'firebase/app'
import { db } from '../firebase_config'
import Todolist from './Todolist'
import {AuthContext} from './Auth' 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Slide, useScrollTrigger } from "@material-ui/core"
import { userAuth } from '../firebase_config'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Modal from '@material-ui/core/Modal'
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'

export default function Main() {
  const [inputtodo, setInputtodo] = useState("")
  const [task, setTask] = useState([])
  const [detail, setDetail] = useState("")  

  function addtodo(e) {
    e.preventDefault()
    db.collection("Users").doc(currentUser.uid).collection("task").add({
      in_progress: true,
      time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: inputtodo,
      deadline: date,
      detail: detail
    })
    setOpen(false)
    setInputtodo("")
  }
 
  function getTask() {
      db.collection("Users").doc(currentUser.uid).collection("task").onSnapshot(
          (querySnanshot) => {
              setTask(
                  querySnanshot.docs.map(
                      (doc) => ({
                          id: doc.id,
                          todo: doc.data().todo,
                          in_progress: doc.data().in_progress,
                          deadline: doc.data().deadline.toDate().toLocaleString(undefined, {year: "numeric", month: "numeric"
                        , day: "numeric", hour:" 2-digit", minute: "2-digit"}),
                          detail: doc.data().detail
                      }
                      )
                  )
              )
          }
      )
  }

  useEffect(() => {
      getTask();
  }, )

  const {currentUser} = useContext(AuthContext)  
    
  const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
      width: "100%"
  },
  title: {
    flexGrow: 1,
  },
}));
const classes = useStyles();
const trigger = useScrollTrigger()
const [open, setOpen] = useState(false)
const handleOpen = () => {
    setOpen(true)
}

const [date, setDate] = useState(new Date())
    return (
    <div className="App">
        <Slide appear={false} direction="down" in={!trigger} >
        <div className={classes.root}>
    <AppBar position="static">
        <Toolbar>
        <MenuIcon />
        <Typography variant="h6" className={classes.title}>
            Welcome, {currentUser.displayName}
        </Typography>
        <Button color="inherit" onClick={()=> {userAuth.signOut()}}>Log out</Button>
        </Toolbar>
    </AppBar>
        </div>
        </Slide>
        {task.map((todo)=> (
            <Todolist id={todo.id} todo_things={todo.todo} in_progress={todo.in_progress} deadline={todo.deadline} detail={todo.detail} key={todo.id}/>
        ))}
    <Fab color="secondary" aria-label="add" style={{position: 'fixed', top:"90%"}} onClick={handleOpen}>
        <AddIcon/>
    </Fab>
        <Modal open={open} aria-labelledby="Add tasks" style={{display: "flex",alignItems: "center", justifyContent:"center", alignContent: "center"}}>
        <div style={{width: "80%", height: "80%", backgroundColor: "white", position:"absolute"}}>
    <form className="inputform">
        <div style={{ position: "absolute", left: "90%", top: "10%"}}>
        <IconButton onClick={() => {setOpen(false)}}>
            <CloseIcon/>
        </IconButton>
        </div>
    <TextField id="filled-basic"
    label="input a new task" variant="outlined"
    color="primary"
    style={{ maxWidth: "500px", width: "70%", marginLeft:"10%"}}
    onChange={(e) => {setInputtodo(e.target.value)}}
    value={inputtodo}/>
        <div style={{marginTop: "6%", marginLeft: "10%"}}>
        <h4 style={{fontFamily: "Arial sans-serif"}}>Deadline:</h4>
        </div>
        <div style={{marginTop:"2%", marginLeft:"10%"}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker value={date} onChange={setDate}/>
        </MuiPickersUtilsProvider>
        </div>
        <div style={{ marginTop: "10%", marginLeft:"10%"}}>
        <TextareaAutosize
      rowsMin={3}  
      rowsMax={5}
      aria-label="maximum height"
      placeholder="details"
      onChange={(e) => {setDetail(e.target.value)}}
      value={detail}/>
        </div>
    <Button type="submit" variant="contained" color="primary"
    onClick={addtodo} className="task_btn" 
    style={{marginLeft: "10%", marginTop: "5%"}}>Add!</Button>
    </form>
        </div>
        </Modal>
    </div>
    )
}