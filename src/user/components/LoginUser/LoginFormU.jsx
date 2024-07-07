import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const LoginFormU = () => {
  const [number_phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (number_phone.includes("-")) {
      setError("Nomor telepon tidak boleh mengandung tanda minus");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/login/user`, {
        number_phone,
      });
      console.log(response);
      setError(null);
      navigate("/fdm");
    } catch (error) {
      if (error.response.data.status === "VALIDATION_ERROR") {
        console.log(error.response.data.errors[0].password);
        setError(error.response.data.errors[0].password);
      } else {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (/^[0-9]*$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-[10px] p-6">
      <div className="flex flex-col">
        <img src="IMM.svg" alt="Logo IMM" className="h-14" />
        <h2 className="mt-2 text-center text-md medium text-gray-900">
          Fit Daily Monitoring
        </h2>
        <p className="mt-8 text-center thin text-sm text-gray-900">
          Welcome, Please Sign In to Continue
        </p>
        {error && (
          <p className="text-red-500 mt-2 text-center text-sm">{error}</p>
        )}
      </div>
      <form className="mt-4" onSubmit={handleLogin}>
        <div className="flex flex-col gap-4 mb-4">
          <div className="relative">
            <label htmlFor="number-phone" className="sr-only">
              nomor telepon
            </label>
            <div className="flex items-center border border-gray-300 rounded-[5px] px-3 py-2">
              <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-2" />
              <input
                id="number_phone"
                name="number"
                type="text"
                size="2rem"
                required
                value={number_phone}
                onChange={handlePhoneChange}
                className="w-full border-0 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="nomor telepon"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginFormU;
