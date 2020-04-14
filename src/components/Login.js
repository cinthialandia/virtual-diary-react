import React from "react";
import firebase from "firebase";
import Alert from "@material-ui/lab/Alert";
import FacebookIcon from "@material-ui/icons/Facebook";
import SvgIcon from "@material-ui/core/SvgIcon";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import GitHubIcon from "@material-ui/icons/GitHub";
import { styled } from "@material-ui/core/styles";
import base, { firebaseApp, getCurrentUser } from "../base";
import "./Login.css";

const BaseButton = styled(Button)({
  color: "#fff",
  display: "flex",
  width: "100%",
  marginBottom: "10px",
});

const FacebookButton = styled(BaseButton)({
  backgroundColor: "#1877F2",
  "&:hover": {
    backgroundColor: "#145fba",
  },
});
const GoogleButton = styled(BaseButton)({
  backgroundColor: "#eb4033",
  "&:hover": {
    backgroundColor: "#c9342a",
  },
});
const GitHubButton = styled(BaseButton)({
  backgroundColor: "#31c553",
  "&:hover": {
    backgroundColor: "#248c3a",
  },
});

const GoogleIcon = (props) => (
  <SvgIcon {...props}>
    <g id="style_1_copy_6">
      <path d="M 18.175781 10.757812 C 18.257812 11.199219 18.300781 11.664062 18.300781 12.148438 C 18.300781 15.929688 15.769531 18.621094 11.945312 18.621094 C 8.285156 18.621094 5.324219 15.65625 5.324219 12 C 5.324219 8.339844 8.285156 5.375 11.945312 5.375 C 13.734375 5.375 15.226562 6.035156 16.375 7.101562 L 14.507812 8.96875 L 14.507812 8.964844 C 13.8125 8.300781 12.929688 7.960938 11.945312 7.960938 C 9.757812 7.960938 7.984375 9.808594 7.984375 11.992188 C 7.984375 14.179688 9.761719 16.03125 11.945312 16.03125 C 13.929688 16.03125 15.277344 14.894531 15.554688 13.339844 L 11.945312 13.339844 L 11.945312 10.757812 Z M 18.175781 10.757812" />
    </g>
  </SvgIcon>
);

class Login extends React.Component {
  state = { error: null, loading: true };

  componentDidMount = async () => {
    try {
      const { user } = await firebase.auth().getRedirectResult();
      if (user) {
        this.authHandler(user);
        return;
      }

      const loggedUser = await getCurrentUser();
      if (loggedUser) {
        this.props.history.push(`/`);
        return;
      }

      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  authHandler = async (user) => {
    const { uid, photoURL, displayName } = user;
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
    try {
      const authProvider = new firebase.auth[`${provider}AuthProvider`]();
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await firebaseApp.auth().signInWithRedirect(authProvider);
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <CircularProgress />
        </div>
      );
    }

    return (
      <section className="login-container">
        <div className="img-container">
          <img src={process.env.PUBLIC_URL + "/images/diaryimg.png"} />
        </div>
        <div className="container-welcome">
          <h1 className="principal-title">Welcome to your new diary</h1>
          <div className="login">
            <FacebookButton
              variant="contained"
              startIcon={<FacebookIcon />}
              onClick={() => this.authenticate("Facebook")}
            >
              Facebook
            </FacebookButton>
            <GitHubButton
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={() => this.authenticate("Github")}
            >
              Github
            </GitHubButton>
            <GoogleButton
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={() => this.authenticate("Google")}
            >
              Google
            </GoogleButton>
          </div>
          {this.state.error ? (
            <Alert className="alert" severity="error">
              {this.state.error.message}
            </Alert>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Login;
