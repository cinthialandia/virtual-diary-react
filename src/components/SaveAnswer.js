import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./SaveAnswer.css";

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
      <form className="form-answer" onSubmit={this.handleSubmit}>
        <span className="year">{this.getYearFromDate()}</span>
        <div className="text-and-button">
          <TextField
            className="text-field"
            required
            value={this.state.answer}
            onChange={this.handleInput}
            label="Answer"
          />
          <Button
            className="save-button"
            variant="contained"
            type="submit"
            color="primary"
          >
            Save
          </Button>
        </div>
      </form>
    );
  }
}

export default SaveAnswer;
