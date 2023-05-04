import React from 'react';

class NewNoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noteTitle: "",
            noteDescription: ""
        }

        this.submitForm = this.submitForm.bind(this);
        this.updateNoteTitle = this.updateNoteTitle.bind(this);
        this.updateNoteDescription = this.updateNoteDescription.bind(this);
        this.getFormattedDate = this.getFormattedDate.bind(this);
    }

    updateNoteTitle(event) {
        this.setState({
            noteTitle: event.target.value
        })
    }

    updateNoteDescription(event) {
        this.setState({
            noteDescription: event.target.value
        })
    }

    submitForm(event) {
        event.preventDefault();
        let noteTitle = this.state.noteTitle;
        let noteDescription = this.state.noteDescription;
        let date = this.getFormattedDate();

        let note = {
            noteTitle: noteTitle,
            noteDescription: noteDescription,
            date: date
        }

        this.props.addNote(note);

        this.setState({
            noteTitle: "",
            noteDescription: ""
        })
    }

    getFormattedDate() {
		let dateObj = new Date();
		let day = dateObj.getDate();
		let month = dateObj.getMonth();
		let year = dateObj.getFullYear();

		if (parseInt(day) < 10) {
			day = "0" + day;
		}

		if (parseInt(month) < 10) {
			month = "0" + month;
		}

		let date = day + ":" + month + ":" + year;
		
		return date;
	}


    render() {
        return(
            <form onSubmit={this.submitForm}>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input
                            className="input"
                            type="text"
                            placeholder="Note title"
                            value={this.state.noteTitle}
                            onChange={this.updateNoteTitle}
                            aria-label="note name" />
                    </div>

                    <div className="control">
                        <input
                            className="button is info"
                            type="submit"
                            value="Add Note" />
                    </div>
                </div>

                <div className="field">
                    <div className="control is-expanded">
                        <textarea
                            className="textarea"
                            placeholder="Note description"
                            aria-label="note description"
                            value={this.state.noteDescription}
                            onChange={this.updateNoteDescription} />
                    </div>
                </div>
            </form>
        )
    }
}

export default NewNoteForm;