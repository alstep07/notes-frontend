import React from 'react';

const Form = ({ inputChange, inputValue, handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
			<input type='text' value={inputValue} onChange={inputChange} />
			<button type='submit'>add</button>
		</form>
	);
};

export default Form;
