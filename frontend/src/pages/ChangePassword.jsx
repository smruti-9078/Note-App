import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import axios from "axios";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const { email } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password do not match");
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:8000/user/change-password/${email}`,
        {
          newPassword,
          confirmPassword,
        },
      );
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center justify-center bg-slate-200 px-4">
      <div className="bg-white shadow-md rounded-lg p-5 max-w-md w-full">
        <h2 className="text-2xl font-semi-bold mb-4 text-center">
          Change Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Set anew password for <span className="font-semibold">{email}</span>
        </p>
        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">{success}</p>
        )}
        <div className="space-y-4 relative">
            <Input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-2"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              
              <Eye className="w-4 h-4 text-gray-500" />
            ) : (
              
              <EyeOff className="w-4 h-4 text-gray-500" />
            )}
          </button>
         
          
          

          <Input
            type= "password"
            placeholder="Confrim Password"
            value={confirmPassword}
            onChange={(e) => setConfrimPassword(e.target.value)}
          />
          
          

          <Button
            className="w-full bg-green-600 hover:bg-green-500"
            disabled={isLoading}
            onClick={handleChangePassword}
        
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Changing
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
