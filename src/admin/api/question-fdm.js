import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllQuestions = async (token) => {
  const response = await axios.get(`${apiUrl}/fdm/question/getAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const getMostQuestionAnswered = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/fdm/mostQuestionAnswered`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching most question answered data:', error);
    throw error;
  }
};

export const createQuestion = async (token, questionData) => {
  const response = await axios.post(
    `${apiUrl}/fdm/question/create`,
    questionData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const updateQuestion = async (token, questionData) => {
    try {
      const response = await axios.put(`${apiUrl}/fdm/question/update`, questionData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  };

export const deleteQuestion = async (token, questionId) => {
  const response = await axios.delete(`${apiUrl}/fdm/question/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { question_id: questionId },
  });
  return response.data;
};
