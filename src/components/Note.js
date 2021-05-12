import React from 'react';

const Note = ({ note, handleButtonClick }) => {
    const label = note.important ? 'make not important' : 'make important';
    return (
        <div>
           <p>{note.content}</p>
           <button onClick={() => handleButtonClick(note.id)}>{label}</button>
        </div>
    )
}


export default Note;
