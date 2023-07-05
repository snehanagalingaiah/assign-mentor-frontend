import * as React from "react";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import {BACKEND_URL} from "../staticData";


export default function AssignMentor(){
  let [mentorList, setMentorList] = useState([]);
  let [studentList, setStudentList] = useState([]);
  let [mentorStudent, setMentorStudent] = useState([]);
  let [selectedMentor, setSelectedMentor] = useState("");
  let [selectedStudents, setSelectedStudents] = useState([]);
  let [changed, setChanged] = useState(false);
  let mentorStudentCopy = useRef([]);
  let studentListCopy =useRef([]);

  useEffect(() => {
    async function fetchData() {
       let tempArray =[];
     
     console.log("Changed")

      var response = await axios.get(`${BACKEND_URL}/mentors/getmentors`);
      setMentorList([...response.data]);

      response = await axios.get(`${BACKEND_URL}/mentorstudent/get`);
      response.data.forEach(data =>{
       tempArray.push(data.studentId)
      })
      setMentorStudent([...tempArray]);
       mentorStudentCopy.current = [...tempArray];

      response = await axios.get(`${BACKEND_URL}/students/getstudents`);
      //setStudentList([...response.data]);
       studentListCopy.current = [...response.data]
      // setStudentList([...response.data]);
      
      tempArray = studentListCopy.current.filter((student) => {
        return !mentorStudentCopy.current.includes(student._id);
      })
      setStudentList([...tempArray])

    }
    fetchData();
  }, [changed]);

  useEffect(() => {
    console.log("mentors", mentorList);
  }, [mentorList]);

  useEffect(() => {
    console.log("studentlist", studentList);
  }, [studentList]);

  useEffect(() => {
    console.log("mentors and students", mentorStudent);
  }, [mentorStudent]);

  useEffect(() => {
    console.log("selectedStudents", selectedStudents);
  }, [selectedStudents]);

  useEffect(() => {
    console.log("selected mentor", selectedMentor);
  }, [selectedMentor]);

  function radioChange(e) {
    setSelectedMentor(e.target.value);
  }

  function checkboxChange(e, index, studentId) {
    console.log("student id selected", studentId);
    let checkboxContains = selectedStudents.filter(
      (student) => student === studentId
    );
    if (checkboxContains.length > 0) {
      setSelectedStudents(
        selectedStudents.filter((student) => student !== studentId)
      );
    } else {
      let tempSelectedStudents = [...selectedStudents];
      tempSelectedStudents.push(studentId);
      setSelectedStudents(tempSelectedStudents);
    }
  }

  async function onSubmit(e) {
    let mentor_student_obj = {};
    let mentor_student = [];

    console.log("submit function", selectedStudents);
    selectedStudents.forEach((student) => {
      mentor_student_obj = {
        mentorId: selectedMentor,
        studentId: student,
        isExist: true
      };

      mentor_student.push(mentor_student_obj);
    });

    try
     {
      var response = await axios.post(
        `${BACKEND_URL}/mentorstudent/assignmentor`,
        {
          mentor_student
        }
       );
       if (response.status===200) {
        console.log("response data", response.data);
        setSelectedStudents([]);
        setSelectedMentor('')
        setChanged(!changed);
        alert("Students added to the mentor")
        }
      } 
      catch (err) 
      {
        console.log(err);
        alert(err.message.data)
      }
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
                                onChange={radioChange}
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
                              <FormLabel id="student">Choose Students</FormLabel>
                              <FormGroup>
                                {studentList !== null
                                  ? studentList.map((student, id) => (
                                      <FormControlLabel
                                        key={student._id}
                                        value={student._id}
                                        control={<Checkbox />}
                                        label={student.studentName}
                                        onChange={(e) => checkboxChange(e, id, student._id)}
                                      />
                                    ))
                                  : ""}
                              </FormGroup>
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