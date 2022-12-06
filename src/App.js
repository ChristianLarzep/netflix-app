import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate as Redirect,
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Watch from "./pages/Watch";
import { useContext } from 'react';
import { AuthContext } from "./authContext/AuthContext";

import './App.scss';

function App() {
  const { user } = useContext( AuthContext );

  return (
    <Router>
      <Switch>
        <Route
          path="*"
          element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            } />
        <Route exact path="/" element={ user ? <Home /> : <Redirect to="/register" />}/>
        <Route exact path="/register" element={ !user ? <Register /> : <Redirect to="/" />}/>
        <Route exact path="/login" element={ !user ? <Login /> : <Redirect to="/" />}/>
        {
          user && (
            <>
              <Route path="/movies" element={<Home type="movie"/>} />
              <Route path="/series" element={<Home type="series"/>}/>
              <Route path="/watch" element={<Watch />}/>
            </>
          )
        }    
      </Switch>
    </Router>
  );
}

export default App;
