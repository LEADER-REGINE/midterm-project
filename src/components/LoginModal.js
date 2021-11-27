import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import firebase from "../config/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, TwitterAuthProvider, FacebookAuthProvider } from "firebase/auth";


const fbprovider = new FacebookAuthProvider();
const googleprovider = new GoogleAuthProvider();
const twitterprovider = new TwitterAuthProvider();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

function LoginWithGoogle() {
  const auth = getAuth();
  signInWithPopup(auth, googleprovider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
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
  const auth = getAuth();
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
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
      console.log(errorMessage);
    });
}

function LoginWithFacebook() {
  const auth = getAuth();
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

  const auth = getAuth();
  const user = auth.currentUser;

  const logout = (e) => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  getAuth().onAuthStateChanged(function (user) {
    setIsLoggedIn(user);
  });



  return (
    <div>
      <Button onClick={handleOpen} variant="text" color="secondary">
        <AccountCircleIcon>
        </AccountCircleIcon>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoggedin ?

          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              This is your name
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Lalala
            </Typography>
            <Button variant="contained" color="error" onClick={logout}>
              <Typography>
                Sign Out
              </Typography>
            </Button>
          </Box>
          :
          <Box sx={style}>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              Sign In
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Sign in to review and rate students.
            </Typography>
            <Box>
              <Button variant="contained" color="secondary" onClick={() => LoginWithTwitter()}>
                <TwitterIcon />
                <Typography>
                  Login with Twitter
                </Typography>
              </Button>
              <Button variant="contained" color="error" onClick={() => LoginWithGoogle()}>
                <GoogleIcon />
                <Typography>
                  Login with Google
                </Typography>
              </Button>
              <Button variant="contained" onClick={() => LoginWithFacebook()}>
                <FacebookIcon />
                <Typography>
                  Login with Facebook
                </Typography>
              </Button>
            </Box>
          </Box>
        }
      </Modal>
    </div>
  );


}