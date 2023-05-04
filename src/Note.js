import React from 'react';
import $ from 'jquery';

// set up an accordion instead of current method of displaying data

class Note extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            textarea: null
        }
    }

    render() {
        if (this.props.note.noteDescription == "-" || this.props.note.noteDescription == "") {
            return(
                <div className="note-hover">
                    <ul style={{ listStyle: "disc outside", paddingLeft: "20px" }}>
                        <li className="my-3">
                            <label style={{ color: "white" }}>
                                <span style={{ fontWeight: "bold" }}>{this.props.note.date} -</span> {this.props.note.noteTitle}
                            </label>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return(
                <div className="note-hover my-2"> 
                    <ul style={{ listStyle: "disc outside", paddingLeft: "20px"}}>
                        <li className="my-2">
                            <label style={{ color: "white" }}>
                                <span style={{ fontWeight: "bold" }}>{this.props.note.date} -</span> {this.props.note.noteTitle}
                            </label>
                        </li>
                    </ul>
                    <textarea
                        className="textarea description-textarea"
                        value={this.props.note.noteDescription}
                        style={{
                            backgroundColor: "#1a1c20",
                            borderColor: "grey",
                            color: "white"
                        }}
                        aria-label="note description"
                        disabled
                    />
                </div>
            )   
        }
    }
}

export default Note;