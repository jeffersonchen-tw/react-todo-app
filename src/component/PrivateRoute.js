import React , {useContext} from 'react'
import { Redirect } from 'react-router-dom';
import { AuthContext } from './Auth'
import Main from './Main'

export default function PrivateRoute() {
    const {currentUser}  = useContext(AuthContext);
    if (currentUser != null) {
        return <Main></Main>
    } else {
        return <Redirect to={"/"} />
    }
}
