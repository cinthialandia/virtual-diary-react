import React from "react";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Router from "./Router";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fca82e",
    },
    secondary: {
      main: "#e678a7",
    },
  },
  typography: {
    button: {
      color: "#fff",
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Paper className="card-container" elevation={10}>
          <Router></Router>
        </Paper>
      </ThemeProvider>
    );
  }
}

export default App;
