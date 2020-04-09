import React from "react";
import Paper from "@material-ui/core/Paper";
import Router from "./Router";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Paper className="card-container" elevation={10}>
        <Router></Router>
      </Paper>
    );
  }
}

export default App;
