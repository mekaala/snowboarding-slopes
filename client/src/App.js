import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar';
import Slopes from './components/Slopes';
import Footer from './components/Footer';
import Buildings from './components/Buildings';
import HiddenPaths from './components/HiddenPaths';
import ScrollToTop from './components/ScrollToTop';
import SingleSlope from './components/SingleSlope';
import SingleHiddenPath from './components/SingleHiddenPath';

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop/>
        <div className="title">
          <Link to="/"><h1>SNOWBOARDER</h1></Link>
        </div>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/slopes" component={ Slopes }/>
          <Route path="/slopes/:slopeId" component={ SingleSlope }/>
          <Route exact path="/hiddenPaths" component={ HiddenPaths }/>
          <Route path="/hiddenPaths/:hiddenPathId" component={ SingleHiddenPath }/>
          <Route exact path="/buildings" component={ Buildings }/>
          <Route exact path="/buildings" component={ Buildings }/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
