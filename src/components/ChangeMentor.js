import * as React from "react";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import {BACKEND_URL} from "../staticData";


export default function AssignMentor(){
  let [mentorList, setMentorList] = useState([]);
  let [studentList, setStudentList] = useState([]);
  let [selectedMentor, setSelectedMentor] = useState("");
  let [selectedStudent, setSelectedStudent] = useState([]);

   useEffect(() => {
    async function fetchData() {

      var response = await axios.get(`${BACKEND_URL}/mentors/getmentors`);
      setMentorList([...response.data]);

      response = await axios.get(`${BACKEND_URL}/students/getstudents`);
      setStudentList([...response.data]);
      
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("mentors", mentorList);
  }, [mentorList]);

  useEffect(() => {
    console.log("studentlist", studentList);
  }, [studentList]);

  useEffect(() => {
    console.log("selectedStudent", selectedStudent);
  }, [selectedStudent]);

  useEffect(() => {
    console.log("selected mentor", selectedMentor);
  }, [selectedMentor]);

  function radioChangeMentor(e) {
    setSelectedMentor(e.target.value);
  }

   function radioChangeStudent(e) {
    setSelectedStudent(e.target.value);
  }

    async function onSubmit(e) {
    let mentor_student_obj = {};
    console.log("submit function", selectedStudent, selectedMentor);
    if (selectedMentor=='' )
      alert("Please select a mentor")
    else if(selectedStudent=='')
      alert("Please select a student");
    else{
      mentor_student_obj = 
      {
        mentorId: selectedMentor,
        studentId: selectedStudent,
        isExist: true
      };

    try
     {
      var response = await axios.post(
        `${BACKEND_URL}/mentorstudent/changementor`,
        {
          mentor_student_obj
        }
       );
       if (response.status===200) {
        console.log("response data", response.data);
        alert("Student added to the mentor")
        setSelectedMentor('');
        setSelectedStudent('');
        }
      } 
      catch (err) 
      {
        console.log(err);
        alert(err.message.data)
      }}
  }

  return (
    <>
           <Grid container spacing={3} style={{ margin: '3% 20%' }} alignItems="stretch">
                    <Grid item xs={4} style={{display: 'flex'}}>
                        <Box sx={{ backgroundColor: 'lightblue', 
                            padding: 1, textAlign: 'center', }}>
                            <FormControl>
                              <FormLabel id="mentor">Choose a Mentor</FormLabel>
                              <RadioGroup
                                aria-labelledby="mentor"
                                name="mentor-buttons-group"
                                value={selectedMentor}
                                onChange={radioChangeMentor}
                              >
                                {mentorList !== null
                                  ? mentorList.map((mentor) => (
                                      <FormControlLabel
                                        key={mentor._id}
                                        value={mentor._id}
                                        control={<Radio />}
                                        label={mentor.mentorName}
                                      />
                                    ))
                                  : ""}
                              </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={5} style={{display: 'flex'}}>
                        <Box sx={{ backgroundColor: 'lightblue', 
                            padding: 1, textAlign: 'center', }}>
                            <FormControl>
                              <FormLabel id="student">Choose a Student</FormLabel>
                              <RadioGroup
                                aria-labelledby="student"
                                name="student-buttons-group"
                                value={selectedStudent}
                                onChange={radioChangeStudent}
                              >
                                {studentList !== null
                                  ? studentList.map((student) => (
                                      <FormControlLabel
                                        key={student._id}
                                        value={student._id}
                                        control={<Radio />}
                                        label={student.studentName}
                                      />
                                    ))
                                  : ""}
                              </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>                    
                </Grid>

           <Box sx={{padding: 1, textAlign: 'center', }}>
           <Button variant="contained" type="button" onClick={onSubmit}>
            {" "}
            Submit{" "}
          </Button>
          </Box>
     </>
    
  );
}