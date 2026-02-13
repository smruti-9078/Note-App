import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getData } from "@/context/userContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = getData();

  

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
    
      const res = await axios.post(
        "http://localhost:8000/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (res.data.success) {
        setUser(res.data.user)
        localStorage.setItem("accessToken", res.data.accessToken)
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-400 flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-green-600 text-lg">Login</CardTitle>
          <CardDescription className="text-center">
            Login into your account to get started with Notes App
          </CardDescription>
        </CardHeader>

        
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div>
                  <Label>Password</Label>
                  <Link to='/forgot-password' className="flex item-center justify-between">Forgot password?</Link>
                </div>
                
                <div className="relative">
                  <Input
                    name="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
            onClick={handleSubmit}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Log...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        
      </Card>
    </div>
  );
};

export default Login;
