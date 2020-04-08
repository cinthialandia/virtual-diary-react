import React from "react";
import { format } from "date-fns";
import { withTranslation } from "react-i18next";
import Datepicker from "./Datepicker";
import SaveAnswer from "./SaveAnswer";
import AnswersComponent from "./AnswersComponent";

class App extends React.Component {
  state = {
    owner: {},
    date: undefined,
    answers: {},
  };

  //funcion que recibe un objecto fecha del componente daypicker y este le da el formato requerido para que se vea en le daypicker
  setDate = (date) => {
    //acepta el date como una fecha y le cambia el formato.
    const newDate = format(date, "yyyy-MM-dd");
    //nueva fecha actualizada se setea en el estado.
    this.setState({
      date: newDate,
    });
  };
  getQuestionId = () => {
    const date = new Date(this.state.date);
    const dateMonth = date.getMonth() + 1;
    const dateDay = date.getDate();
    return `d${dateDay}-m${dateMonth}`;
  };

  setAnswer = (year, answer) => {
    this.setState({
      answers: { ...this.state.answers, [year]: answer },
    });
  };

  //se esta inicializando la aplicacion con la fecha de hoy siempre.
  componentDidMount() {
    const todayDate = format(new Date(), "yyyy-MM-dd");
    this.setState({
      date: todayDate,
    });
  }

  //componentDidUpdate(prevProps, prevState) {}

  render() {
    const { t, tReady } = this.props;
    const { date } = this.state;

    if (!date || !tReady) {
      return <p>loading</p>;
    }

    return (
      <div>
        <Datepicker date={this.state.date} setDate={this.setDate} />
        <h1>{t(this.getQuestionId())}</h1>
        <SaveAnswer date={this.state.date} saveAnswer={this.setAnswer} />
        <AnswersComponent answersSaved={this.state.answers} />
      </div>
    );
  }
}

export default withTranslation()(App);
