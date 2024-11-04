import { defineStore } from "pinia";
import Note from "@/types/Note";

export const useNoteStore = defineStore('notebookStore', {
    state: () => ({
        notes: [
            { id: '1', title: "Cake", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", date: new Date(2042, 9, 31), icon: 'home' },
            { id: '2', title: "Bread", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", date: new Date(2042, 9, 31), icon: 'check_circle' },
            { id: '3', title: "Water", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", date: new Date(2042, 9, 31), icon: 'check_box' },
            { id: '4', title: "Computer", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", date: new Date(2042, 9, 31), icon: 'width_wide' },
        ] as Note[]
    }),
    getters: {
        totalCount: state => state.notes.length,
        // getNoteById: state => (id: string): Note | undefined => state.notes.find((n) => n.id === id)
        getNoteById: state => (id: string): Note | undefined => {
            const note = state.notes.find((n) => n.id === id);

            // returns a copy of the original
            return note ? { ...note } : undefined;
        }
    },
    actions: {
        createNote(note: Note) {
            this.notes.push(note);
        },
        editNote(revisedNote: Note, noteId: string) {
            const note = this.notes.find((n) => n.id === noteId);

            if (note) {
                note.title = revisedNote.title;
                note.description = revisedNote.description;
                note.date = revisedNote.date;
                note.icon = revisedNote.icon;
            }
        },
        deleteNote(id: string) {
            this.notes = this.notes.filter(n => n.id !== id);
        }
    }
});