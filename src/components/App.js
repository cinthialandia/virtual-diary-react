import React from "react";
import { format } from "date-fns";
import { withTranslation } from "react-i18next";
import Datepicker from "./Datepicker";
import SaveAnswer from "./SaveAnswer";
import AnswersComponent from "./AnswersComponent";
import base from "../base";

const FAKE_USER_ID = "asdf123";

class App extends React.Component {
  state = {
    owner: undefined,
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
  async componentDidMount() {
    const todayDate = format(new Date(), "yyyy-MM-dd");
    const owner = await base.fetch(`${FAKE_USER_ID}/name`, { context: this });

    this.setState({
      date: todayDate,
      owner,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.date !== prevState.date) {
      if (this.dbConnection) {
        base.removeBinding(this.dbConnection);
      }
      this.dbConnection = base.syncState(
        //le estamos diciendo que se sincronice con esta parte de la base de datos
        `${FAKE_USER_ID}/answers/${this.getQuestionId()}`,
        {
          context: this,
          state: "answers",
        }
      );
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.dbConnection);
  }

  render() {
    const { t, tReady } = this.props;
    const { date, owner } = this.state;

    if (!date || !tReady) {
      return <p>loading</p>;
    }

    return (
      <div>
        <header>
          <h3>{owner}</h3>
          <Datepicker date={this.state.date} setDate={this.setDate} />
        </header>
        <h1>{t(this.getQuestionId())}</h1>
        <SaveAnswer date={this.state.date} saveAnswer={this.setAnswer} />
        <AnswersComponent answersSaved={this.state.answers} />
      </div>
    );
  }
}

export default withTranslation()(App);
