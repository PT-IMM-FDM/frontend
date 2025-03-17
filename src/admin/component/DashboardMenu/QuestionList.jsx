import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import { getAllQuestions } from "../../api/question-fdm";
import useAuthStore from "../../stores/useAuthStore";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const {token} = useAuthStore((state) => ({token: state.token}))

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const dataQuestion = await getAllQuestions(token);
        const sortedQuestions = dataQuestion.sort(
          (a, b) => a.question_id - b.question_id
        );
        setQuestions(sortedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [token]);

  return (
    <div className="relative p-4 bg-white rounded-[10px]">
      <section className="mt-4 px-2 overflow-y-auto h-[30rem]">
        {questions.map((question) => (
          <QuestionItem
            key={question.question_id}
            question={question}
          />
        ))}
      </section>
    </div>
  );
};

export default QuestionList;
