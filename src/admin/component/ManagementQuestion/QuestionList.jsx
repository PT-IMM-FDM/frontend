import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import { AddQuestionButton } from "./AddQuestionButton";
import { getAllQuestions } from "../../api/question-fdm";
import { Box } from "@mui/material";

const QuestionList = ({ token }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchQuestions = async () => {
    setLoading(true); // Start loading
    try {
      const dataQuestion = await getAllQuestions(token);
      setQuestions(dataQuestion);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
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
    // setLoading(false);
  }, [apiUrl, token]);

  return (
    <div className="relative p-4 bg-white rounded-[10px]">
      {loading && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 999,
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(243, 244, 246, 0.7)",
            }}
          >
            <img src="/Loader-1.gif" alt="loader" className="h-[5rem] z-10" />
          </Box>
        )}
      <AddQuestionButton onAddQuestion={handleFetchCallback} />
      <section className="mt-4 px-2 overflow-y-auto h-[30rem]">
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
