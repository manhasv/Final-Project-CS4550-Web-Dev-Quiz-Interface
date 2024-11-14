// MultipleChoiceQuestionEditor.tsx
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

type MultipleChoiceQuestionProps = {
  show: boolean;
  onHide: () => void;
  onSave: (question: {
    title: string;
    text: string;
    choices: string[];
    answer: string;
    point: number;
  }) => void;
};

const MultipleChoiceQuestionEditor: React.FC<MultipleChoiceQuestionProps> = ({ show, onHide, onSave }) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState<string[]>([""]);
  const [correctChoice, setCorrectChoice] = useState<number | null>(null);
  const [questionPoint, setQuestionPoint] = useState(10);

  const handleAddChoice = () => setChoices([...choices, ""]);

  const handleRemoveChoice = (index: number) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
    if (correctChoice === index) setCorrectChoice(null);
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const handleSave = () => {
    if (correctChoice === null) return; // Ensure a correct choice is selected
    const question = {
      title: questionTitle,
      text: questionText,
      choices: choices,
      answer: choices[correctChoice],
      point: questionPoint,
    };
    onSave(question);
    resetForm();
  };

  const resetForm = () => {
    setQuestionTitle("");
    setQuestionText("");
    setChoices([""]);
    setCorrectChoice(null);
    setQuestionPoint(10);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Configure Multiple Choice Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Title:</label>
        <input
          type="text"
          className="form-control mb-3"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
        />

        <label>Points:</label>
        <input
          type="number"
          className="form-control mb-3"
          value={questionPoint}
          onChange={(e) => setQuestionPoint(Number(e.target.value))}
        />

        <label>Question:</label>
        <textarea
          className="form-control mb-3"
          rows={4}
          placeholder="Enter question text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        <label>Choices:</label>
        {choices.map((choice, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="radio"
              checked={correctChoice === index}
              onChange={() => setCorrectChoice(index)}
              className="me-2"
            />
            <input
              type="text"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              className="form-control me-2"
              placeholder={`Choice ${index + 1}`}
            />
            <Button variant="danger" onClick={() => handleRemoveChoice(index)} disabled={choices.length <= 1}>
              Remove
            </Button>
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddChoice}>
          Add Choice
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Question
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MultipleChoiceQuestionEditor;
