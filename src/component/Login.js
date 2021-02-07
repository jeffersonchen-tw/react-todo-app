import '../App.css'
import firebase from 'firebase'
import {userAuth} from '../firebase_config'
import Button from '@material-ui/core/Button'
import { useContext } from 'react'
import {AuthContext} from './Auth'
import {Redirect} from 'react-router-dom'

export default function Login() {
   
  function submitUser() {
    var provider = new firebase.auth.GoogleAuthProvider()
    userAuth.signInWithRedirect(provider).then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
      }).catch((error) => {
          alert(error)
  });
  }
const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to={"/main"}></Redirect> 
  }
    return (
        <div className="loginpage">
        <div style={{marginTop: "100px"}}>
            <h1 className="title">Todo @JeffersonChen</h1>
            <Button variant="contained" color="secondary" onClick={submitUser}>Login with Google</Button>
        </div>
        </div>
    )
}
