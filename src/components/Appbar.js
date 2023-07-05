import * as React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import {AppBar} from "@mui/material";
import {Box} from "@mui/material";
import {Toolbar} from "@mui/material";
import {Button} from "@mui/material";

const Appbar = () =>{

 const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/createstudent")}>
            Create Student
          </Button>
          <Button color="inherit" onClick={() => navigate("/creatementor")}>
            Create Mentor
          </Button>
          <Button color="inherit" onClick={() => navigate("/assignmentor")}>
            Assign Mentor
          </Button>
          <Button color="inherit" onClick={() => navigate("/changementor")}>
            Change Mentor
          </Button>
           <Button color="inherit" onClick={() => navigate("/displaystudents")}>
            Display Students
          </Button>
           <Button color="inherit" onClick={() => navigate("/previousmentors")}>
            Previous mentors
          </Button>
        </Toolbar>
      </AppBar>
     </Box>
  );
}

export default Appbar;