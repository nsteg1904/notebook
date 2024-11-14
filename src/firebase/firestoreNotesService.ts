import Note from '@/types/Note';
import { db } from './config';
import { collection, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';

const notesCollection = collection(db, 'notes');

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

export const addNote = (note: Note) => {
    const { id, ...noteWithoutId} = note;
    addDoc(notesCollection, {
        ...noteWithoutId
    });
}

export const editNote = (note: Note, noteId: string) => {
    const { id, ...noteWithoutId} = note;
    updateDoc(doc(db, "notes", noteId), {
        ...noteWithoutId
    });
}

// export const deleteNote = (id: string) => {

// }
