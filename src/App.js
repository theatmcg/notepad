import React from 'react';
import './App.css';
import NewNoteForm from './NewNoteForm.js';
import Note from './Note.js';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			notes: [],
			import: false
		}

		this.addNote = this.addNote.bind(this);
		this.getNotes = this.getNotes.bind(this);
		this.downloadNotes = this.downloadNotes.bind(this);
	}

	addNote(newNote) {
		let notes = this.state.notes.slice();
		notes.push(newNote);

		this.setState({
			notes: notes
		})
	}

	getNotes() {
		if (document.getElementById("note-file").files[0]) {
			let file = document.getElementById("note-file").files[0];
			let reader = new FileReader();
			reader.readAsText(file);

			let fileArray;
			let formattedArray = [];

			reader.onload = () => {
				fileArray = reader.result.toString().split("\r\n\r\n");

				for (const i in fileArray) {
					let noteArray = fileArray[i].split("\r\n");

					let obj = {
						noteTitle: noteArray[1],
						noteDescription: noteArray[2],
						date: noteArray[0]
					}

					formattedArray.push(obj);

					this.setState({
						notes: formattedArray
					})
				}
			}
		}
	}

	downloadNotes() {
		let fileName = "notesList";
		let notes = this.state.notes.slice();
		let fileString = "";
		
		for (const i in notes) {
			if (i == 0) {
				let obj =  + notes[i].date + "\r\n" + notes[i].noteTitle + "\r\n" + notes[i].noteDescription + "\r\n\r\n";
				fileString += obj;
			}
			let obj = notes[i].date + "\r\n" + notes[i].noteTitle + "\r\n" + notes[i].noteDescription;
			fileString += obj;
		}

		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileString));
		element.setAttribute('download', fileName);
	  
		element.style.display = 'none';
		document.body.appendChild(element);
	  
		element.click();
	  
		document.body.removeChild(element);
	}

	render() {
		return (
			<section className="section">
				<div className="container is-fluid">
					<div className="columns">
						<div className="column is-half is-offset-one-quarter">
							<h1 className="title" style={{ color: "white" }}>Notepad</h1>

							<NewNoteForm addNote={this.addNote} getNotes={this.getNotes} />

							<div className="file my-3">
								<label className="file-label">
									<input onChange={this.getNotes} id="note-file" className="file-input" type="file" name="resume" />
									<span className="file-cta">
									<span className="file-icon">
										<i className="fas fa-upload"></i>
									</span>
									<span className="file-label">
										Choose a file…
									</span>
									</span>
								</label>
								<label className="file-label ml-3">
									<button className="button" onClick={this.downloadNotes}>
										<span className="file-icon">
											<i className="fas fa-download"></i>
										</span>
										Download Notes	
									</button>
								</label>
							</div>

							<div className="my-5">
								{this.state.notes.map((note, index) => (
									<>
										<Note note={note} />
									</>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default App;
