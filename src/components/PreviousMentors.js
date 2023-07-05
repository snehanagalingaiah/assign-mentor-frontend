import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Typography,TextField,Button,InputLabel,MenuItem,Select,FormControl,Box} from "@mui/material";
import {BACKEND_URL} from "../staticData";

export default function DisplayStudents(){
  let [mentorList, setMentorList] = useState([]);
  let [studentList, setStudentList] = useState([]);
  let [selectedStudent, setSelectedStudent] = useState("");
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BACKEND_URL}/students/getstudents`);
      setStudentList([...response.data]); 
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("mentors", mentorList);
  }, [mentorList]);

  useEffect(() => {
    console.log("selected student", selectedStudent);
  }, [selectedStudent]);

   const setVal= (e) => {
        console.log("setval hit")
       
        setSelectedStudent(e.target.value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Entered handlesubmit");
      setMentorList([])

    if(selectedStudent === '')
      alert("Select a Student")

    else {
     try {
            var response = await axios.get(`${BACKEND_URL}/mentorstudent/getmentors/${selectedStudent}`);
            if (response.status==200 && response.data.length>1) 
            {
               console.log("Mentors fetched from mentorStudent table", response.data);
               let mentorIds = []
               response.data.map(obj =>{
                if(obj.isExist == false)
                 mentorIds.push(obj.mentorId);
               })
               console.log("mentor ids",mentorIds)
               response = await axios.post(`${BACKEND_URL}/mentors/getmentorsbyid`,{mentorIds:[...mentorIds]})
               console.log("mentor details", response.data)
               setMentorList([...response.data])
               setMessage(false)
            }
            else
            {
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
              Student
            </InputLabel>
            <Select
              label="Select student"
              name="Student"
              value={selectedStudent}
              labelId="Student"
              id="Student"
              onChange={setVal}
              MenuProps={{
                   PaperProps: { sx: { maxHeight: 150 }}
                 }}
            >
            {  
              studentList.map(student =>(<MenuItem value={student._id}>{student.studentName}</MenuItem>))   
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
        { message ? "No previous Mentors" :
        <ul>
        {
          mentorList.map(mentor => (
               <li>{mentor.mentorName}</li>
            ))
        }
        </ul> 
        }
    </>
    
  );
}