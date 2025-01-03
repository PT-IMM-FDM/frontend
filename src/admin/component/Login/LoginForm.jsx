import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { getCurrentLogin } from "../../api/auth";
import { Button, Spinner, Modal } from "flowbite-react";
import Cookies from "js-cookie";
import { HiOutlinePhone, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk mengatur visibility password
  // const [rememberMe, setRememberMe] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { setError, setLoading, error, loading, login, token, user, setUser } =
    useAuthStore((state) => ({
      setError: state.setError,
      setLoading: state.setLoading,
      error: state.error,
      loading: state.loading,
      login: state.login,
      token: state.token,
      user: state.user,
    }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      const newToken = Cookies.get("token");
      const dataUser = await getCurrentLogin(newToken);

      if (dataUser.data.role.name !== "User") {
        navigate("/admin/dashboard");
      } else {
        navigate("/fdm-form");
      }
      setError(null);
      setLoading(false);
    } catch (error) {
      let errorMessage = "An error occurred";
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
        <p className="mt-8 text-center text-md text-gray-900 font-bold">
          Welcome to IMM Fit Daily Monitoring
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
              size="2rem"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-[5px] w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nomor Handphone"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} // Tentukan tipe input berdasarkan state showPassword
              autoComplete="current-password"
              required
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[5px] w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Ubah visibility password saat ikon diklik
            >
              {showPassword ? (
                <HiOutlineEyeOff className="text-gray-500" />
              ) : (
                <HiOutlineEye className="text-gray-500" />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mb-[3rem]">
          <div className="text-sm cursor-pointer">
            <a
              onClick={() => setOpenModal(true)}
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
          <Modal
            show={openModal}
            size="lg"
            onClose={() => setOpenModal(false)}
            popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="mb-5 text-md text-justify font-normal text-black dark:text-gray-400">
                  Silahkan hubungi OH OnCall IMM agar kami dapat memberikan
                  informasi lebih lanjut tentang password anda.
                </h3>
                <div className="flex flex-col text-sm">
                  <div className="flex items-center mb-2">
                    <HiOutlinePhone className="mr-2 text-xs" />
                    OH OnCall (Klinik 30): 0812-5511-185
                  </div>
                  <div className="flex items-center mb-2">
                    <HiOutlinePhone className="mr-2 text-xs" />
                    OH OnCall (Klinik Port): 0812-5511-183
                  </div>
                  <div className="flex items-center mb-2">
                    <HiOutlinePhone className="mr-2 text-xs" />
                    Abustan: 0852-4717-8478
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-5">
                  <Button color="purple" onClick={() => setOpenModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
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
                color="purple"
              />
              <span className="pl-3">Loading...</span>
            </Button>
          ) : (
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign In
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
