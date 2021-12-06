import "../App.css";
import { useDispatch } from "react-redux";
import { getTheme, getID } from "../redux/actions/uiAction";
import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import StudentProfile from "../components/StudentProfile";
import { Helmet } from "react-helmet";
import firebase from "../config/firebase";
import CommentSection from "../components/CommentSection";
import Rating from "@mui/material/Rating";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import RatingCom from "../components/Rating";
import { getAuth } from "firebase/auth";

const style = {
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    background: "#131414",
    paddingTop: "140px",
    "@media only screen and (max-width : 720px)": {
      justifyContent: "center",
      alignItems: "center",
    },
  },

  profilePaper: {
    width: {
      sm: "700px",
      md: "850px",
      lg: "926px",
    },
    height: {
      sm: "250px",
      md: "310px",
      lg: "324px"
    },
    backgroundColor: "#1E1F20",
  },

  innerContainer: {
    display: "flex",
    flexDirection: "column",
   
  },

  Rating: {
    marginLeft: {
      
      md: "125.3px"
    },
    margin:{
      xs:"auto"
    },
    marginTop: "10px",
    marginTop: {
      xs: "10px"
    },
    marginBottom: {
      xs: "10px"
    }

  },

  avatarCont: {
    height: {
      xs: "6.146rem",
      sm: "6.271rem",
      md: "6.271rem",
    },
    width: {
      xs: "6.146rem",
      sm: "6.271rem",
      md: "6.271rem",
    },

    border: "2px solid #FFFFFF",
    borderRadius: "10px",
    
    marginTop: {
      xs: "10px",
      md: "70px",
      lg: "80.67px",
    },

    marginLeft:{
      md: "149.17px"
    },
    margin: {
      xs: "auto",
      
    },

    

    
    
  },

  RatingPaper: {
    display: "flex",
    flexDirection: "row",
    marginLeft: {
      
      md: "110px"
    },
    color: "white",
    marginTop: "-5px",

    margin:{
      xs:"auto"
    },

    marginBottom:{
      xs:"10px"
    }

  },

  numberFont: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "18px",
    LineHeight: "20px",
    textAlign: "center",
    marginLeft: "10px"
  },

  subFont: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "12px",
    LineHeight: "16px",
    marginTop: "7px",
    marginLeft: "6px"

  },

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

  details: {
    display: "flex",
    marginLeft: {
      sm: "290px",
      md: "392px"
    },
    marginTop: {
      sm: "-155px",
      md: "-190px",
      lg: "-190px"
    },


  },

  studName: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      sm: "18px",
      md: "24px"
    },
    lineHeight: "24px",
    alignItems: "center",
    textAlign: "center",
    color: "white"
  },

  studSubdetails: {
    marginTop: "12px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "24px",
    alignItems: "center",
    marginRight: {
      sm: "40px",
      md: "40px"
    },
    color: "white"
    
  },
  subdetails: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  studSubdetailsRate: {
    marginTop: "15px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "12px",
  
    alignItems: "center",
    marginRight: {
      sm: "40px",
      md: "40px"
    },
    color: "white",
    background:"#26CE8D",
    padding:"5px",
    borderRadius:"5px",
    margin:"7px"

  },

  container:{
    margin: {
      xs: "40px",
      md: "0px"
    },
  }
};

function StudentEvaluation() {
  const value = 3;
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  getAuth().onAuthStateChanged(function (user) {
    setIsLoggedIn(user);
    if (user !== null) setName(user.displayName);
  });

  const dispatch = useDispatch();

  var uid = localStorage.getItem("userID");

  useEffect(() => {
    dispatch(getID());
  }, [dispatch]);

  const db = firebase.firestore();
  const [studProfile, setstudProfile] = useState({
    profile: [],
  });

  const fetchList = async () => {
    const studRef = await db.collection("students").doc(uid);
    let studentProfile = [];
    studRef.get().then((doc) => {
      studentProfile.push(doc.data());
      setstudProfile({ profile: studentProfile });
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Mui.Box>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Student Evaluation</title>
        <meta
          name="description"
          content="View in-depth student review details and evaluate students"
        />
        <meta
          name="keywords"
          content="Review, Ratings, Student Review, Student Ratings"
        />
      </Helmet>
      <Mui.Box>
        <Mui.Box sx={style.profileContainer}>
          <Mui.Paper sx={style.profilePaper}>
            {studProfile &&
              studProfile.profile.map((studProfile) => {
                return (
                  <Mui.Box key={studProfile.id} 
                    sx={style.container}
                  >

                    <Mui.Box sx={style.innerContainer}>
                      <Mui.Box
                        component="img"
                        sx={style.avatarCont}
                        


                        src={studProfile.profileImg}

                      />
                      <Rating
                        name="text-feedback"
                        value={studProfile.ovrall_rating}
                        readOnly
                        precision={0.5}
                        icon={<StarRoundedIcon sx={style.filledStars} />}
                        emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                        sx={style.Rating}
                      />

                      <Mui.Box sx={style.RatingPaper}>
                        <Mui.Typography sx={style.numberFont}>
                          {studProfile.ovrall_rating}
                        </Mui.Typography>
                        <Mui.Typography sx={style.subFont}>
                          Overall Rating
                        </Mui.Typography>
                        <Mui.Typography sx={style.numberFont}>
                          {studProfile.reviews}
                        </Mui.Typography>
                        <Mui.Typography sx={style.subFont}>
                          Reviews
                        </Mui.Typography>
                      </Mui.Box>
                    </Mui.Box>

                    <Mui.Box >
                      <Mui.Box sx={style.details}>
                        <Mui.Typography sx={style.studName}>{studProfile.fullname}</Mui.Typography>
                      </Mui.Box>
                      <Mui.Box sx={{ display: "flex", marginLeft: {sm:"290px", md:"392px"} }}>
                        <Mui.Box sx={style.subdetails}>
                          <Mui.Typography sx={style.studSubdetails}>Gender :</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>Birthday :</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>Address :</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>Nickname :</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>Skills/Language :</Mui.Typography>

                        </Mui.Box>
                        <Mui.Box sx={style.subdetails}>
                          <Mui.Typography sx={style.studSubdetails}>{studProfile.gender}</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>{studProfile.bday}</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>{studProfile.addr}</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>{studProfile.nicname}</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>{studProfile.skills}</Mui.Typography>

                        </Mui.Box>
                        <Mui.Box sx={style.subdetails}>
                          <Mui.Typography sx={style.studSubdetails}>Teamwork:</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>Creativity:</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>Adaptability:</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>Leadership:</Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>Persuasion:</Mui.Typography>

                        </Mui.Box>
                        <Mui.Box sx={style.subdetails}>
                          <Mui.Typography sx={style.studSubdetailsRate}>{studProfile.ovrall_rating}  </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsRate}>{studProfile.ovrall_rating}  </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsRate}>{studProfile.ovrall_rating}  </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsRate}>{studProfile.ovrall_rating} </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsRate}>{studProfile.ovrall_rating}  </Mui.Typography>

                        </Mui.Box>
                      </Mui.Box>
                    </Mui.Box>
                  </Mui.Box>

                );
              })}
          </Mui.Paper>
        </Mui.Box>
        <Mui.Box>
          <RatingCom />
        </Mui.Box>
        <CommentSection />
      </Mui.Box>
    </Mui.Box>
  );
}

export default StudentEvaluation;
