import React, { useState, useEffect } from 'react';
import noteService from './services/notes';
import Form from './components/Form';
import Note from './components/Note';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNoteText, setNewNoteText] = useState('');
	const [showAll, setShowAll] = useState(true);
	const notesToShow = showAll ? notes : notes.filter((notes) => notes.important);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	const addNote = (event) => {
		event.preventDefault();
		let noteObject = {
			content: newNoteText,
			date: new Date().toISOString(),
			important: Math.random() < 0.5
		};
		noteService.create(noteObject).then((returnedNote) => {
			setNotes([...notes, returnedNote]);
			setNewNoteText('');
		});
	};

	const handleInputChange = ({ target }) => {
		setNewNoteText(target.value);
	};

	const toggleImportanceOf = (id) => {
		const note = notes.find((note) => note.id === id);
		const changeNote = { ...note, important: !note.important };

		noteService
			.update(id, changeNote)
			.then((updatedNote) => {
				setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
			})
			.catch((err) => {
				console.log(err);
				alert(`Note '${note.content}' does not exist.`);
				setNotes(notes.filter((note) => note.id !== id));
			});
	};

	return (
		<div>
			<h1>Notes</h1>
			<button onClick={() => setShowAll(!showAll)}>more/less</button>
			<ul>
				{notesToShow.map((note) => (
					<Note key={note.id} note={note} handleButtonClick={toggleImportanceOf} />
				))}
			</ul>
			<Form inputChange={handleInputChange} inputValue={newNoteText} handleSubmit={addNote} />
		</div>
	);
};

export default App;
