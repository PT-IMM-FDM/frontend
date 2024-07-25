import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import { AddQuestionButton } from "./AddQuestionButton";
import { getAllQuestions } from "../../api/question-fdm";

const QuestionList = ({ token }) => {
  const [questions, setQuestions] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchQuestions = async () => {
    try {
      const dataQuestion = await getAllQuestions(token);
      setQuestions(dataQuestion);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((question) => question.question_id !== id));
  };

  const handleEdit = (updatedQuestion) => {
    setQuestions(
      questions.map((question) =>
        question.question_id === updatedQuestion.question_id
          ? updatedQuestion
          : question
      )
    );
  };

  const handleFetchCallback = async () => {
    try {
      await fetchQuestions();
    } catch (error) {
      console.error("Failed to refresh question list:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [apiUrl, token]);

  return (
    <div className="p-4 bg-white rounded-[10px]">
      <AddQuestionButton onAddQuestion={handleFetchCallback} />
      <section className="mt-4 px-2 overflow-y-auto max-h-[30rem]">
        {questions.map((question) => (
          <QuestionItem
            key={question.question_id}
            question={question}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSave={handleFetchCallback}
          />
        ))}
      </section>
    </div>
  );
};

export default QuestionList;
