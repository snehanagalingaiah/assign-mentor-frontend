import './App.css'
import Appbar from  "./components/Appbar"
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import  CreateStudent from './components/CreateStudent';
import  CreateMentor from './components/CreateMentor'
import  AssignMentor  from "./components/AssignMentor";
import  ChangeMentor  from "./components/ChangeMentor";
import  DisplayStudents  from "./components/DisplayStudents";
import  PreviousMentors  from "./components/PreviousMentors";

function App() {
  return (
   <>
    <Appbar />

      <Routes>
        <Route path="/createstudent" element={<CreateStudent />} />
        <Route path="/createMentor" element={<CreateMentor />} />
        <Route path="/assignmentor" element={<AssignMentor />} />
        <Route path="/changementor" element={<ChangeMentor />} />
        <Route path="/displaystudents" element={<DisplayStudents />} />
        <Route path="/previousmentors" element={<PreviousMentors />} />
      </Routes>

   </>
  );
}

export default App;
