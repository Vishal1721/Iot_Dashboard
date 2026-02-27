import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }, [error]);

  const onSubmit = async (data) => {
    try {
      console.log('Attempting login with:', { email: data.email });
      const response = await login(data);
      console.log('Login response received:', response);
      
      if (response?.status === 'success' && response?.user) {
        console.log('Login successful, user:', response.user);
        console.log('User role:', response.user.role);
        
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1000,
        });
        
        // Navigate to dashboard for all users
        navigate('/dashboard', { replace: true });
      } else {
        console.log('Login response invalid:', response);
        toast.error("Login failed - invalid response", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || "Login failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[hsl(228,50%,12%)] via-[hsl(228,50%,18%)] to-[hsl(228,50%,10%)] p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-12 relative">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors group"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
        </button>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-3">Login to the Application</h1>
          <p className="text-gray-500 text-lg">Let's enter into IOT world</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">E-Mail Id</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Enter your College Email"
              className="w-full px-4 py-3 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 text-base"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                placeholder="Enter your Password"
                className="w-full px-4 py-3 pr-12 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
            )}
          </div>

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;