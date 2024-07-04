import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const { setError, setLoading, error, loading, login } = useAuthStore((state) => ({
    setError: state.setError,
    setLoading: state.setLoading,
    error: state.error,
    loading: state.loading,
    login: state.login,
  }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      setError(null);
      navigate("/dashboard");
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
        <p className="mt-8 text-center thin text-sm text-gray-900">
          Welcome to Admin Login, Please Sign In to Continue
        </p>
        {error && (
          <p className="text-red-500 mt-2 text-center text-sm">{error}</p>
        )}
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
              type="email"
              autoComplete="email"
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

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Signing in.." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
