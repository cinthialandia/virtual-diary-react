import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class SaveAnswer extends React.Component {
  state = {
    answer: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.saveAnswer(this.getYearFromDate(), this.state.answer);
    this.setState({
      answer: "",
    });
  };

  handleInput = (event) => {
    this.setState({
      answer: event.target.value,
    });
  };

  getYearFromDate() {
    const date = new Date(this.props.date);
    return date.getFullYear();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span>{this.getYearFromDate()}</span>
        <TextField
          required
          id="standard-required"
          value={this.state.answer}
          onChange={this.handleInput}
          label="Answer"
        />
        <Button variant="contained" type="submit" color="primary">
          SAVE
        </Button>
      </form>
    );
  }
}

export default SaveAnswer;
