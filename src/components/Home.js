import React from "react";
import { format } from "date-fns";
import { withTranslation } from "react-i18next";
import CircularProgress from "@material-ui/core/CircularProgress";
import Datepicker from "./Datepicker";
import SaveAnswer from "./SaveAnswer";
import Answers from "./Answers";
import Nav from "./Nav";
import base, { firebaseApp, getCurrentUser } from "../base";
import firebase from "firebase";
import "./Home.css";

class App extends React.Component {
  state = {
    currentUser: undefined,
    owner: undefined,
    date: undefined,
    answers: {},
    loadingAnswers: false,
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

  logout = async () => {
    await firebase.auth().signOut();
    this.props.history.push(`/login/`);
  };

  //se esta inicializando la aplicacion con la fecha de hoy siempre.
  async componentDidMount() {
    try {
      const todayDate = format(new Date(), "yyyy-MM-dd");
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        this.props.history.push(`/login/`);
        return;
      }
      const owner = await base.fetch(`${currentUser.uid}/owner`, {
        context: this,
      });

      this.setState({
        date: todayDate,
        owner,
        currentUser,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.date !== prevState.date) {
      if (this.dbConnection) {
        base.removeBinding(this.dbConnection);
      }
      const userId = this.state.currentUser.uid;
      const questionId = this.getQuestionId();

      this.dbConnection = base.syncState(
        //le estamos diciendo que se sincronice con esta parte de la base de datos
        `${userId}/answers/${questionId}`,
        {
          context: this,
          state: "answers",
          then: () => this.setState({ loadingAnswers: false }),
          onFailure: (error) => console.error(error),
        }
      );

      this.setState({ loadingAnswers: true });
    }
  }

  componentWillUnmount() {
    if (!this.dbConnection) {
      return;
    }
    base.removeBinding(this.dbConnection);
  }

  render() {
    const { t, tReady } = this.props;
    const { date, owner, loadingAnswers } = this.state;

    if (!date || !tReady) {
      return (
        <div className="loading-container">
          <CircularProgress />
        </div>
      );
    }

    return (
      <React.Fragment>
        <header className="header-container">
          <Nav owner={owner} logout={this.logout}></Nav>
          <Datepicker date={this.state.date} setDate={this.setDate} />
        </header>
        <h1 className="question">{t(this.getQuestionId())}</h1>
        <SaveAnswer date={this.state.date} saveAnswer={this.setAnswer} />
        {loadingAnswers ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          <Answers answersSaved={this.state.answers} />
        )}
      </React.Fragment>
    );
  }
}

export default withTranslation()(App);
