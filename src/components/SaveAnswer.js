import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import "./SaveAnswer.css";

const SaveButton = styled(Button)({ color: "white" });

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
          <SaveButton
            className="save-button"
            variant="contained"
            type="submit"
            color="primary"
          >
            Save
          </SaveButton>
        </div>
      </form>
    );
  }
}

export default SaveAnswer;
