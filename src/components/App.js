import React from "react";
import { format } from "date-fns";
import Datepicker from "./Datepicker";

class App extends React.Component {
  state = {
    owner: {},
    date: {},
    question: {},
    answer: {},
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
  //se esta inicializando la aplicacion con la fecha de hoy siempre.
  componentDidMount() {
    const todayDate = format(new Date(), "yyyy-MM-dd");
    this.setState({
      date: todayDate,
    });
  }

  render() {
    return (
      <div>
        <Datepicker date={this.state.date} setDate={this.setDate} />
      </div>
    );
  }
}

export default App;
