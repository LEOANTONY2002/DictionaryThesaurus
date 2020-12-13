import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dict from "./Components/Dict";
import Header from "./Components/Header";
import History from "./Components/History";
import Fav from "./Components/Fav";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/favs">
            <Header />
            <Fav />
          </Route>
          <Route path="/history">
            <Header />
            <History />
          </Route>
          <Route path="/">
            <Header />
            <Dict />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
