import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited'
import NotesNotFound from '../components/NotesNotFound'
import { useState } from 'react'
import api from '../lib/axios'
import toast from 'react-hot-toast' 
import NoteCard from '../components/NoteCard'

const HomePage = () => {

  const [isRateLimited, setIsRateLimited] =  useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
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

      <div className="max-w-7xl mx-auto mt-6 p-4">
        {
          loading && <div className='text-center text-primary py-5'>Loading Notes...</div>
        }

        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound/>}

        { notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-3 ">

            {notes.map((note) => (
              <NoteCard key={note.id} note={note} setNotes={setNotes}/>              
            ))}
          
          </div>
        )}
      </div>
      
    </div>
  )
}

export default HomePage