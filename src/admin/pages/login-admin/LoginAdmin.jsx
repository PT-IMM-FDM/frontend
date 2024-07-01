import React, { useState } from "react";
import LoginForm from "../../component/LoginAdmin/LoginForm";

const LoginAdmin = () => {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [rememberMe, setRememberMe] = useState(false);

  //   const handleLogin = (e) => {
  //     e.preventDefault();
  //     // Logic untuk proses login bisa ditambahkan di sini
  //     console.log('Email:', email);
  //     console.log('Password:', password);
  //     console.log('Remember Me:', rememberMe);
  //   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
};

export default LoginAdmin;
