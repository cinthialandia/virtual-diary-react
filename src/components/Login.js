import React from "react";
import "./Login.css";

class Login extends React.Component {
  render() {
    return (
      <section>
        <div className="img-container">
          <img src={process.env.PUBLIC_URL + "/images/diaryimg.png"} />
        </div>
        <div className="container-welcome">
          <h1 className="principal-title">
            Welcome to your <span>new diary</span>
          </h1>
          <form className="loggin">
            <button>Facebook</button>
            <button>Gmail</button>
            <button>Microsoft</button>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
