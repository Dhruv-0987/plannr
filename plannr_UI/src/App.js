import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Suggestions from "./Pages/Suggestions";
import Recipie from "./Pages/Recipy";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/suggestions" Component={Suggestions} />
          <Route exact path="/recipy" Component={Recipie} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
