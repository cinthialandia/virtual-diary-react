import React from "react";
import Button from "@material-ui/core/Button"; //liberia que tiene estilo para botones
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { subDays } from "date-fns"; //libreria que resta los dias en el daypicker
import { addDays } from "date-fns"; //libreria que suma los dias en el dayicker
import TextField from "@material-ui/core/TextField";
import "./Datepicker.css";

class Datepicker extends React.Component {
  //funcion, del event listener para enviar el valor de la fecha, cuando se cambie la misma en el input o daypicker
  handleInput = (e) => {
    //Pongo el valueAsdate para enviarle un objeto fecha
    //paso el valor, con props usando la funcion setDate que recibe ua fecha, la cual es nuestro valor dado del valor del evento
    this.props.setDate(e.target.valueAsDate);
  };

  //funcion del event listener para enviar el valor de la fecha seleccionada al darle click al boton
  handleClickPrev = () => {
    //se utiliza una libreria para restar los dias, que recibe como parametros un objeto fecha (dia de hoy) y el numero de dia que se van a restar
    //Esto funciona, porque la fecha siempre se tiene actualizada en el estado, y se le restara siempre un dia a la fecha que tenga el estado.
    const subDate = subDays(new Date(this.props.date), 1);
    //aqui se esta pasando mediante props la fecha ya restada y se pasa como objecto fecha a la funcion que se encuentra en app.
    this.props.setDate(subDate);
  };

  //funcion del event listener que escucha el boton de next para sumar dias a la fecha actual y poder ver dias futuros
  handleClickNext = () => {
    //el metodo adddays toma como parametros el dia que se encuentra en el estado actualizado y se le suma un dia.
    const addDate = addDays(new Date(this.props.date), 1);
    //se le envia la fecha sumada con la funcion en app setdate con el parametro de objecto fecha
    this.props.setDate(addDate);
  };

  render() {
    return (
      //estamos renderizando el daypicker
      <div className="date-picker-container">
        <Button onClick={this.handleClickPrev}>
          <ArrowLeftIcon></ArrowLeftIcon>
        </Button>
        <TextField
          type="date"
          value={this.props.date}
          onChange={this.handleInput}
        />
        <Button onClick={this.handleClickNext}>
          <ArrowRightIcon></ArrowRightIcon>
        </Button>
      </div>
    );
  }
}

export default Datepicker;
