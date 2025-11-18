import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginLoading, error } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            newErrors.email = 'Valid email is required';
        if (formData.password.length < 6)
            newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the errors in the form');
            return;
        }

        try {
            await dispatch(loginUser(formData)).unwrap();
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (err) {
            const errorMessage = err || 'Failed to log in';
            toast.error(errorMessage);
        }
    };

    return (
        <div  className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full p-8 sm:p-10"
            >
                <h2 className="text-2xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                    <span>🔑 Login to Continue</span>
                </h2>
                {error && <p className="text-red-400 text-center mb-4 font-medium">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        error={errors.email}
                        icon={<FaEnvelope />}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••"
                        error={errors.password}
                        icon={<FaLock />}
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loginLoading}
                         className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 text-gray-900 font-bold shadow-lg hover:from-cyan-600 hover:to-teal-500 transition-all disabled:opacity-50"
                    >
                        {loginLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Logging In...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </motion.button>
                </form>
                <div className="mt-6 text-center text-sm text-white/80">
                    Don’t have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-purple-400 font-semibold hover:underline"
                    >
                        Sign Up
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

const Input = ({ label, type = 'text', error, icon, ...props }) => (
    <div className="relative">
        <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
        </label>
        <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80">
                {icon}
            </span>
            <input
                type={type}
                {...props}
                className={`w-full p-3 pl-10 rounded-lg bg-white/10 border ${error ? 'border-red-400' : 'border-white/20'
                    } text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-white/50 transition-all duration-200`}
                placeholder={props.placeholder}
            />
        </div>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
);

export default Login;
