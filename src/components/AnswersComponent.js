import React from "react";

class AnswersComponent extends React.Component {
  render() {
    const answersSaved = Object.entries(this.props.answersSaved).reverse();
    if (answersSaved.length === 0) {
      return <p>You don't have answers</p>;
    }

    return (
      <ul>
        {/* descontruimos para obtener key and value del array. */}
        {answersSaved.map(([year, answer]) => {
          //se pone el key, porque react necesita un id cuando los elemento se repiten
          //se pone entre llaves porque estamos poniendo js en el html jsx
          return (
            <li key={year}>
              {year}: {answer}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default AnswersComponent;
