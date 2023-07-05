import { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import {BACKEND_URL} from "../staticData";

export default function CreateStudent() {

  const [student, setStudent] = useState({
    studentName: "",
    age: "",
    contactNumber: "",
    city: ""
  });

  const allAges = [21,22,23,24,25,26,27,28,29,30,31,32];


   const setVal= (e) => {
        console.log("setval hit")
        const {name,value} = e.target;
        setStudent({...student,[name]:value});
    }

  useEffect(() =>{
    console.log(student)
  },[student])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered handlesubmit", student);

    if(student.studentName === '')
      alert("Enter student name")

    else {
     try {
            var response = await axios.post(
              `${BACKEND_URL}/students/createstudent`,
              {
                student: {
                  studentName: student.studentName,
                  age: student.age,
                  contactNumber: student.contactNumber,
                  city: student.city
                 }
              }
            );
            if (response.status==200) {
            console.log("Student added", response.data);
            alert(`Success! Student ${response.data.studentName} Added`)
            setStudent({
                        studentName: "",
                        age: "",
                        contactNumber: "",
                        city: ""
                      })
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
    <div style={{ margin: "5%" }}>
      <Typography variant="h4" component="div">
        {" "}
        Enter Student Details{" "}
      </Typography>{" "}
      <br /> <br />
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            type="text"
            name="studentName"
            label="Name"
            sx={{ width: "25%" }}
            value={student.studentName}
            onChange={setVal}
          />
        </div>{" "}
        <br />
        <div>
          <FormControl sx={{ width: "25%" }}>
            <InputLabel id="Age" sx={{ width: "25%" }}>
              Age
            </InputLabel>
            <Select
              label="Age"
              name="age"
              value={student.age}
              labelId="Age"
              id="Age"
              onChange={setVal}
              MenuProps={{
                   PaperProps: { sx: { maxHeight: 150 }}
                 }}
            >
            {  
              allAges.map(age =>(<MenuItem key= {age} value={age}>{age}</MenuItem>))   
            }
            </Select>
          </FormControl>
        </div>{" "}
        <br />
        <div>
          <TextField
            label="Contact"
            name="contactNumber"
            sx={{ width: "25%" }}
            value={student.contactNumber}
            onChange={setVal}
          />
        </div>{" "}
        <br />
        <div>
          <FormControl sx={{ width: "25%" }}>
            <InputLabel id="City" sx={{ width: "25%" }}>
              City
            </InputLabel>
            <Select
              label="City"
              name="city"
              value={student.city}
              labelId="City"
              id="City"
              onChange={setVal}
            >
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Bengaluru">Bengaluru</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
            </Select>
          </FormControl>
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
