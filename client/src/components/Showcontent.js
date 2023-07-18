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
      <h1> Here is your detailed note.</h1>
      <h3>Title: {note.title}</h3>
     
    <h2 className='mb-2'>Description</h2>
    <br/>
    <div >
      <p>{note.description}</p>
      </div>
                </div>
      </>
     )
}
