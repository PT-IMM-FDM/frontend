import { useState, useEffect } from "react";
import {
  Label,
  Radio,
  Button,
  HR,
  Select,
  TextInput,
  Alert,
  Progress,
  Spinner,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";
import useAuthStore from "../../admin/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export function Component() {
  const { token, user } = useAuthStore((state) => ({
    token: state.token,
    user: state.user,
  }));

  const apiUrl = import.meta.env.VITE_API_URL;
  const apiGetAllQuestionsURL = `${apiUrl}/fdm/question/form`;
  const apiCreateResponseURL = `${apiUrl}/fdm/response/create`;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [workDurationPlan, setWorkDurationPlan] = useState("");
  const [shift, setShift] = useState("");
  const [isDriver, setIsDriver] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(apiGetAllQuestionsURL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = response.data;
        if (result.message === "Form has been filled today") {
          setShowAlert(true); // Menampilkan alert
          setTimeout(() => {
            navigate("/fdm-form/hasil", { state: response.data });
          }, 3000);
        } else {
          // Sort questions by question_id
          const sortedQuestions = result.data.sort(
            (a, b) => a.question_id - b.question_id
          );
          setQuestions(sortedQuestions);

          const initialAnswers = {};
          sortedQuestions.forEach((question) => {
            initialAnswers[question.question_id] = "";
          });
          setAnswers(initialAnswers);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [token, apiGetAllQuestionsURL, navigate]);

  const handleRadioChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleDriverStatusChange = (e) => {
    setIsDriver(e.target.value);
  };

  const handleShiftChange = (e) => {
    setShift(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allAnswered = Object.values(answers).every((answer) => answer !== "");
    if (!allAnswered && isDriver === "true") {
      alert("Harap menjawab semua pertanyaan sebelum mengirimkan.");
    } else {
      const questionIds = Object.keys(answers).map(Number);
      const questionAnswerIds = Object.values(answers).map(Number);
      const requestBody = {
        user_id: user.user_id,
        question_id: questionIds,
        question_answer_id: questionAnswerIds,
        attendance_status: attendanceStatus,
        work_duration_plan: workDurationPlan,
        shift: shift,
        is_driver: isDriver,
        vehicle_hull_number: isDriver ? licensePlate : null,
      };

      try {
        setLoading(true); // Set loading saat pengiriman dimulai
        const response = await axios.post(apiCreateResponseURL, requestBody, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const created_at = new Date().toISOString();
        navigate("/fdm-form/hasil", {
          state: {
            success: true,
            data: {
              ...response.data.data, // Spread semua properti dari response.data
              created_at, // Tambahkan createdAt ke dalam data
            },
            message: "Response User created successfully",
          },
        });
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          alert("Error Network please try again later.");
          return;
        }
        console.error("Error submitting answers:", error);
        alert("Mohon mengisi seluruh pertanyaan.");
      } finally {
        setLoading(false); // Set loading ke false setelah selesai
      }
    }
  };

  // Calculate the progress percentage based on the number of answered questions
  const answeredQuestionsCount = Object.values(answers).filter(
    (answer) => answer !== ""
  ).length;
  const progressPercentage = (answeredQuestionsCount / questions.length) * 100;

  return (
    <>
      <div className="mt-2">
        <div className="text-base font-medium dark:text-white"></div>
        <Progress progress={progressPercentage} size="sm" color="purple" />
      </div>
      {showAlert && (
        <Alert color="success" icon={HiInformationCircle}>
          <span className="font-medium">Anda sudah mengisi FDM hari ini</span>{" "}
          Silakan kembali besok hari
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-2 block">
          <Label
            className="font-bold text-[16px]"
            htmlFor="attendanceStatus"
            value="Status Kehadiran"
          />
        </div>
        <Select
          id="attendanceStatus"
          required
          value={attendanceStatus}
          onChange={(e) => setAttendanceStatus(e.target.value)}>
          <option value="" disabled>
            Pilih status kehadiran
          </option>
          <option value="K1">K1: Kerja di Hari Kerja Biasa</option>
          <option value="K1+OT">
            K1+OT: Kerja di Hari Kerja Biasa, Lanjut Overtime
          </option>
          <option value="OT">OT: Kerja Pada Hari Libur/Overtime</option>
        </Select>
        <HR />
        <div className="mb-2 block">
          <Label
            className="font-bold text-[16px]"
            htmlFor="workDurationPlan"
            value="Rencana durasi kerja hari ini?"
          />
        </div>
        <Select
          id="workDurationPlan"
          required
          value={workDurationPlan}
          onChange={(e) => setWorkDurationPlan(e.target.value)}
          className="focus:ring-purple-500">
          <option value="" disabled>
            Pilih rencana durasi kerja
          </option>
          <option value="< 8 jam">&lt; 8 jam</option>
          <option value="8 Jam">8 Jam</option>
          <option value="9 - 12 Jam">9 - 12 Jam</option>
          <option value="> 12 Jam">&gt; 12 Jam</option>
        </Select>
        <HR />

        <div className="mb-2 block">
          <Label
            className="font-bold text-[16px]"
            htmlFor="shift"
            value="Apakah anda kerja Shift/ Non-Shift?"
          />
        </div>
        <Select id="shift" required value={shift} onChange={handleShiftChange}>
          <option value="" disabled>
            Pilih jawaban anda
          </option>
          <option value="true">Shift</option>
          <option value="false">Non-Shift</option>
        </Select>
        <HR />

        <div className="mb-2 block">
          <Label
            className="font-bold text-[16px]"
            htmlFor="driverStatus"
            value="Apakah anda seorang Pengendara/Driver/Operator?"
          />
        </div>
        <Select
          id="driverStatus"
          required
          value={isDriver}
          onChange={handleDriverStatusChange}>
          <option value="" disabled>
            Pilih jawaban anda
          </option>
          <option value="false">Tidak</option>
          <option value="true">Ya</option>
        </Select>
        <HR />

        {isDriver === "true" && (
          <div className="mb-4">
            <Label
              className="font-bold text-[16px]"
              htmlFor="licensePlate"
              value="Masukkan nomor lambung kendaraan"
            />
            <TextInput
              id="licensePlate"
              placeholder="Nomor Plat Kendaraan"
              required
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
            <HR />
          </div>
        )}

        {questions.map((question) => (
          <div key={question.question_id}>
            <div className="mb-4 font-semibold">{question.question}</div>
            {question.question_answer.map((answer) => (
              <div
                className="flex items-center gap-2 mb-4"
                key={answer.question_answer_id}>
                <Radio
                  id={`answer-${answer.question_answer_id}`}
                  name={question.question_id}
                  value={answer.question_answer_id}
                  onChange={handleRadioChange}
                  className="text-purple-500 focus:ring-purple-500"
                />
                <Label htmlFor={`answer-${answer.question_answer_id}`}>
                  {answer.question_answer}
                </Label>
              </div>
            ))}
            <HR />
          </div>
        ))}
        <div>
          {loading ? (
            <Button color="gray" className="w-full">
              <Spinner
                aria-label="Alternate spinner button example"
                size="sm"
                color="purple"
              />
              <span className="pl-3">Loading...</span>
            </Button>
          ) : (
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
}
