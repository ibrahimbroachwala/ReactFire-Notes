import React, { Component } from 'react';
import './App.css';
import Note from './Notes/Note';
import NoteForm from './NoteForm/NoteForm';
import { db_config } from './config/config';
import firebase from 'firebase/app';
import database from 'firebase';

class App extends Component {

  constructor(props){
    super(props);

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.app = firebase.initializeApp(db_config);
    this.db = this.app.database().ref().child('Notes');

    //Setting up react state of our component
    this.state = {
      notes: [],
    }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    //datasnapdhot
    this.db.on("child_added",snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.db.on('child_removed', snap =>{
      for(var i=0; i<previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i,1);
        }
      }
      this.setState({
        notes: previousNotes
      })
    })

  }

  addNote(note){
    this.db.push().set({
      noteContent: note
    });
  }

  removeNote(noteId){
    this.db.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">
            <h1><span className="React">React</span><span className="Fire">Fire</span> Notes</h1>
          </div>
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent}
                  noteId={note.id}
                  key={note.id}
                  removeNote={this.removeNote}/>
              )
            })
          }
        </div>
        <div className="notesFooter">
          <div className="formWrapper">
            <NoteForm addNote={this.addNote}/>
          </div>;
        </div>
      </div>
    );
  }
}

export default App;
