import { defineStore } from "pinia";
import Note from "@/types/Note";
import { getNotesListener } from "@/firebase/firestoreNotesService";

export const useNoteStore = defineStore('notebookStore', {
    state: () => ({
        // Initialize notes from local storage
        notes: [] as Note[],
        unsubscribe: null as (() => void) | null
    
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
        // Start listening to notes from the database
        startListening() {
            this.unsubscribe = getNotesListener((notes: Note[]) => {
                this.notes = notes;
            });
        },

        // Create a new note
        createNote(note: Note) {
            this.notes.push(note);
        },

        // Update the note with the given id
        editNote(revisedNote: Note, noteId: string) {
            const note = this.notes.find((n) => n.id === noteId);

            if (note) {
                note.title = revisedNote.title;
                note.description = revisedNote.description;
                note.date = revisedNote.date;
                note.icon = revisedNote.icon;
            }
        },

        // Delete the note with the given id
        deleteNote(id: string) {
            this.notes = this.notes.filter(n => n.id !== id);
        },
  
    }
});