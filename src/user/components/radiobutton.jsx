"use client";

import { useState, useEffect } from "react";
import {
  Label,
  Radio,
  Button,
  HR,
  Card,
  Select,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import useAuthStore from "../../admin/stores/useAuthStore";

export function Component() {
  const { token, user } = useAuthStore((state) => ({
    token: state.token,
    user: state.user, // Asumsikan user object memiliki id
  }));

  const apiUrl = import.meta.env.VITE_API_URL;
  const apiGetAllQuestionsURL = `${apiUrl}/fdm/question/getall`;
  const apiCreateResponseURL = `${apiUrl}/fdm/response/create`;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [workDurationPlan, setWorkDurationPlan] = useState("");
  const [shift, setShift] = useState("");
  const [isDriver, setIsDriver] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  useEffect(() => {
    // Fungsi untuk mendapatkan data dari API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(apiGetAllQuestionsURL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = response.data;
        setQuestions(result.data);

        const initialAnswers = {};
        result.data.forEach((question) => {
          initialAnswers[question.question_id] = "";
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Terjadi kesalahan saat mendapatkan data.");
      }
    };

    fetchQuestions();
  }, [token, apiGetAllQuestionsURL]);

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
    if (!allAnswered && (isDriver == "true")) {
      alert("Harap menjawab semua pertanyaan sebelum mengirimkan.");
    } else {
      const questionIds = Object.keys(answers).map(Number); // Mengubah key menjadi angka
      const questionAnswerIds = Object.values(answers).map(Number); // Mengubah value menjadi angka
      const requestBody = {
        user_id: user.user_id, // Mengambil user_id dari state useAuthStore
        question_id: questionIds,
        question_answer_id: questionAnswerIds,
        attendance_status: attendanceStatus,
        work_duration_plan: workDurationPlan,
        shift: shift,
        is_driver: isDriver,
        vehicle_hull_number: isDriver ? licensePlate : null,
      };

      try {
        const response = await axios.post(apiCreateResponseURL, requestBody, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Jawaban terkirim sukses!");
        console.log("Jawaban terkirim:", response.data);
      } catch (error) {
        console.error("Error submitting answers:", error);
        alert("Terjadi kesalahan saat mengirimkan jawaban.");
      }
    }
  };

  return (
    <>
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
          onChange={(e) => setAttendanceStatus(e.target.value)}
        >
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
        >
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
        <Select
          id="shift"
          required
          value={shift}
          onChange={handleShiftChange}
        >
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
          onChange={handleDriverStatusChange}
        >
          <option value="" disabled>
            Pilih jawaban anda
          </option>
          <option value="false">Tidak</option>
          <option value="true">Ya</option>
        </Select>
        <HR />

        {isDriver == "true" && (
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
                className="flex items-center gap-2"
                key={answer.question_answer_id}
              >
                <Radio
                  id={answer.question_id}
                  name={question.question_id}
                  value={answer.question_answer_id}
                  onChange={handleRadioChange}
                />
                <Label htmlFor={answer.question_id}>
                  {answer.question_answer}
                </Label>
              </div>
            ))}
            <HR />
          </div>
        ))}
        <Button className="mb-8 w-full" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
