import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Typography,TextField,Button,InputLabel,MenuItem,Select,FormControl,Box} from "@mui/material";
import {BACKEND_URL} from "../staticData";

export default function DisplayStudents(){
  let [mentorList, setMentorList] = useState([]);
  let [studentList, setStudentList] = useState([]);
  let [selectedMentor, setSelectedMentor] = useState("");
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function fetchData() {
      var response = await axios.get(`${BACKEND_URL}/mentors/getmentors`);
      setMentorList([...response.data]); 
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("mentors", mentorList);
  }, [mentorList]);

  useEffect(() => {
    console.log("selected mentor", selectedMentor);
  }, [selectedMentor]);

   const setVal= (e) => {
        console.log("setval hit")
        setSelectedMentor(e.target.value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Entered handlesubmit");

    if(selectedMentor === '')
      alert("Select a Mentor")

    else {
     try {
            var response = await axios.get(`${BACKEND_URL}/mentorstudent/getstudents/${selectedMentor}`);
            if (response.status==200 && response.data.length>0) 
            {
               console.log("Students fetched from mentorStudent table", response.data);
               let studentIds = []
               response.data.map(obj =>{
                 delete obj._id;
                 delete obj.mentorId;
                 studentIds.push(obj.studentId);
               })
               console.log("student ids",studentIds)
               response = await axios.post(`${BACKEND_URL}/students/getstudentsbyid`,{studentIds:[...studentIds]})
               setStudentList([...response.data])
               setMessage(false)
            }
            else
            {
               console.log("No students assigned")
               setMessage(true)
            }
        } 
      catch (err) 
      {
       console.log(err);
       alert(err.response.data.message);
      }
    }
  };


  return (
    <>
    <br/>
       <Box sx={{padding: 1, textAlign: 'center', }}>
          <FormControl sx={{ width: "25%" }}>
            <InputLabel id="Mentor" sx={{ width: "25%" }}>
              Mentor
            </InputLabel>
            <Select
              label="Select Mentor"
              name="Mentor"
              value={selectedMentor}
              labelId="Mentor"
              id="Mentor"
              onChange={setVal}
              MenuProps={{
                   PaperProps: { sx: { maxHeight: 150 }}
                 }}
            >
            {  
              mentorList.map(mentor =>(<MenuItem value={mentor._id}>{mentor.mentorName}</MenuItem>))   
            }
            </Select>
          </FormControl>
       </Box>
       <br/>
       <Box sx={{padding: 1, textAlign: 'center', }}>
       <Button variant="contained" type="submit" onClick ={handleSubmit}>
          {" "}
          Submit{" "}
        </Button>
        </Box>
        
        {message? "No students assigned to the mentor" : 
        <ul>
        {
          studentList.map(student => (
               <li key={student._id}>{student.studentName}</li>
            ))
        }
        </ul> 
        }
    </>
    
  );
}