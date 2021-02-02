import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar';
import Slopes from './components/Slopes';
import Footer from './components/Footer';
import Buildings from './components/Buildings';
import HiddenPaths from './components/HiddenPaths';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="title">
          <Link to="/"><h1>SNOWBOARDER</h1></Link>
        </div>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/slopes" component={ Slopes }/>
          <Route exact path="/hidden-paths" component={ HiddenPaths }/>
          <Route exact path="/buildings" component={ Buildings }/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
