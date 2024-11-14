import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Question type
type Question = {
  type: string;
  text: string;
  options: string[];
  points: number;
};

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const [questions, setQuestions] = useState<Question[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [points, setPoints] = useState(0);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      type: "Multiple Choice",
      text: "",
      options: [],
      points: 1,
    };
    setQuestions([...questions, newQuestion]);
    setEditIndex(questions.length);
  };

  const handleEditQuestion = (index: number) => {
    setEditIndex(index);
  };

  const handleSaveQuestion = (index: number, updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q, i) => (i === index ? updatedQuestion : q));
    setQuestions(updatedQuestions);
    setEditIndex(null);
    calculateTotalPoints(updatedQuestions);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    calculateTotalPoints(updatedQuestions);
  };

  const calculateTotalPoints = (questions: Question[]) => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    setPoints(totalPoints);
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  return (
    <div className="container mt-4">
      {/* Tabs */}
      <div className="d-flex mb-4">
        <div
          className="tab"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`)}
          style={{ cursor: "pointer", padding: "10px", fontWeight: "normal" }}
        >
          Details
        </div>
        <div
          className="tab"
          style={{
            cursor: "pointer",
            padding: "10px",
            fontWeight: "bold",
            borderBottom: "2px solid black"
          }}
        >
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
          questions.map((question, index) => (
            <div key={index} className="question-item">
              {editIndex === index ? (
                <div className="edit-mode">
                  <label>Question Type:</label>
                  <select
                    value={question.type}
                    onChange={(e) =>
                      handleQuestionChange(index, "type", e.target.value)
                    }
                  >
                    <option value="True/False">True/False</option>
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="Fill in the Blank">Fill in the Blank</option>
                  </select>

                  <label>Question Text:</label>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionChange(index, "text", e.target.value)
                    }
                  />

                  <label>Points:</label>
                  <input
                    type="number"
                    value={question.points}
                    onChange={(e) =>
                      handleQuestionChange(index, "points", Number(e.target.value))
                    }
                  />

                  <button onClick={() => handleSaveQuestion(index, question)}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div className="preview-mode">
                  <p>
                    <strong>{question.type}</strong>: {question.text} - {question.points} Points
                  </p>
                  <button onClick={() => handleEditQuestion(index)}>Edit</button>
                  <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button onClick={handleAddQuestion} className="btn btn-primary">
          New Question
        </button>
      </div>

      <hr className="my-4" />

      <div className="d-flex justify-content-center mt-2">
        <button onClick={() => {navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);}}
          className="btn btn-danger">
          Save
        </button>
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`} className="btn btn-secondary me-3">
          Cancel
        </Link>
      </div>
    </div>
  );
}
