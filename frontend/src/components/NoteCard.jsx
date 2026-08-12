import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const NoteCard = ({note}) => {
  return (
    <Link to={`/notes/${note._id}`} className="card bg-base-100 shadow-2xl hover:shadow-xl transition-all duration-100 rounded-lg border-t-0 hover:border-t-4  border-solid border-primary-content">
      <div className="card-body">
        <h3 className="card-title text-base-content font-bold">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
            {new Date(note.createdAt).toLocaleDateString()}</span>
            <div className="flex items-center gap-2">
                <button className="btn btn-ghost rounded-full btn-xs text-error">
                    <PenSquareIcon size={16} color='royalBlue' />
                </button>
                <button className="btn btn-ghost rounded-full btn-xs text-error">
                    <Trash2Icon size={16}/>
                </button>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard