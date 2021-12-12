import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  TwitterAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const fbprovider = new FacebookAuthProvider();
const googleprovider = new GoogleAuthProvider();
const twitterprovider = new TwitterAuthProvider();

const style = {
  Login: {
    position: "absolute",
    top: "22%",
    left: {
      xs: "208px",
      lg: "1280px",
    },
    transform: "translate(-50%, -50%)",
    width: {
      xs: "230px",
      lg: "350px",
    },
    height: {
      xs: "150px",
      lg: "180px",
    },
    backgroundColor: "rgba(19, 20, 20 )",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "8px",
    p: 4,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  loginButton: {
    margin: "5px 5px",
    backgroundColor: (theme) => theme.palette.secondary.main,
  },
  modalTitle: {
    marginTop: {
      xs: "-25px",
      lg: "-5px",
    },
    fontFamily: "Roboto",
    letterSpacing: "0.0625rem",
    fontWeight: "normal",
    fontSize: "18px",
    fontStyle: "normal",
    color: "#D1D4C9",
  },
  modalSubtitle: {
    padding: "5px 10px",
    letterSpacing: "0.0625rem",
    fontWeight: "light",
    fontSize: ".75rem",
    color: "#D1D4C9",
  },

  logoutButton: {
    marginTop: "10px",
  },
  icons: {
    height: {
      xs: "10px",
      lg: "24px",
    },
  },
};
const auth = getAuth();
const user = auth.currentUser;
function LoginWithGoogle() {
  signInWithPopup(auth, googleprovider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function LoginWithTwitter() {
  signInWithPopup(auth, twitterprovider)
    .then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;

      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
    });
}

function LoginWithFacebook() {
  signInWithPopup(auth, fbprovider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
}

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoggedin, setIsLoggedIn] = React.useState(false);
  const [name, setName] = React.useState("");

  const logout = (e) => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("email");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  getAuth().onAuthStateChanged(function (user) {
    setIsLoggedIn(user);
    if (user !== null) {
      setName(user.displayName);
      localStorage.setItem("email", user.email);
    }
  });

  return (
    <Box>
      <Button onClick={handleOpen} variant="text" color="secondary">
        <AccountCircleOutlinedIcon sx={{ color: "white" , }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoggedin ? (
          <Box sx={style.Login}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color=" white"
            >
              {name}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={logout}
              sx={style.logoutButton}
            >
              <Typography>Sign Out</Typography>
            </Button>
          </Box>
        ) : (
          <Box sx={style.Login}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={style.modalTitle}
            >
              Sign In
            </Typography>
            <Typography id="modal-modal-description" sx={style.modalSubtitle}>
              Sign in to review and rate students.
            </Typography>
            <Box>
              <Button variant="contained" sx={style.loginButton}>
                <TwitterIcon sx={style.icons} />
              </Button>
              <Button
                variant="contained"
                sx={style.loginButton}
                onClick={() => LoginWithGoogle()}
              >
                <GoogleIcon sx={style.icons} />
              </Button>
              <Button
                variant="contained"
                sx={style.loginButton}
                onClick={() => LoginWithFacebook()}
              >
                <FacebookIcon sx={style.icons} />
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
    </Box>
  );
}
