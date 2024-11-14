import { defineStore } from "pinia";
import Note from "@/types/Note";
import { getNotesListener, addNote, editNote, deleteNote } from "@/firebase/firestoreNotesService";

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

        // Stop listening to notes from the database
        stopListening() {
            if (this.unsubscribe) {
                this.unsubscribe();
                this.unsubscribe = null;
            }
        },

        // Create a new note
        createNote(note: Note) {
            addNote(note);
        },

        // Update the note with the given id
        editNote(revisedNote: Note, noteId: string) {
            editNote(revisedNote, noteId);
        },

        // Delete the note with the given id
        deleteNote(id: string) {
            deleteNote(id);
        },
  
    }
});