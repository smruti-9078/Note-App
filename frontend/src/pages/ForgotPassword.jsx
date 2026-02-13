import { Alert, AlertDescription } from '@/Components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { CheckCircle, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'sonner'

const ForgotPassword = () => {
    const [isLoading, setIsLoading]=useState(false)
    const [error]= useState('')
    const [email, setEmail]=useState('')
    const [isSubmitted, setIsSubmitted]=useState(false)
    const navigate = useNavigate()

    const handleForgotPassword = async (e)=>{
      e.preventDefault()
      try {
        setIsLoading(true)
        const response = await axios.post(`http://localhost:8000/user/forgot-password`,{
          email
          
        
        })
        if(response.data.success){
          navigate(`/verify-otp/${email}`)
          Toaster .success(response.data.message)
          setEmail("")
        }
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    }
    
  return (
    <div className='relative w-full h-[760px] bg-slate-400 overflow-hidden'>
      <div className='min-h-screen flex flex-col'>
        {/*main content*/}
        <div className='flex-1 flex items-center justify-center p-4'>
          <div className='w-full max-w-md space-y-6'>
            <div className='text-center space-y-2'>
              <h1 className='text-3xl font-bold tracking-tight text-green-600'>Reset Your Password</h1>
              <p className='text-muted-foreground'>Enter your email adress and we'll send you instructions to reset your password.</p>
            </div>
            <Card className='bg-white '>
              <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl text-center text-green-600'>Forgot password</CardTitle>
                <CardDescription className='text-center'>
                  {
                    isSubmitted? "Check your email for instructions to reset your password." : "Please enter your email address to receive password reset instructions."
                  }

                </CardDescription>

              </CardHeader>
              <CardContent className='space-y-4'>
                {
                  error && (<Alert varient='destructive'>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>)
                }
                {
                  isSubmitted ? (
                    <div className='py-6 flex flex-col items-center justify-center text-center space-y-4 '>
                      <div className='bg-primary/10 rounded-full p-3'>
                          <CheckCircle className='h-6 w-6 text-primary'/>
                      </div>
                      <div className='space-y-2'>
                        <h3 className='font-medium text-lg'>Check your email</h3>
                        <p className='text-muted-foreground'>we have sent password reset instructions to your email address.<span className='font-medium text-foreground'>{email}</span></p>
                        <p>If you don't see the email, check your spam folder or{" "}
                          <button onClick={()=>setIsSubmitted(false)} className='text-primary font-medium hover:underline'>

                          </button>
                        </p>
                      </div>

                    </div>

                  ):(
                    <form className='space-y-4' onSubmit={handleForgotPassword}>
                      <div className='space-y-2 relative text-gray-800'>
                        <Label>Email</Label>
                        <Input
                          type='email'
                          placeholder='Enter your email'
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <Button className='w-full bg-green-700 text-white hover:bg-green-500  text-center'>
                        {
                          isLoading ? (
                            <><Loader2 className='mr-2 h-4 w-4 animate-spain'/>Sending reset link..</>
                          ):("Send reset link")
                        }
                      </Button>
                    </form>
                  )
                }
              </CardContent>
              <CardFooter className='flex justify-center'>
                <p>Remember your password? {" "}
                  <Link to={'/login'} className='text-green-600 hover:underline font-medium relative'>Sign in</Link>
                </p>
              </CardFooter>

            </Card>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default ForgotPassword