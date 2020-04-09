import React from "react";
import firebase from "firebase";
import "./Login.css";
import base, { firebaseApp } from "../base";

class Login extends React.Component {
  authHandler = async (authData) => {
    const {
      user: { uid, photoURL, displayName },
    } = authData;
    const diaryOwner = await base.fetch(`${uid}/owner`, {
      context: this,
      asArray: true,
    });

    if (!diaryOwner.length) {
      await base.post(`${uid}`, {
        data: { owner: { name: displayName, photoURL } },
      });
    }
    this.props.history.push(`/`);
  };

  authenticate = async (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    const authData = await firebaseApp.auth().signInWithPopup(authProvider);

    this.authHandler(authData);
  };

  logout = () => {
    firebase.auth().signOut().then(console.log);
  };

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
          <div className="loggin">
            <button onClick={() => this.authenticate("Facebook")}>
              Facebook
            </button>
            <button onClick={() => this.authenticate("Google")}>Google</button>
            <button onClick={this.logout}>log out</button>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
