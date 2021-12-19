import './App.css';
import Login from '../src/pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Cart from './pages/Cart/Cart';
import Items from './components/Items/Items';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Home from './pages/Home/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './pages/Navbar/Navbar';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
    <Switch>
      <Route exact path="/"><Login/></Route>
      <Route path="/SignUp"><SignUp/></Route>
      <Route path="/Cart"><Cart/></Route>
      <Route path="/Home"><Home/></Route>
      <Route path="/Items"><Items/></Route>
      <Route path="/Home/Items/:item_id"><ItemDetails/></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
