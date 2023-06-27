import React , {useContext , useState}from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {

    const context = useContext(noteContext);
    const {addNote} = context;
    
    const[note , setNote] = useState({title:"", description:"", tag:""})
    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value })
    }

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag); 
        setNote({title:"", description:"", tag:""})        
    }

    return (
        <>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form className="my-2">
                    <div className="form-group my-3">
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={onChange} className="form-control" 
                        id="title" name="title" value={note.title} aria-describedby="emailHelp" placeholder="Enter title" required />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="desc">Description</label>
                        <input type="text" onChange={onChange} className="form-control"
                        id="description" name="description"value={note.description} placeholder="Write description about the title"required/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" onChange={onChange} className="form-control"
                        id="tag" name="tag" value={note.tag} placeholder="Tag" required/>
                    </div>
                    <button disabled={note.title.length < 2 || note.description.length < 5} type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </>
    )
}
export default AddNote


