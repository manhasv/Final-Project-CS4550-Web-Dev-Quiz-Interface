import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { updateQuiz } from "../reducer";
import Question from "../Questions/Question";
// Define types for each QuizQuestion type
type TrueFalseQuestion = {
  _id: number;
  type: "TRUEFALSE";
  content: {
    text: string;
    answer: boolean;
    point: number;
  };
};

type MultipleChoiceQuestion = {
  _id: number;
  type: "MULTIPLECHOICE";
  content: {
    text: string;
    choices: string[];
    answer: string;
    point: number;
  };
};

type FillInTheBlankQuestion = {
  _id: number;
  type: "FILLINTHEBLANK";
  content: {
    text: string;
    blanks: string[];
    answer: string[];
    point: number;
  };
};

type QuizQuestion = TrueFalseQuestion | MultipleChoiceQuestion | FillInTheBlankQuestion;


export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  // Use local state to manage temporary QuizQuestion changes
  const [questions, setQuestions] = useState<QuizQuestion[]>(quiz?.questions || []);
  const [points, setPoints] = useState(quiz?.points || 0);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Temporary states for QuizQuestion creation/editing
  const [questionText, setQuestionText] = useState("");
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(true);
  const [multipleChoiceChoices, setMultipleChoiceChoices] = useState<string[]>([""]);
  const [multipleChoiceAnswer, setMultipleChoiceAnswer] = useState("");
  const [fillInTheBlankBlanks, setFillInTheBlankBlanks] = useState<string[]>([""]);
  const [fillInTheBlankAnswers, setFillInTheBlankAnswers] = useState<string[]>([""]);
  const [questionPoint, setQuestionPoint] = useState(10);

  // Handle points calculation whenever questions state changes
  useEffect(() => {
    const totalPoints = questions.reduce((sum, q) => sum + q.content.point, 0);
    setPoints(totalPoints);
  }, [questions]);
  
  const handleAddQuestion = () => {
    setShowTypeModal(true);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setShowTypeModal(false);
    setShowConfigModal(true); 
  };

  const addNewQuestion = () => {
    let newQuestion: QuizQuestion;

    // Define new QuizQuestion structure based on selected type
    if (selectedType === "TRUEFALSE") {
      newQuestion = {
        _id: questions.length + 1,
        type: "TRUEFALSE",
        content: {
          text: questionText,
          answer: trueFalseAnswer,
          point: questionPoint,
        },
      };
    } else if (selectedType === "MULTIPLECHOICE") {
      newQuestion = {
        _id: questions.length + 1,
        type: "MULTIPLECHOICE",
        content: {
          text: questionText,
          choices: multipleChoiceChoices,
          answer: multipleChoiceAnswer,
          point: questionPoint,
        },
      };
    } else {
      newQuestion = {
        _id: questions.length + 1,
        type: "FILLINTHEBLANK",
        content: {
          text: questionText,
          blanks: fillInTheBlankBlanks,
          answer: fillInTheBlankAnswers,
          point: questionPoint,
        },
      };
    }

    setQuestions([...questions, newQuestion]);
    setShowConfigModal(false); 
  };

  const saveQuizQuestions = () => {
    // Final save: update Redux with current questions and points state
    dispatch(updateQuiz({ ...quiz, questions, points }));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  const handleCancel = () => {
    // Reset questions to original Redux state if canceled
    setQuestions(quiz?.questions || []);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  return (
    <div className="container mt-4">
      {/* Tabs */}
      <div className="d-flex mb-4">
        <div className="tab" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`)}
             style={{ cursor: "pointer", padding: "10px", fontWeight: "normal" }}>
          Details
        </div>
        <div className="tab" style={{
             cursor: "pointer", padding: "10px", fontWeight: "bold", borderBottom: "2px solid black" }}>
          Questions
        </div>
      </div>

      <hr />

      <h4>Total Points: {points}</h4>

      {/* Questions List */}
      <div>
        {questions.length === 0 ? (
          <p>No questions added yet. Click "New Question" to add one.</p>
        ) : (
          <div>
          {questions.map((q: any, n: number) => {
            return (
              <div>
                {" "}
                <Question question={q} questionNumber={n + 1} point={q.content.point} />
                <br />
                <br />
              </div>
            );
          })}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button onClick={handleAddQuestion} className="btn btn-primary">
          New Question
        </button>
      </div>

      <hr className="my-4" />

      <div className="d-flex justify-content-center mt-2">
        <button onClick={saveQuizQuestions} className="btn btn-danger">
          Save
        </button>
        <button onClick={handleCancel} className="btn btn-secondary me-3">
          Cancel
        </button>
      </div>

      {/* Modal for QuizQuestion Type Selection */}
      <Modal show={showTypeModal} onHide={() => setShowTypeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Question Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Choose a Question type:</p>
          <select className="form-control" onChange={(e) => setSelectedType(e.target.value)} defaultValue="">
            <option value="" disabled>Select type</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True/False">True/False</option>
            <option value="Fill in the Blank">Fill in the Blank</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTypeModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleTypeSelect(selectedType!)}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Configuration Modal Based on Selected Type */}
      <Modal show={showConfigModal} onHide={() => setShowConfigModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Configure {selectedType} Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Content for each QuizQuestion type */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfigModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addNewQuestion}>
            Save Question
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}