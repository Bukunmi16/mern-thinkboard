import {useState} from 'react'
import Navbar from '../components/Navbar'
import { ArrowLeftIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const CreatePage = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {  
    e.preventDefault()

    if(!title.trim() || !content.trim()){
      toast.error('All fields are required');
      return
    }
    setLoading(true)

    try {
        await api.post('/notes', {
          title,
          content
        })
        toast.success('Note Created Successfully!')
        navigate("/")
       } 
     catch (error) {
      console.log(error);
      toast.error('Failed to Create Note')
     } finally{
      setLoading(false)
    }
    
  }

  return (
    <div>
      <Navbar/>
        <div className="min-h-screen ">
        <div className="container mx-auto py-8 px-4">
        <div className="border border-white flex flex-col gap-6">
        <Link to={"/"} className="mb-6 shadow-lg flex p-3 items-center justify-around rounded-lg hover:bg-gray-200 transition-all duration-200 max-w-40" >
        <ArrowLeftIcon className='size-5' /> 
        <p>Back to Notes</p>
        </Link>
        <h1 className='text-3xl sm:text-left text-center'>Create New Note</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">

            <label className="label">
              <span className="label-text">Title</span>
            </label>
              <input type="text" placeholder="Note Title"
              className="input input-bordered rounded-full input-secondary w-full mx-auto" 
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              />

          </div>
          <div className="form-control mb-4">

            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <textarea className="textarea h-x rounded-xl  textarea-secondary h-32" placeholder="Write your note here..."
            value={content}
            onChange={(e) => {setContent(e.target.value)}}
            ></textarea>
          </div>

          <div className="card-actions justify-end">
            <button type='submit' className="btn btn-primary rounded-full text-white" disabled={loading}>
              {loading ? 'Creating...' : 'Create Note'}
            </button>
          </div>

          </form> 

        </div>
        </div>
        </div>
        </div>
  )
}

export default CreatePage