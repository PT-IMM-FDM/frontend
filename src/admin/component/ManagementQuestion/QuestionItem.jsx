import React, { useState, useEffect } from "react";
import { deleteQuestion, updateQuestion } from "../../api/question-fdm";
import useAuthStore from "../../stores/useAuthStore";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { Button } from "flowbite-react";

const QuestionItem = ({ question, onEdit, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalQuestion, setOriginalQuestion] = useState(question);
  const [questionText, setQuestionText] = useState(question.question || "");
  const [answers, setAnswers] = useState(question.question_answer || []);
  const [additionalAnswers, setAdditionalAnswers] = useState([]);
  const [deleteAnswers, setDeleteAnswers] = useState([]);
  const [newAnswers, setNewAnswers] = useState([]); // To track answers added during edit
  const { token } = useAuthStore((state) => ({ token: state.token }));

  useEffect(() => {
    // Initialize form state when question prop changes
    setOriginalQuestion(question);
    setQuestionText(question.question || "");
    setAnswers(question.question_answer || []);
    setAdditionalAnswers([]);
    setDeleteAnswers([]);
    setNewAnswers([]);
  }, [question]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleAnswerChange = (index, newAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].question_answer = newAnswer;
    setAnswers(updatedAnswers);
  };

  const handleDropdownChange = (index, event) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].value = parseInt(event.target.value, 10);
    setAnswers(updatedAnswers);
  };

  const handleAddAnswer = () => {
    if (answers.length + newAnswers.length < 5) {
      const newAnswer = { question_answer: "", value: "" };
      setNewAnswers([...newAnswers, newAnswer]);
    }
  };

  const handleRemoveAnswer = (index) => {
    if (index < answers.length) {
      setDeleteAnswers([...deleteAnswers, answers[index].question_answer_id]);
      setAnswers(answers.filter((_, i) => i !== index));
    } else {
      setNewAnswers(newAnswers.filter((_, i) => i !== index - answers.length));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Prepare payload for API call
    const updatedQuestion = {
      question_id: question.question_id,
      question: questionText,
      question_answer_id: answers
        .map((ans) => ans.question_answer_id)
        .filter(Boolean),
      question_answer: answers.map((ans) => ans.question_answer),
      value: answers.map((ans) => ans.value),
      add_question_answer: newAnswers.map((ans) => ans.question_answer),
      add_value: newAnswers.map((ans) => ans.value || 1), // Example value, adjust as necessary
      delete_question_answer: deleteAnswers,
    };

    try {
      const updatedData = await updateQuestion(token, updatedQuestion);
      console.log(updatedData);
      onEdit(updatedData);
      onSave()
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  const handleCancel = () => {
    setQuestionText(originalQuestion.question);
    setAnswers(originalQuestion.question_answer);
    setAdditionalAnswers([]);
    setDeleteAnswers([]);
    setNewAnswers([]);
    setIsEditing(false);
  };

  return (
    <div className="border p-4 mb-4 bg-white shadow-md rounded-lg">
      {isEditing ? (
        <form
          onSubmit={handleSave}
          className="flex flex-col mx-auto text-[10px]"
        >
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-xs">Question</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-500 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs"
              >
                Save
              </button>
            </div>
          </div>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="border border-gray-300 p-2 rounded-md text-[11px] leading-4"
            placeholder="Enter your question"
          />
          <label className="font-bold text-xs mt-2">Answers</label>
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                value={answer.question_answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="border border-gray-300 p-2 rounded-md flex-grow text-[11px] leading-4"
                placeholder="Enter an answer"
              />
              <select
                value={answer.value || ""}
                onChange={(e) => handleDropdownChange(index, e)}
                className="border border-gray-300 p-2 rounded-md text-xs"
              >
                <option value="1">Fit</option>
                <option value="2">Fit Follow Up</option>
                <option value="3">Unfit</option>
              </select>
              <button
                type="button"
                onClick={() => handleRemoveAnswer(index)}
                className="text-red-500 text-lg"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          {newAnswers.map((answer, index) => (
            <div
              key={`new-${index}`}
              className="flex items-center space-x-2 mt-1"
            >
              <input
                type="text"
                value={answer.question_answer}
                onChange={(e) => {
                  const updatedAnswers = [...newAnswers];
                  updatedAnswers[index].question_answer = e.target.value;
                  setNewAnswers(updatedAnswers);
                }}
                className="border border-gray-300 p-2 rounded-md flex-grow text-[11px] leading-4"
                placeholder="Enter an answer"
              />
              <select
                value={answer.value || ""}
                onChange={(e) => {
                  const updatedAnswers = [...newAnswers];
                  updatedAnswers[index].value = parseInt(e.target.value, 10);
                  setNewAnswers(updatedAnswers);
                }}
                className="border border-gray-300 p-2 rounded-md text-xs"
              >
                <option value="">Select Value</option>
                <option value="1">Fit</option>
                <option value="2">Fit Follow Up</option>
                <option value="3">Unfit</option>
              </select>
              <button
                type="button"
                onClick={() => handleRemoveAnswer(index + answers.length)}
                className="text-red-500 text-lg"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <Button
            type="button"
            color="purple"
            onClick={handleAddAnswer}
            className="rounded-[5px] flex items-center justify-center w-fit mt-2"
          >
            <AiOutlinePlus className="text-md"/>
            <p className="text-[12px]">Add New Answer</p>
          </Button>
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-xs">Question</label>
            <div className="flex space-x-2">
              <button
                onClick={handleEditToggle}
                className="text-blue-500 text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(question.question_id)}
                className="text-red-500 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="mb-2">
            <input
              type="text"
              value={questionText}
              className="border border-gray-300 p-2 rounded-md text-[11px] leading-4 w-full"
              disabled
            />
          </div>
          <label className="font-bold text-xs mt-2">Answers</label>
          <div className="mt-2">
            {answers.map((answer, index) => (
              <div
                key={answer.question_answer_id}
                className="flex items-center space-x-2 mt-1"
              >
                <input
                  type="text"
                  value={answer.question_answer}
                  className="border border-gray-300 p-2 rounded-md flex-grow text-[11px] leading-4"
                  disabled
                />
                <select
                  value={answer.value || ""}
                  className="border border-gray-300 p-2 rounded-md text-xs"
                  disabled
                >
                  <option value="1">Fit</option>
                  <option value="2">Fit Follow Up</option>
                  <option value="3">Unfit</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
