import {useState} from 'react'
import Navbar from '../components/Navbar'
import { Trash2Icon, LoaderIcon, ArrowLeftIcon } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'
import { useEffect } from 'react'

const NoteDetailPage = () => {

  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const {id} = useParams()

  useEffect(() =>{
    const fetchNote = async () =>{
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
        console.log(res.data);
        
      } catch (error) {
        console.log(error);
        toast.error('Failed to Get Note')
      } finally{
        setLoading(false)
      }
    } 
    fetchNote()
  }, [id])

    if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  
  const handleDelete = async (e, id) =>{
    e.preventDefault()

    if (!window.confirm('Are you sure you want to delete this note?') ){return}

    try {
      await api.delete(`/notes/${id}`)
      navigate("/")
      toast.success('Note Deleted Successfully')
    } catch (error) {
      console.log('Error in Handling Delete',error);
      toast.error("Failed to delete note")      
    }
  }

  const handleSave = async (e) => {  
    e.preventDefault()

    if(!note.title.trim() || !note.content.trim()){
      toast.error('Please add a Title or a Content');
      return
    }
    setSaving(true)

    try {
        await api.put(`/notes/${id}`, note)
        toast.success('Note Edited Successfully!')
        navigate("/")
       } 
     catch (error) {
      console.log(error);
      toast.error('Failed to Edit Note')
     } finally{
      setSaving(false)
    }
    
  }

   
  return (
    <div>
      <Navbar/>
              <div className="min-h-screen ">
      <div className="container mx-auto  px-4 py-8">
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to={"/"} className="btn btn-ghost shadow rounded-full ">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <button className="btn rounded-full btn-error btn-outline" onClick={(e) => handleDelete(e, note._id)}> 
            <Trash2Icon/>
            Delete Note
          </button>
        </div>

        <div className="card shadow-xl rounded-md">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>
              <form onSubmit={handleSave} >
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) => setNote({...note, title:e.target.value})}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={(e) => setNote({...note, content:e.target.value})}

                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary rounded-full text-white" disabled={saving}>
                    {saving ? "Updating..." : "Update Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
  )
}

export default NoteDetailPage