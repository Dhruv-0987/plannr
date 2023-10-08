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
import Groceries from "./Pages/Groceries";
import RecipyDetail from "./Pages/RecipyDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Community from "./Pages/Community";
import About from "./Pages/About";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/suggestions" Component={Suggestions} />
          <Route exact path="/recipy" Component={Recipie} />
          <Route exact path="/groceries" Component={Groceries} />
          <Route
            exact
            path="/recipedetail/:recipeId"
            Component={RecipyDetail}
          />
          <Route exact path="/community" Component={Community} />
          <Route exact path="/about" Component={About} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
