import "../App.css";

import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import firebase from "../config/firebase";
import { onSnapshot } from "@firebase/firestore";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { studentData } from "../pages/studentinfo";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTheme, getID } from "../redux/actions/uiAction";
import { setID } from "../redux/actions/uiAction";
import { display } from "@mui/system";
import Rating from "@mui/material/Rating";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const style = {
  sortContainer: {
    marginTop: "57px",
    marginLeft: {
      sm: "400px",
      md: "550px",
    },
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "@media only screen and (max-width : 720px)": {
      marginLeft: "15px",
    },
  },

  sort: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "12px",
    color: "#D1D4C9",
  },

  filter: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "12px",
    color: "#D1D4C9",
    marginLeft: "10px",
    "@media only screen and (max-width : 720px)": {
      marginLeft: "0px",
    },
  },

  formControl: {
    margin: (theme) => theme.spacing(0.5),
    minWidth: 120,
  },

  dropDown: {
    border: "1px solid #303336",
    boxSizing: "border-box",
    borderRadius: "8px",
    fontSize: {
      xs: "8px",
      sm: "10px",
      md: "12px",
    },
    color: "#D1D4C9",
  },

  studentLabel: {
    fontSize: "14px",
    color: "#62666D",
    marginBottom: "20px",
  },

  studListPaper: {
    backgroundColor: "#1E1F20",
    height: "64px",
    width: {
      xs: "380px",
      sm: "600px",
      md: "800px",
      lg: "906px",
    },
    borderRadius:"12px",
    flexDirection: "row",
    marginBottom: "12px",
    flexWrap: "wrap",
  },
  imgFname: {
    display: "flex",
    alignItems: "center",
    marginTop: "10.33px",
    marginLeft: {
      xs: "21.33px",
      sm: "31.33px",
      md: "61.33px",
    },
  },
  studImg: {
    height: {
      xs: "30px",
      sm: "38px",
      md: "42.67px",
    },
    borderRadius: "5px",
    border: "2px solid #303336",
  },
  studDetails: {
    display: "flex",
    marginLeft: "477px",
  },

  studsubDetailsCourse: {
    display: "flex",

    marginLeft: {
      xs: "180px",
      sm: "280px",
      md: "413px",
      lg: "475px",
    },
    marginRight: "22.5px",
    marginTop: {
      xs: "-25.33px",
      sm: "-30.33px",
      md: "-40.33px",
    },
   
    
  },
  studsubDetailsReview: {
    display: "flex",
    marginLeft: {
      xs: "180px",
      sm: "350px",
      md: "500px",
      lg: "620px",
    },
    marginRight: "22.5px",
    marginTop: {
      xs: "-25.33px",
      sm: "-30.33px",
      md: "-20.33px",
    },
  },

  studsubDetailsRating: {
    display: "flex",
    marginLeft: {
      xs: "180px",
      sm: "350px",
      md: "500px",
      lg: "550px",
    },
    marginRight: "22.5px",
    marginTop: {
      xs: "-25.33px",
      sm: "-30.33px",
      md: "-40.33px",
    },
  },

  details: {
    display: "flex",
    flexDirection: "row",
    
    marginLeft: {
      xs: "135px",
      sm: "245px",
      md: "390px",
    },
    flexWrap: "wrap",
    margin: "20px 0",
    color: "#62666D",
    justifyContent: "center",
    alignItems: "center",
  },
  studListContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent : "center",
    flexDirection: "column",
    
  },
  stdLabel: {
    marginLeft: {
      xs: "25px",
      sm: "80px",
      md: "100px",
    },
    textAlign: "center",
  },

  studameFont: {
    
    fontStyle: "normal",
    fontWeight: "500",
    color: "#D1D4C9",
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "18px",
    },
    paddingLeft: "7.33px",
    alignItems: "center",
    
  },

  studDetailsFont: {
    fontStyle: "normal",
    fontWeight: "500",
    color: "#62666D",
    
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "14px",
    },
 
  },
  studDetailsFontReview: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    color: "#D1D4C9",
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "18px",
    },
    
    marginLeft: {
      xs: "55px",
      sm: "115px",
      md: "132px",
      lg: "142.5px",
    },
  },
  studDetailsFontRating: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "18px",
    },
    marginLeft: {
      xs: "30px",
      sm: "48.5px",
      md: "55px",
      lg: "76px",
    },
  },
  styledFont: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "14px",
    },
    textAlign: "center",
  },

  starContainer : {
    marginLeft : {
      xs: "30px",
      sm: "48.5px",
      md: "55px",
      lg: "76px",
    }
  }
};

