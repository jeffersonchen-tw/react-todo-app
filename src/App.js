import './App.css';
import Login from './component/Login';
import PrivateRoute from './component/PrivateRoute'
import { AuthProvider } from './component/Auth'
import { BrowserRouter,Switch, Route} from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/main" component={PrivateRoute}/>
      </Switch>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;