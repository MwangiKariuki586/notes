import React, { useEffect, useState } from 'react'
import {CiSearch} from "react-icons/ci"
import {MdClose} from 'react-icons/md'
import { Link } from 'react-router-dom'
import {BsPlusLg} from "react-icons/bs"
import NoteItem from "./NoteItem"

const Notes = ({notes}) => {
  const [showSearch,setShowSearch] = useState(false)
  const [text,setText] = useState('')
  const[filterdNotes,setFilteredNotes] = useState(notes)
  const handleSearch = () => {
    setFilteredNotes(notes.filter(note=>{
      if(note.title.toLowerCase().match(text.toLocaleLowerCase())){
        return note;
      }
    }))

  }
  useEffect(handleSearch,[text])
  return (
    <section>
      <header className='notes__header'>
       <Link to={'/create-note'} className="btn add__btn"><BsPlusLg/></Link>
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && <input type="text" value={text} onChange={(e) => {setText(e.target.value);
        handleSearch();}}  autoFocus placeholder='Keyword....'/> }
        <button className="btn" onClick={()=> setShowSearch(prevState => !prevState)}>{showSearch ? <MdClose/>:<CiSearch/>}</button>
        
      </header>
      <div className="notes__container">
        {filterdNotes.length == 0 && <p className='empty__notes'>Note not found</p>}
        {
          filterdNotes.map(note => <NoteItem key={note.id} note={note} />)
        }
      </div>
      
    </section>
  )
}

export default Notes