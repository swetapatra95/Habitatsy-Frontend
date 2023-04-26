import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const response = await axios.post("https://habitatsy.cyclic.app/airbnb/user", {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      setError("Invalid userId or password");
    }
  };

  return (
    <div className="mt-28">
    <img src={process.env.PUBLIC_URL + '/logo2.png'} alt="Logo" className="mx-auto w-96 h-46 " />
    <div className="mx-auto max-w-lg">
      <h1 className="text-3xl font-bold mb-3 flex justify-center">Sign Up</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSignUp} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center">
        <span>Already have an account? </span>
        <a href="/" className="text-blue-500 hover:text-blue-700">
          Sign In
        </a>
      </div>
    </div>
  </div>
  
  );
};

export default SignUp;
