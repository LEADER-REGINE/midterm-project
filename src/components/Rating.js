import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import * as Mui from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, TwitterAuthProvider, FacebookAuthProvider } from "firebase/auth";

const fbprovider = new FacebookAuthProvider();
const googleprovider = new GoogleAuthProvider();
const twitterprovider = new TwitterAuthProvider();

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

const style = {
  loginButton: {
    margin: "5px 5px",
    backgroundColor: (theme) => theme.palette.secondary.main,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    background: "#131414",
    paddingTop: "0",
    alignItems: "center",
    "@media only screen and (max-width : 720px)": {
      justifyContent: "center",
    },
  },

  ratingPaper: {
    height: {
      xs: "200px",
      sm: "380px",
      md: "556px",
    },
    width: {
      xs: "160px",
      sm: "300px",
      md: "400px",
    },
    margin: {
      xs: "10px",
      sm: "15px",
      md: "20px",
    },

    backgroundColor: "#1E1F20",
    elevation: "10",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "static",
    border: "1px solid #303336",


    "@media only screen and (max-width : 720px)": {
      marginTop: "10px",
    },
  },
  //CONTROLLED
  filledStars: {
    color: "#26CE8D",
    fontSize: {
      xs: "10px",
      sm: "20px",
      md: "30px",
    },
  },

  emptyStars: {
    color: "#2C2F31",

    fontSize: {
      xs: "10px",
      sm: "20px",
      md: "30px",
    },
  },
  //READ ONLY
  roemptyStars: {
    color: "#2C2F31",

    fontSize: {
      xs: "10px",
      sm: "20px",
      md: "45px",
    },
  },

  rofilledStars: {
    color: "#26CE8D",
    fontSize: {
      xs: "10px",
      sm: "20px",
      md: "45px",
    },
  },
  addStars: {
    position: "static",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      xs: "10px",
      sm: "14px",
      md: "18px",
    },
    lineHeight: "20px",
    display: "flex",
    textAlign: "center",
    color: "white",
    marginTop: "24px",
    marginBottom: "24px",
  },

  rateTxt: {
    position: "static",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      xs: "7px",
      sm: "12px",
      md: "18px",
    },
    lineHeight: "20px",
    display: "flex",
    textAlign: "center",
    color: "white",
    margin: {
      xs: "5px",
      sm: "14px",
      md: "20px",

    },
    justifyContent: "center",
  },
  // share us style
  labelTxt: {
    position: "static",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      xs: "4.2px",
      sm: "10px",
      md: "14px",
    },
    lineHeight: "20px",
    display: "flex",
    textAlign: "center",
    color: "white",
    margin: {
      xs: ".1px",
      sm: "5px",
      md: "14px",

    },
    justifyContent: "center",
  },
  criteria: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      xs: "4.2px",
      sm: "10px",
      md: "14px",
    },
    display: "flex",
    color: "#D1D4C9",
    margin: {
      xs: "7px 15px",
      sm: "10px 30px",
      md: "15px 40px",
    },

  },
  stars: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    display: "flex",
    color: "#D1D4C9",
    margin: {
      xs: "5px 20px",
      sm: "7px 40px",
      md: "10px 60px",
    },

  },
  allign: {
    display: "flex",
    flexDirection: "column",

  },
  allign2: {
    display: "flex",
    flexDirection: "row",

  },
  commentBox: {
    backgroundColor: "#131414",
    position: 'absolute',
    height: {
      xs: "20px",
      sm: "70px",
      md: "100px",
    },
    width: {
      xs: "100px",
      sm: "200px",
      md: "336px",
    },
    border: "1px solid #303336",
    boderRadius: "8px",


  },
  submitButton: {
    fontSize: {
      xs: "4.2px",
      sm: "10px",
      md: "14px",
    },
    backgroundColor: "#26CE8D",
    height: {
      xs: "15px",
      sm: "30px",
      md: "44px",
    },
    width: {
      xs: "50px",
      sm: "90px",
      md: "143px",
    },
    marginTop: {
      xs: "25px",
      sm: "80px",
      md: "120px",
    },
  },


};

export default function BasicRating() {
  const [value, setValue] = React.useState(0);
  const [isLoggedin, setIsLoggedIn] = React.useState(false);

  getAuth().onAuthStateChanged(function (user) {
    setIsLoggedIn(user);

  });



  return (
    <Mui.Box sx={style.ratingContainer}>
      {isLoggedin ?

        <Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography sx={style.addStars} component="legend">
              Add your Rating
            </Typography>
            <Rating
              icon={<StarRoundedIcon sx={style.rofilledStars} />}
              emptyIcon={<StarRoundedIcon sx={style.roemptyStars} />}
              name="read-only"
              value={value}
              readOnly
            />
          </Box>
          <Mui.Paper sx={style.ratingPaper} elevation="10">
            <Mui.Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >

              <Typography sx={style.rateTxt}>Rating</Typography>

              <Mui.Box sx={style.allign2}>

                <Mui.Box sx={style.allign}>
                  <Typography sx={style.criteria}>Teamwork</Typography>
                  <Typography sx={style.criteria}>Creativity</Typography>
                  <Typography sx={style.criteria}>Adaptability</Typography>
                  <Typography sx={style.criteria}>Leadership</Typography>
                  <Typography sx={style.criteria}>Persuation</Typography>
                </Mui.Box>
                <Mui.Box sx={style.allign}>
                  <Rating
                    sx={style.stars}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    icon={<StarRoundedIcon sx={style.filledStars} />}
                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                  />

                  <Rating
                    sx={style.stars}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    icon={<StarRoundedIcon sx={style.filledStars} />}
                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                  />

                  <Rating
                    sx={style.stars}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    icon={<StarRoundedIcon sx={style.filledStars} />}
                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                  />

                  <Rating
                    sx={style.stars}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    icon={<StarRoundedIcon sx={style.filledStars} />}
                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                  />

                  <Rating
                    sx={style.stars}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    icon={<StarRoundedIcon sx={style.filledStars} />}
                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                  />
                </Mui.Box>
              </Mui.Box>
              <Typography sx={style.labelTxt}>Share us your thoughts!</Typography>
              <Typography sx={style.labelTxt}>
                <TextField
                  multiline
                  rows={3}
                  sx={style.commentBox}
                />
                <Button sx={style.submitButton} variant="contained">Submit</Button>
              </Typography>

            </Mui.Box>

          </Mui.Paper>
        </Box>
        :
        <Box >
          <Mui.Paper sx={style.ratingPaper} >
            <Mui.Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography sx={style.labelTxt}>Please login to rate students</Typography>

              <Box>
                <Button variant="contained" sx={style.loginButton} >

                  <FacebookIcon />
                </Button>
                <Button variant="contained" sx={style.loginButton} onClick={() => LoginWithGoogle()}>
                  <GoogleIcon />
                </Button>
                <Button variant="contained" sx={style.loginButton} >
                  <TwitterIcon />
                </Button>
              </Box>
            </Mui.Box>

          </Mui.Paper>

        </Box>
      }

    </Mui.Box>
  );
}
