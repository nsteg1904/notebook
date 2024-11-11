import { defineStore } from "pinia";
import Note from "@/types/Note";

export const useNoteStore = defineStore('notebookStore', {
    state: () => ({
        // Initialize notes from local storage
        notes: JSON.parse(localStorage.getItem('notes') || '[]').map((note: any) => ({
            ...note,
            date: new Date(note.date) // Convert string date back to Date object
        })) as Note[]
    }),
    getters: {
        // Get the total number of notes
        totalCount: state => state.notes.length,

        // Get specific note by id
        getNoteById: state => (id: string): Note | undefined => {
            const note = state.notes.find((n) => n.id === id);

            // returns a copy of the original
            return note ? { ...note } : undefined;
        }
    },
    actions: {
        // Create a new note
        createNote(note: Note) {
            this.notes.push(note);
            this.saveNotes();
        },

        // Update the note with the given id
        editNote(revisedNote: Note, noteId: string) {
            const note = this.notes.find((n) => n.id === noteId);

            if (note) {
                note.title = revisedNote.title;
                note.description = revisedNote.description;
                note.date = revisedNote.date;
                note.icon = revisedNote.icon;
                this.saveNotes();
            }
        },

        // Delete the note with the given id
        deleteNote(id: string) {
            this.notes = this.notes.filter(n => n.id !== id);
            this.saveNotes();
        },

        // Save the notes to local storage
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        }
    }
});