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
import Pagination from "../components/Pagination"

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
  pagination: {
  
    background: "#131414",
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
      lg: "324px",
    },
    backgroundColor: "#1E1F20",

  },

  innerContainer: {
    display: "flex",
    flexDirection: "column",

  },

  Rating: {
    marginLeft: {
      md: "125.3px",
    },
    marginTop: "10px",
    marginTop: {
      xs: "10px",
    },
    marginBottom: {
      xs: "10px",
    },
  },

  avatarCont: {
    height: {
      xs: "6.146rem",
      sm: "6.271rem",
      md: "122.22px",
    },
    width: {
      xs: "6.146rem",
      sm: "6.271rem",
      md: "122.22px",
    },

    border: "2px solid #FFFFFF",
    borderRadius: "10px",

    marginTop: {
      xs: "10px",
      md: "70px",
      lg: "80.67px",
    },

    marginLeft: {
      md: "140px",
    },
  },

  RatingPaper: {

    display: "flex",
    flexDirection: "row",
    marginLeft: {
      md: "110px",
    },
    color: "white",
    marginTop: "-5px",
    marginBottom: {
      xs: "10px",
    },
    color: "#D1D4C9",
  },

  numberFont: {
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "18px",
    LineHeight: "20px",
    textAlign: "center",
    marginLeft: "10px",
  },

  subFont: {
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "12px",
    LineHeight: "16px",
    marginTop: "7px",
    marginLeft: "6px",
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
      sm: "270px",
      md: "384px",
    },
    marginTop: {
      sm: "-200px",
      md: "-250px",
      lg: "-255px",
    },
  },

  studName: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      xs: "px",
      sm: "18px",
      md: "24px",
    },
    lineHeight: "24px",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },

  studCourse: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      xs: "10px",
      md: "14px",
    },
    lineHeight: "24px",
    alignItems: "center",
    textAlign: "center",
    color: "#D1D4C9",
    margin: "0px 12px",
  },
  studSubdetails: {
    marginTop: "12px",
    fontWeight: "500",
    fontSize: {
      xs: "10px",
      sm: "11.5px",
      md: "12px",
    },
    lineHeight: "24px",
    alignItems: "center",
    marginRight: {
      sm: "40px",
      md: "40px",
    },
    color: "#D1D4C9",
  },

  studSubdetailsinfo: {
    letterSpacing: "1px",
    marginTop: "12px",
    textAlign: "right",
    fontWeight: "300",
    fontSize: {
      xs: "10px",
      sm: "11.5px",
      md: "12px",
    },
    lineHeight: "24px",
    alignItems: "center",
    marginRight: {
      sm: "20px",
      md: "100px",
    },
    color: "#D1D4C9",
    marginRight: "10px"
  },

  subdetails: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: {
      sm: "0px",
      md: "20px",
    },
  },
  studSubdetailsRate: {
    marginTop: "15px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      xs: "10px",
      sm: "11.5px",
      md: "12px",
    },
    lineHeight: "12px",

    alignItems: "center",
    marginRight: {
      sm: "40px",
      md: "40px",
    },
    color: "white",
    background: "#26CE8D",
    padding: "5px",
    borderRadius: "5px",
    marginTop: "12px",
  },

  container: {
    margin: {
      xs: "40px",
      md: "0px",
    },
  },
  socialMediaContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: {
      md: "12px",
      lg: "30px",
    },
    marginLeft: {
      sm: "110px",
      md: "170px",
      lg: "90px",
    },
  },
  socialMediaLink: {
    padding: "1px",
    display: "flex",
    marginLeft: "24px",
    letterSpacing: "1px",
    color: "#26CE8D",

    fontWeight: "300",

    lineHeight: "16px",
    fontSize: {
      xs: "10px",
      sm: "8px",
      md: "12px",
    },
  },
  socialMediacolorLink: {
    color: "#62666D",
    letterSpacing: "1px",
    padding: "1px",
    display: "flex",
    marginLeft: "24px",
    fontWeight: "300",
    lineHeight: "16px",
    fontSize: {
      xs: "10px",
      sm: "8px",
      md: "12px",
    },
  },
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
    <Mui.Box >
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
          <Mui.Paper sx={style.profilePaper} >
            {studProfile &&
              studProfile.profile.map((studProfile) => {
                return (
                  <Mui.Box key={studProfile.id} sx={style.container}>
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

                    <Mui.Box     >
                      <Mui.Box sx={style.details} >
                        <Mui.Typography sx={style.studName}>
                          {studProfile.fullname}
                        </Mui.Typography>
                        <Mui.Typography sx={style.studCourse}>
                          {studProfile.course}
                        </Mui.Typography>
                      </Mui.Box>
                      <Mui.Box sx={{ background: "#131414" }}
                        sx={{
                          display: "flex",
                          marginLeft: { sm: "270px", md: "385px" },
                        }}
                      >
                        <Mui.Box sx={style.subdetails}>
                          <Mui.Typography sx={style.studSubdetails}>
                            Gender :
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>
                            Birthday :
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>
                            Address :
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>
                            Nickname :
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>
                            Skills / Language :
                          </Mui.Typography>
                        </Mui.Box>
                        <Mui.Box sx={style.subdetails}>
                          <Mui.Typography sx={style.studSubdetailsinfo}>
                            {studProfile.gender}
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsinfo}>
                            {studProfile.bday}
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsinfo}>
                            {studProfile.addr}
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsinfo}>
                            {studProfile.nickname}
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsinfo}>
                            {studProfile.skills}
                          </Mui.Typography>
                        </Mui.Box>
                        <Mui.Box sx={style.subdetails}>
                          <Mui.Typography sx={style.studSubdetails}>
                            Teamwork:
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>
                            Creativity:
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>
                            Adaptability:
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>
                            Leadership:
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetails}>
                            Persuasion:
                          </Mui.Typography>
                        </Mui.Box>
                        <Mui.Box sx={style.subdetails}>
                          <Mui.Typography sx={style.studSubdetailsRate}>
                            {studProfile.ovrall_rating}{" "}
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsRate}>
                            {studProfile.ovrall_rating}{" "}
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsRate}>
                            {studProfile.ovrall_rating}{" "}
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsRate}>
                            {studProfile.ovrall_rating}{" "}
                          </Mui.Typography>
                          <Mui.Typography sx={style.studSubdetailsRate}>
                            {studProfile.ovrall_rating}{" "}
                          </Mui.Typography>
                        </Mui.Box>
                      </Mui.Box>
                      <Mui.Box sm item sx={style.socialMediaContainer}>
                        <Mui.Typography sx={style.socialMediacolorLink}>
                          Github{" "}
                        </Mui.Typography>
                        <Mui.Typography sx={style.socialMediaLink}>
                          Facebook{" "}
                        </Mui.Typography>
                        <Mui.Typography sx={style.socialMediaLink}>
                          Linkedin{" "}
                        </Mui.Typography>
                        <Mui.Typography sx={style.socialMediacolorLink}>
                          Twitter{" "}
                        </Mui.Typography>
                      </Mui.Box>
                    </Mui.Box>
                  </Mui.Box>
                );
              })}
          </Mui.Paper>
        </Mui.Box>
        <Mui.Box >
          <RatingCom />
        </Mui.Box>
        <CommentSection />

      </Mui.Box>
      <Mui.Box sx={style.pagination}>
        <Pagination />
      </Mui.Box>
    </Mui.Box>
  );
}

export default StudentEvaluation;
