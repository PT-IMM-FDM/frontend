import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { getCurrentLogin } from "../../api/auth";
import { Button, Spinner } from "flowbite-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const { setError, setLoading, error, loading, login, token, setUser } =
    useAuthStore((state) => ({
      setError: state.setError,
      setLoading: state.setLoading,
      error: state.error,
      loading: state.loading,
      login: state.login,
      token: state.token,
      setUser: state.setUser,
    }));

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      // Check if the input is valid email or phone number
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isPhoneNumber = /^[0-9]{10,14}$/.test(email); // Example for phone number
      
      if (!isEmail && !isPhoneNumber) {
        setError("Please enter a valid email address or phone number.");
        setLoading(false);
        return;
      }
      
      try {
        await login(email, password);
        setError(null);
        navigate("/admin/dashboard");
      } catch (error) {
        let errorMessage = "An error occurred";
        console.log(error);
        if (error.response?.data?.status === "VALIDATION_ERROR") {
          errorMessage = error.response.data.errors[0].password;
        } else {
          errorMessage = error.response?.data?.message || errorMessage;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-[10px] p-6">
      <div className="flex flex-col">
        <img src="IMM.svg" alt="Logo IMM" className="h-14" />
        <h2 className="mt-2 text-center text-md medium text-gray-900">
          Fit Daily Monitoring
        </h2>
        <p className="mt-4 text-center thin text-sm text-gray-900">
          Welcome, Please Sign In to Continue
        </p>
      </div>
      <form className="mt-4" onSubmit={handleLogin}>
        <div className="flex flex-col gap-4 mb-4">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="text"
              // autoComplete="email"
              size="2rem"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-[5px] w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[5px] thin w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-[3rem]">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        {error ? (
          <p className="text-red-500 mt-2 text-center text-sm mb-2">{error}</p>
        ) : (
          <div className="h-[14px] mt-2 text-center text-sm mb-2"></div>
        )}

        <div>
          {loading ? (
            <Button color="gray" className="w-full">
              <Spinner
                aria-label="Alternate spinner button example"
                size="sm"
              />
              <span className="pl-3">Loading...</span>
            </Button>
          ) : (
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              // disabled={loading}
            >
              Sign In
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
