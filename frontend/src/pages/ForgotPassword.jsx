import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [isLoading, setIsLoading]=useState(false)
    const [error, setError]=useState('')
    const [email, setEmail]=useState('')
    const [submitted, setSubmitted]=useState(false)
    const navigate = useNavigate()
  return (
    <div className='relative '>

    </div>
  )
}

export default ForgotPassword