import React from "react";
import "./Answers.css";

class Answers extends React.Component {
  render() {
    const answersSaved = Object.entries(this.props.answersSaved).reverse();
    if (answersSaved.length === 0) {
      return <p className="no-answer">You don't have answers</p>;
    }

    return (
      <section className="answers">
        <h2 class="answers-title">Previous answers</h2>
        <ul className="answers-container">
          {/* descontruimos para obtener key and value del array. */}
          {answersSaved.map(([year, answer]) => {
            //se pone el key, porque react necesita un id cuando los elemento se repiten
            //se pone entre llaves porque estamos poniendo js en el html jsx
            return (
              <li className="answer" key={year} data-date={year}>
                {answer}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Answers;
