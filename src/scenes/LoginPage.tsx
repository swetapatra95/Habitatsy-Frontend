import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Home from './Listings';
import Signup from './Signup';

interface Credentials {
  email: string;
  password: string;
}

interface LoginPageProps {
  setToken: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setToken }) => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://habitatsy.cyclic.app/airbnb/login', credentials);
      console.log(response.data)
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token',token);
      const decodedToken: any = jwtDecode(token);
      console.log(response);
      const { role } = decodedToken; 
      localStorage.setItem('role', role);
      localStorage.setItem('userName', response.data.user.firstName + ' ' + response.data.user.lastName);
      localStorage.setItem('userId', response.data.user._id);
      console.log(response.data.user.firstName + ' ' + response.data.user.lastName);

        navigate('/Listings');
    
      
    } catch (error) {
      setError('Invalid userId or password');
    }
  };

  return (
    <div className="mt-28">
    <img src={process.env.PUBLIC_URL + '/logo2.png'} alt="Logo" className="mx-auto w-96 h-46 " />
    <div className="mx-auto max-w-lg">
      <h1 className="text-3xl font-bold mb-3 flex justify-center">Sign In</h1>
      <p className="text-md mb-6 flex justify-center">Sign in below to access your account</p>
      <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            User ID
          </label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
      <div className="text-center">
        <span>Don't have an account yet? </span>
        <a href="/Signup" className="text-blue-500 hover:text-blue-700">
          Sign Up
        </a>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
