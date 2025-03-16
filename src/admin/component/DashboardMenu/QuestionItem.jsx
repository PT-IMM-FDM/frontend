import { useState, useEffect } from "react";
import { getMostQuestionAnswered } from "../../api/question-fdm";
import useAuthStore from "../../stores/useAuthStore";

const QuestionItem = ({ question }) => {
  const [mostAnsweredData, setMostAnsweredData] = useState([]);
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMostAnsweredData = async () => {
      setLoading(true);
      try {
        const response = await getMostQuestionAnswered(token);
        if (response.success) {
          setMostAnsweredData(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching most answered data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMostAnsweredData();
  }, [token]);

  // Helper function to get count for a specific question_answer_id
  const getCountForAnswer = (answerId) => {
    if (!Array.isArray(mostAnsweredData)) return 0;
    for (const questionData of mostAnsweredData) {
      const answer = questionData.question_answer.find(
        (ans) => ans.question_answer_id === answerId
      );
      if (answer) return answer.count;
    }
    return 0;
  };

  return (
    <div className="border p-4 mb-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <label className="font-bold text-xs">Question</label>
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={question.question}
          className="border border-gray-300 p-2 rounded-md text-[11px] leading-4 w-full"
          disabled
        />
      </div>
      <label className="font-bold text-xs mt-2">Answers</label>
      <div className="mt-2">
        {question.question_answer.map((answer) => (
          <div
            key={answer.question_answer_id}
            className="grid grid-cols-2 items-center space-x-2 mt-1"
          >
            <input
              type="text"
              value={answer.question_answer}
              className="w-full border border-gray-300 p-2 rounded-md flex-grow text-[11px] leading-4"
              disabled
            />
            <span className="text-xs text-gray-500">
              {getCountForAnswer(answer.question_answer_id)} responses
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionItem;
