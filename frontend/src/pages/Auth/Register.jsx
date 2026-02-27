import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { registerUser, error, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }, [error]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      await registerUser(data);
      toast.success("Registration successful! Redirecting to login...", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[hsl(228,50%,12%)] via-[hsl(228,50%,18%)] to-[hsl(228,50%,10%)] p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-12">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-3">Create Account</h1>
          <p className="text-gray-500 text-lg">Join us in the IOT world</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">First Name</label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 text-base"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Last Name</label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 text-base"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">E-Mail Id</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Enter your college email"
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
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-12 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-0 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 pr-12 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-0 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              Already have an account? Login
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
