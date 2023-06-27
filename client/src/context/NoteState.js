import { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes);
        //  GET all notes
        const getallnotes = async () => {

            // API CALL:    
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token" : localStorage.getItem('token')
                },                
            });

            const json = await response.json(); 
            setNotes(json);

        }

   

    
    // Add a Note
    const addNote = async (title, description, tag) => {

        // API CALL:

        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}),
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        props.showAlert("Note added Successfully" , "success")
    }



    // Delete a Note
    const deleteNote = async (id) => {
    
        // TODO:API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem('token')
            },                
        });

        // eslint-disable-next-line
        const json = await response.json(); 
        
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
        props.showAlert("Note deleted Successfully" , "success")
    }
    
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        
        // API CALL:
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}),
        });


        // eslint-disable-next-line
        const json = await response.json();
       // eslint-disable-next-line

        // logic to edit in client note
        let newnotes = JSON.parse(JSON.stringify(notes))
        for (var i = 0; i < newnotes.length; i++) {
            const ele = newnotes[i];
            if (ele._id === id) {
                newnotes[i].title = title;
                newnotes[i].description = description;
                newnotes[i].tag = tag;
                break;
            }
        }
        setNotes(newnotes)
        props.showAlert("Note updated Successfully" , "success")
    }
    return (
        <noteContext.Provider value={{ getallnotes, notes, addNote, deleteNote, editNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;