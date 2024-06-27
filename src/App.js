import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LaunchList from "./components/LaunchList";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>SpaceX Launches</h1>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LaunchList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
