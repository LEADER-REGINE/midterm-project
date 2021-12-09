import React from "react";
import { Box, Grid, Typography, Divider, Button, Stack } from "@mui/material";

import { ReactComponent as Vector1 } from "../assets/svg/vector1.svg";
import { ReactComponent as Vector2 } from "../assets/svg/vector2.svg";
import { ReactComponent as Vector3 } from "../assets/svg/vector3.svg";


import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const style = {
  root: {
    background: "#131414",
  },

  colContainer: {
    display: "flex",
    justifyContent: "center",
    // alignItems:"center"
  },

  info: {
    fontWeight: "light",
    padding: 0.5,
    fontSize: {
      xs: ".75rem",
      sm: "1rem",
      md: "1.25rem",
    },
    letterSpacing: "0.0625rem",
    color: "#62666D",
  },
  infoColor: {
    fontWeight: "light",
    padding: 0.5,
    fontSize: {
      xs: ".75rem",
      sm: "1rem",
      md: "1.25rem",
    },
    letterSpacing: "0.0625rem",
    color: "#26CE8D",
  },

  vectorStyle: {
    color: (theme) => theme.palette.secondary.main,

    marginLeft: "1rem",
    padding: 1,
  },
  footerStyle: {
    padding: 0,

    display: "flex",
  },
  helpButton: {


    height: {
      xs: "1.75rem",
      sm: "2rem",
      md: "2.25rem",
    },
    width: {
      xs: "4.5rem",
      sm: "4.75rem",
      md: "5.188rem",
    },
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "14px",
    },

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 14px",
    position: "fixed",
    borderRadius: "3.125rem",
    backgroundColor: "#26CE8D",
    color: "white",
    textTransform: "none",

    bottom: "2rem",
    right: "4rem",



  },
  topMargin: {
    marginTop: "25rem"
  }
};

export default function Footer() {
  return (
    <Box sx={style.root}>
      <Box sx={style.footerStyle}>
        <Grid container>

          <Grid item xs={12}>
            <Box sx={style.topMargin}>
            </Box>

            <Box sx={style.info}>


              <Box sm item sx={style.colContainer}>

                <a href="https://www.twitter.com">
                  {" "}
                  <Typography sx={style.vectorStyle}>
                    {" "}
                    <Vector1 />
                  </Typography>
                </a>
                <a href="https://www.discord.com">
                  {" "}
                  <Typography sx={style.vectorStyle}>
                    {" "}
                    <Vector2 />
                  </Typography>
                </a>
                <a href="https://www.facebook.com">
                  {" "}
                  <Typography sx={style.vectorStyle}>
                    {" "}
                    <Vector3 />
                  </Typography>
                </a>
              </Box>

              <Box sx={style.colContainer}>
                <Typography sx={style.info} color="textPrimary">
                  Contact us:{" "}
                </Typography>
                <Typography sx={style.infoColor} color="textPrimary">
                  support @studentreview.com
                </Typography>
              </Box>
              <Box sx={style.colContainer}>
                <Typography sx={style.info} color="textPrimary">
                  © 2021 Student Review. All Rights Reserved.
                </Typography>

              </Box>

              <Box sx={style.colContainer}>
                <Typography sx={style.infoColor} color="textPrimary">
                  Terms of Service
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography sx={style.infoColor} color="textPrimary">
                  Privacy Policy
                </Typography>
              </Box>
              <Box>
                <Button sx={style.helpButton} variant="outlined" startIcon={<HelpOutlineIcon />}>
                  Help
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
