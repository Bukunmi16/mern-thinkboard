import mongoose from "mongoose"

// 1 - create a schema for the Node model
// 2 - define the schema fields and their types
// 3 - create the Node model using the schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Note = mongoose.model('Note', noteSchema);

export default Note;