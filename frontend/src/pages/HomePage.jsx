import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited'
import { useState } from 'react'
import axios from "axios"

const HomePage = () => {

  const [isRateLimited, setIsRateLimited] =  useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes")
        console.log(res.data);
        setNotes(res.data)
        setIsRateLimited(false)
        setLoading(false)
      } catch (error) {
        console.log("Error fetching data");
        if(error.response && error.response.status === 429){
          setIsRateLimited(true)
          toast.error("Rate limit reached. Please try again later.")
        }
      } finally {
        setLoading(false)
      }

    }

    fetchNotes()
  }, [])

  return (
    <div>
      <Navbar /> 
      {isRateLimited && <RateLimited/> }
      
    </div>
  )
}

export default HomePage