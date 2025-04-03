import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import SVGs as image URLs
import GoogleLogo from '@/assets/Google_Logo.svg';
import AppleLogo from '@/assets/Apple_Logo.svg';
import MetaLogo from '@/assets/Meta_Logo.svg';
import MicrosoftLogo from '@/assets/Microsoft_Logo.svg';

// Import eye icons for password toggle
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Login | Griwa International</title>
        </Helmet>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <Card className="w-full max-w-md p-6">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="w-full"
                  />
                </div>

                {/* Password Field with Show/Hide Icon */}
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>

                <div className="flex items-center justify-center my-4">
                  <div className="border-t border-gray-300 flex-grow mr-3"></div>
                  <span className="text-gray-500">or</span>
                  <div className="border-t border-gray-300 flex-grow ml-3"></div>
                </div>

                {/* Social Login Buttons */}
                <Button type="button" className="w-full flex items-center justify-center">
                  <img src={GoogleLogo} alt="Google Logo" className="w-6 h-6 mr-2" />
                  Sign in with Google
                </Button>

                <Button type="button" className="w-full flex items-center justify-center">
                  <img src={AppleLogo} alt="Apple Logo" className="w-6 h-6 mr-2" />
                  Sign in with Apple
                </Button>

                <Button type="button" className="w-full flex items-center justify-center">
                  <img src={MetaLogo} alt="Meta Logo" className="w-6 h-6 mr-2" />
                  Sign in with Meta
                </Button>

                <Button type="button" className="w-full flex items-center justify-center">
                  <img src={MicrosoftLogo} alt="Microsoft Logo" className="w-6 h-6 mr-2" />
                  Sign in with Microsoft
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
