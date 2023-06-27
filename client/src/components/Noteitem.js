import React , {useContext}from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note , updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i onClick={()=>deleteNote(note._id)} className="fa-solid fa-trash-can-arrow-up mx-2 my-1"> </i>
                        <i onClick={()=>updateNote(note)} className="fa-solid fa-pen-fancy mx-2 my-1"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
export default Noteitem
