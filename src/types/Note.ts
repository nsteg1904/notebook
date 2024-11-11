// This interface defines the shape of a note object.
interface Note {
    id: string,
    title: string,
    description: string,
    date: Date,
    icon: string
}

export default Note;