export default function LoS() {
  const sData = studentData;
  const [filter, setFilter] = useState("");

  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("");

  const db = firebase.firestore();
  const [studlist, setstudlist] = useState({
    list: [],
  });

  const fetchList = async () => {
    const studRef = db.collection("students");
    const data = await studRef.get();
    let studentList = [];
    data.docs.forEach((onSnapshot) => {
      studentList.push(onSnapshot.data());
      setstudlist({ list: studentList });
    });
  };
  useEffect(() => {
    fetchList();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTheme());
    dispatch(getID());
  }, [dispatch]);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  function setUID(uid) {
    dispatch(setID(uid));
  }

  return (
    <Mui.Box>
      <Mui.Box sx={style.sortContainer}>
        <Mui.Box component="label" sx={style.sort}>
          Sort By :
          <Mui.Box>
            <FormControl sx={style.formControl} size="small">
              <Select
                onChange={(e) => setSortType(e.target.value)}
                sx={style.dropDown}
              >
                <MenuItem value="Most Recent">Most Recent</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="Ys">Year & Section</MenuItem>
                <MenuItem value="review">Reviews</MenuItem>
              </Select>
            </FormControl>
          </Mui.Box>
        </Mui.Box>
        <Mui.Typography sx={style.filter}>
          Filter :
          <Mui.Box>
            <FormControl sx={style.formControl} size="small">
              <Select
                value={filter}
                onChange={handleFilter}
                sx={style.dropDown}
              >
                <MenuItem value="No Filter">No Filter</MenuItem>
                <MenuItem value="Name">Name</MenuItem>
                <MenuItem value="Ys">Year & Section</MenuItem>
                <MenuItem value="Reviews">Reviews</MenuItem>
              </Select>
            </FormControl>
          </Mui.Box>
        </Mui.Typography>
      </Mui.Box>

      <Mui.Container>
        <Mui.Box sx={style.details}>
          <Mui.Box>
            <Mui.Typography sx={style.styledFont}>
              Year & Section
            </Mui.Typography>
          </Mui.Box>
          <Mui.Box sx={style.stdLabel}>
            <Mui.Typography sx={style.styledFont}>Reviews</Mui.Typography>
          </Mui.Box>
          <Mui.Box sx={style.stdLabel}>
            <Mui.Typography sx={style.styledFont}>Ratings</Mui.Typography>
          </Mui.Box>
        </Mui.Box>

        <Mui.Box sx={style.studListContainer}>
          {studlist &&
            studlist.list.map((studlist) => {
              return (
                <Mui.Paper sx={style.studListPaper} key={studlist.id}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    onClick={() => setUID(studlist.id)}
                    to={{
                      pathname: "/evaluation",
                      state: { uid: studlist.id },
                    }}
                  >
                    <Mui.Box sx={style.imgFname}>
                      <Mui.Box>
                        <Mui.Box
                          component="img"
                          src={studlist.profileImg}
                          variant="square"
                          alt="Profile Image"
                          sx={style.studImg}
                        />
                      </Mui.Box>
                      <Mui.Box>
                        <Mui.Typography sx={style.studameFont}>
                          {studlist.fullname}
                        </Mui.Typography>
                      </Mui.Box>
                    </Mui.Box>
                    <Mui.Box sx={style.studsubDetailsCourse}>
                      <Mui.Typography sx={style.studDetailsFont}>
                        {studlist.course}
                      </Mui.Typography>
                      <Mui.Typography sx={style.studDetailsFontReview}>
                        {studlist.reviews}
                      </Mui.Typography>
                      <Mui.Box sx = {style.starContainer}>

                  <Rating
                        name="text-feedback"
                        value={studlist.ovrall_rating}
                        readOnly
                        precision={0.5}
                        icon={<StarRoundedIcon sx={style.filledStars} />}
                        emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                        sx={style.Rating}
                      />
                  </Mui.Box>
                    </Mui.Box>
                  </Link>
                </Mui.Paper>
              );
            })}
        </Mui.Box>
      </Mui.Container>
    </Mui.Box>
  );
}
