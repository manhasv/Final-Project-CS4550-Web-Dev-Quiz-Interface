import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Route, Routes, useParams, useLocation  } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Quizz from "./Quizz";
import QuizDetails from "./Quizz/QuizDetail";
import QuizEditor from "./Quizz/QuizDetailEditor";
export default function Courses() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name}  &gt; {pathname.split("/")[4]}
      </h2> <hr />
    <div className="d-flex">
      <div className="d-none d-md-block">
        <CoursesNavigation />
      </div>
      <div className="flex-fill">
      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="Modules" element={<Modules />} />
        <Route path="Assignments" element={<Assignments />} />
        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
        <Route path="Quizzes" element={<Quizz />} />
        <Route path="Quizzes/:qid" element={<QuizDetails />} />
        <Route path="Quizzes/:qid/Edit" element={<QuizEditor />} />
        <Route path="Quizzes/New" element={<QuizEditor />} />
        <Route path="People" element={<PeopleTable />} />
      </Routes>
      </div>
    </div>
  </div>
);}
