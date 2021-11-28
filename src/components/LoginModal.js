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
 Login : {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: "rgba(19, 20, 20 )",
  backgroundBlendMode: "multiply",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: "center",
 },

 loginButton : {
  margin : "10px 10px"
 },

 modalText : {
   padding : "5px 10px",
   color : (theme) => theme.palette.common.white,
 }
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
    <Box>
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
        <Box sx={style.Login}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx = {style.modalText}>
            Sign In
          </Typography>
          <Typography id="modal-modal-description" sx = {style.modalText}>
            Sign in to review and rate students.
          </Typography>
          <Box>
            <Button variant="contained"  sx = {style.loginButton}>
              <TwitterIcon />
            </Button>
            {/* <Button variant="contained" color="error" onClick={() => LoginWithGoogle()}> */}
            <Button variant="contained" color = "#4285F4"  sx = {style.loginButton}>
              <GoogleIcon />
            </Button>
            <Button variant="contained" sx = {style.loginButton} >
              <FacebookIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}