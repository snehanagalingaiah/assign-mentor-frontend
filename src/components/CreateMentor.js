import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  TextField,
  Button
} from "@mui/material";
import {BACKEND_URL} from "../staticData";

export default function CreateMentor() {

  const [mentor, setMentor] = useState({
    mentorName: "",
    contactNumber: ""
  });
 
  const setVal= (e) => {
        console.log("setval hit")
        const {name,value} = e.target;
        setMentor({...mentor,[name]:value});
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered handlesubmit", mentor);
    if(mentor.mentorName === '')
      alert("Enter mentor name")
    else{
     try {
       var response = await axios.post(
         `${BACKEND_URL}/mentors/creatementor`,
         {
           mentor: {
             mentorName: mentor.mentorName,
             contactNumber: mentor.contactNumber,
           }
         }
       );
       if (response.data) {
         console.log("mentor added", response.data);
         alert(`Success! Mentor ${response.data.mentorName} Added`)
          setMentor({
            mentorName: "",
            contactNumber: ""
          })
       }
     } 
     catch (err) 
     {
       console.log(err.response);
       alert(err.response.data.message);
     }
   }
  };

  return (
    <div style={{ margin: "5%" }}>
      <Typography variant="h4" component="div">
        {" "}
        Enter Mentor Details{" "}
      </Typography>{" "}
      <br /> <br />
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            type="text"
            name="mentorName"
            label="Name"
            sx={{ width: "25%" }}
            value={mentor.mentorName}
            onChange={setVal}
          />
        </div>{" "}
        <br />
      
        <div>
          <TextField
            label="Contact"
            name="contactNumber"
            sx={{ width: "25%" }}
            value={mentor.contactNumber}
            onChange={setVal}
          />
        </div>{" "}
        <br />
        <Button variant="contained" type="submit">
          {" "}
          Submit{" "}
        </Button>
      </form>
    </div>
  );
}
