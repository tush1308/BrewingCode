import './App.css';
import Login from '../src/pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Items from './components/Items/Items';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Cart from './pages/Cart/Cart';
//import Payment from './components/Payment/Payment';
import Profile from './pages/Profile/Profile';
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
      <Route exact path="/SignUp"><SignUp/></Route>
      <Route exact path="/Cart"><Cart/></Route>
      <Route exact path="/Items"><Items/></Route>
      <Route exact path="/Items/:item_id" render={(props)=>{
        return( <ItemDetails {...props} /> )
      }}/>
      {/* <Route exact path="/payment"><Payment/></Route> */}
      <Route exact path="/profile"><Profile/></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
