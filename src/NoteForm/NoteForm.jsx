import React, { Component} from 'react';
import './NoteForm.css';

class NoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newNoteContent: '',
    };
    this.writeNote = this.writeNote.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  //When user input changes, newNoteContent = text in input box
  handleUserInput(e){
    this.setState({
          newNoteContent: e.target.value, //Value of text input
      })
  }

  writeNote(){

    //call a method which sets a content of the note
    this.props.addNote(this.state.newNoteContent);

    //set newNoteContent back to an empty string
    this.setState({
        newNoteContent:'',
    })
  }

  render(){
    return(
      <div className="formWrapper">
        <input className="noteInput"
          onChange={this.handleUserInput}
          value={this.state.newNoteContent} placeholder="Write a new note.." />
        <button className="noteButton"
          onClick={this.writeNote}>+</button>
      </div>
    )
  }
}
export default NoteForm;
