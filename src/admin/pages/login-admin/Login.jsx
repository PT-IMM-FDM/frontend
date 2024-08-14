import React, { useState } from "react";
import LoginForm from "../../component/Login/LoginForm";

const Login = () => {
  return (
    <div className="bg-cover bg-[url('/bg-form.jpg')] bg-center bg-no-repeat max-w-full min-h-screen">
      <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="w-full flex items-center justify-center px-2 md:px-0">
          {/* <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
