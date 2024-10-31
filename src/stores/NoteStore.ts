import { defineStore } from "pinia";
import Note from "@/types/Note";

const useNotebookStore = defineStore('notebookStore', {
    state: () => ({
        notes: [] as Note[]
    }),
    getters: {
        totalCount: state => state.notes.length,
        getNoteById: state => (id: number): Note | undefined => state.notes.find((n) => n.id === id)
    },
    actions: {
        createNote(note: Note) {
            this.notes.push(note);
        },
        editNote(revisedNote: Note, noteId: number) {
            let note = this.getNoteById(noteId);
            if (note) {
                note = revisedNote;
            }
        },
        deleteNote(id: number) {
            this.notes = this.notes.filter(n => n.id !== id);
        }
    }
});