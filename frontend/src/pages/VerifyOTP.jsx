import { Alert, AlertDescription } from '@/Components/ui/alert'
import { Button } from '@/Components/ui/button'
import { Card, CardTitle,CardHeader,CardDescription, CardContent } from '@/Components/ui/card'
import axios from 'axios'
import { CheckCircle, Loader2, RotateCcw } from 'lucide-react'
import { Input } from '@/Components/ui/input'
import React, { useRef } from 'react'
import { useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const VerifyOTP = () => {
    const [isVerified] = useState(false)
    const [error, setError] = useState(" ")  
    const[succcessMessage, setSuccessMessage] = useState(" ")
    const [otp, setOtp] =useState(["","","","","",""])
    const [isLoading, setIsLoading ]= useState(false)
    const inputRefs = useRef([])
    const {email} = useParams()
    const navigate = useNavigate()

    const handleChange = (index, value)=>{
        if(value.length > 1)return
        const updatedOtp = [...otp]
        updatedOtp[index]=value
        setOtp(updatedOtp)
        if(value && index < 5){
            inputRefs.current[index+1].focus()
        }

    }

    const handleVerify = async()=>{
        const finalOtp = otp.join("")
        if(finalOtp.length < 6){
            setError("Please enter a valid 6-digit OTP")
        }

        try {
            setIsLoading(true)
            const response = await axios.post(`http://localhost:8000/user/verify-otp/${email}`,{
                otp:finalOtp
            })
            setSuccessMessage(response.data.message)
            setTimeout(()=>{
                navigate(`/reset-password/${email}`)

            },2000)
            
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Please try again.")
            
        } finally{
            setIsLoading(false)
        }
    
    }

    const clearOtp = ()=>{
        setOtp(["","","","","",""])
        setError("")
        inputRefs.current[0].focus()
    }
    
    return (
    <div className='min-h-screen flex flex-col bg-slate-200'>
        <div className='flex-1 flex items-center justify-center p-4'>
            <div className='w-full max-w-md space-y-6'>
                <div className='text-center space-y-2'>
                    <h1 className='text-2xl font-bold tracking-tight text-gray-800'>Verify your email</h1>
                    <p className='text-muted-foreground'>we have sent a 6-digit verification code to{" "}
                        <span>{"your email"}</span>
                    </p>
                </div>
                <Card className='shadow-lg'>
                    <CardHeader className='space-y-1'>
                        <CardTitle className='text-2xl text-center text-green-600'>Enter OTP</CardTitle>
                        <CardDescription className='text-center'>
                            {
                                isVerified ? "Code verified successfully!" : "Enter the 6-digit code sent to your email"
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        {
                            error && (<Alert variant='destructive'>
                                <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )

                        }
                        {
                            succcessMessage && (<p className='text-green-600 text-sm mb-3 text-center'>{succcessMessage}</p>)


                        }
                        {
                            isVerified ? (
                                <div className='py-6 flex flex-col items-center justify-center text-center space-y-4'>
                                    <div className='bg-primary/10 rounded-full p-3'>
                                    <CheckCircle className='h-6 w-6 text-primary'/>
                                    </div>
                                    <div className='space-y-2'>
                                        <h3 className='font-medium text-lg'>verification successfull</h3>
                                        <p className='text-muted-foreground'>Your email has been verified .you'll be redirected to reset</p>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <Loader2 className='h-4 w-4 animate-spin'/>
                                        <span className='text-sm text-muted-foreground'>Redirecting...</span>
                                    </div>

                                </div>
                            ):(
                            <>
                            <div className='flex justify-betwen mb-6'>
                                {
                                    otp.map((digit, index)=>(
                                        <Input
                                        key={index}
                                        type='text'
                                        value={digit}
                                        onChange ={(e)=>handleChange(index, e.target.value)}
                                        maxLength={1}
                                        ref={(el)=>inputRefs.current[index]=el}
                                        className='w-12 h-12 text-center text-xl font-bold'
                                        />
                                    ))
                                }

                            </div>
                            <div className='space-y-3'>
                                <Button 
                                onClick={handleVerify}
                                className='bg-green-600 w-full'
                                disabled={isLoading || otp.some((digit)=>digit==="")}>
                                    {
                                        isLoading ? <><Loader2 className='mr-2 h-4 animate-spin'/>Verifying</>:"Verify code"
                                    }
                                </Button>
                                <Button variant='outline' onClick={clearOtp} className='w-full bg-transparent' disabled ={isLoading || isVerified}> 
                                    <RotateCcw className='mr-2 h-4 w-4'/>
                                    Clear
                                </Button>

                            </div>
                            </>
                              )
                        }


                    </CardContent>

                </Card>
            </div>
        </div>
      
    </div>
  )
}

export default VerifyOTP
