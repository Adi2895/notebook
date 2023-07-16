import React , {useContext } from 'react'
import noteContext from '../context/noteContext';
import { useParams } from 'react-router-dom'

export default function Showcontent() {
  const {id} = useParams();
  const context = useContext(noteContext);
    const { notes} = context;
    const note = notes.find((note) => note._id === id);
  return (
    <>
    <div className=''>
      <h1>Title:</h1>
      <h1>
    
        {note.title}
        </h1>
    <h1 className='mb-2'>Description</h1>
    <br/>
    <div >
      <p>{note.description}</p>
      </div>
                </div>
      </>
     )
}
