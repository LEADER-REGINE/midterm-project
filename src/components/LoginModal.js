import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
/* import firebase from "../config/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const provider = new GoogleAuthProvider(); */
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

/* function LoginWithGoogle() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
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

} */

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign In
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sign in to review and rate students.
          </Typography>
          <Box>
            <Button variant="contained" color="secondary">
              <TwitterIcon />
              <Typography>
                Login with Twitter
              </Typography>
            </Button>
            {/* <Button variant="contained" color="error" onClick={() => LoginWithGoogle()}> */}
            <Button variant="contained" color="error">
              <GoogleIcon />
              <Typography>
                Login with Google
              </Typography>
            </Button>
            <Button variant="contained" >
              <FacebookIcon />
              <Typography>
                Login with Facebook
              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}