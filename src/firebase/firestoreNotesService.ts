import Note from '@/types/Note';
import { db } from './config';
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Reference to the notes collection in Firestore
const notesCollection = collection(db, 'notes');

// listen to changes in the notes collection
export const getNotesListener = (callback: (notes: Note[]) => void) => {
    const unsubscribe = onSnapshot(notesCollection, snapshot => {
        const notes: Note[] = snapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title as string,
            description: doc.data().description as string,
            date: doc.data().date,
            icon: doc.data().icon as string
        }));

        callback(notes);
    });

    return unsubscribe
}

// Add a new note to the notes collection
export const addNote = (note: Note) => {
    const { id, ...noteWithoutId} = note;
    addDoc(notesCollection, {
        ...noteWithoutId
    });
}

// Update a note in the notes collection
export const editNote = (note: Note, noteId: string) => {
    const { id, ...noteWithoutId} = note;
    updateDoc(doc(db, "notes", noteId), {
        ...noteWithoutId
    });
}

// Delete a note from the notes collection
export const deleteNote = (id: string) => {
    deleteDoc(doc(db, "notes", id));
}
