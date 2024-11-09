import { defineStore } from "pinia";
import Note from "@/types/Note";

export const useNoteStore = defineStore('notebookStore', {
    state: () => ({
        notes: JSON.parse(localStorage.getItem('notes') || '[]').map((note: any) => ({
            ...note,
            date: new Date(note.date) // Convert string date back to Date object
        })) as Note[]
    }),
    getters: {
        totalCount: state => state.notes.length,
        getNoteById: state => (id: string): Note | undefined => {
            const note = state.notes.find((n) => n.id === id);

            // returns a copy of the original
            return note ? { ...note } : undefined;
        }
    },
    actions: {
        createNote(note: Note) {
            this.notes.push(note);
            this.saveNotes();
        },
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
        deleteNote(id: string) {
            this.notes = this.notes.filter(n => n.id !== id);
            this.saveNotes();
        },
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        }
    }
});