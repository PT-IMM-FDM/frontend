import { Button, Modal, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import useAuthStore from "../../stores/useAuthStore";
import { createQuestion } from "../../api/question-fdm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddQuestionButton({ onAddQuestion }) {
  const { token } = useAuthStore((state) => ({ token: state.token }));
  
  const [formData, setFormData] = useState({
    question: "",
    answers: [],
  });
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
    setFormData({
      question: "",
      answers: [],
    });
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index][name] = value;
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const addAnswer = () => {
    if (formData.answers.length < 5) {
      setFormData({
        ...formData,
        answers: [...formData.answers, { question_answer: "", value: "" }],
      });
    }
  };

  const removeAnswer = (index) => {
    const updatedAnswers = formData.answers.filter((_, i) => i !== index);
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const questionData = {
      question: formData.question,
      question_answer: formData.answers.map((answer) => answer.question_answer),
      value: formData.answers.map((answer) => parseInt(answer.value)),
    };
    try {
      await createQuestion(token, questionData);
      onAddQuestion(); // Call the function to add the new question to the list
      onCloseModal();
      toast.success("Question Created successfully.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored"
      });
    } catch (error) {
      console.error("Failed to add new question:", error);
      toast.error("Failed to add new question.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored"
      });
    }
  };

  return (
    <>
      <Button
        color="purple"
        className="h-[2.5rem] bg-purple-700 text-white border-[1px]"
        onClick={() => setOpenModal(true)}
      >
        <LuUser className="text-lg" />
        <p className="ml-1 text-[12px]">Tambah Pertanyaan</p>
      </Button>

      <Modal className="z-[999]" dismissible show={openModal} size="lg" onClose={onCloseModal}>
        <Modal.Header style={{ fontSize: "12px" }}>
          Tambah Pertanyaan
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="question"
                className="block text-[12px] font-medium text-gray-700"
              >
                Question
              </label>
              <TextInput
                id="question"
                name="question"
                placeholder="Enter your question"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block mb-0 text-[12px] font-medium text-gray-700">
                Answers
              </label>
              {formData.answers.map((answer, index) => (
                <div key={index} className="flex items-center gap-2">
                  <TextInput
                    name="question_answer"
                    placeholder="Enter an answer"
                    value={answer.question_answer}
                    onChange={(e) => handleChange(index, e)}
                    style={{ fontSize: "12px" }}
                    required
                    className="mt-1 block flex-grow border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                  <Select
                    name="value"
                    value={answer.value}
                    onChange={(e) => handleChange(index, e)}
                    style={{ fontSize: "12px" }}
                    required
                    className="mt-1 block border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select value</option>
                    <option value="1">Fit</option>
                    <option value="2">Fit Follow Up</option>
                    <option value="3">Unfit</option>
                  </Select>
                  <button type="button" onClick={() => removeAnswer(index)}>
                    <AiOutlineDelete className="text-red-500 text-lg" />
                  </button>
                </div>
              ))}

              {formData.answers.length < 5 && (
                <Button
                  color="gray"
                  type="button"
                  onClick={addAnswer}
                  className="text-sm mt-4"
                >
                  <AiOutlinePlus className="text-lg" />
                  <span className="ml-1 text-[12px]">Add Optional Answer</span>
                </Button>
              )}
            </div>
            <div className="col-span-2 flex gap-2 justify-end mt-4">
              <Button
                color="purple"
                className="h-[2.5rem] bg-purple-700 text-white border-[1px]"
                type="submit"
              >
                <p className="text-[12px]">Tambah Pertanyaan</p>
              </Button>
              <Button
                color="failure"
                className="h-[2.5rem] text-white border-[1px]"
                onClick={onCloseModal}
              >
                <p className="text-[12px]">Batal</p>
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
