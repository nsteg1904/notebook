<template>
    <form action="">
        <div>
            <div class="title">
                <label for="title">Title</label>
                <input 
                    id="title" 
                    type="text"
                    placeholder="Title..."
                    v-model="title"
                >
            </div>
            <div class="description">
                <label for="description">Description</label>
                <textarea
                    id="description" 
                    type="text" 
                    placeholder="Description..."
                    v-model="description"
                ></textarea> 
            </div>
            <CustomButton 
                @click.prevent="saveNote" 
                :text="'Save'"
            />
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import { useNoteStore } from '@/stores/NoteStore';
import { useRouter } from 'vue-router';
import CustomButton from '@/components/CustomButton.vue';
import Note from '@/types/Note';

// Initialize the note store and router
const noteStore = useNoteStore();
const router = useRouter();

// Define component props with optional note ID
const props = defineProps<{id?: string}>();

// Compute the note ID based on props or default to an empty string
const noteId = computed(() => props.id ? props.id : '');

// Compute the current note based on the note ID
const note = computed(() => noteStore.getNoteById(noteId.value));

const title = ref<string>(note.value?.title || '');
const description = ref<string>(note.value?.description || '');

// Generate a unique ID
const generateUniqueId = (): string => crypto.randomUUID();

// Function to save the note, either as a new note or an updated one
const saveNote = () => {

    // Check if title and description are filled out
    if (title.value !== '' && description.value !== ''){

        if(note.value) { // If a note already exists, update it
            const updatedNote: Note = {
                ...note.value,
                title: title.value,
                description: description.value
            }
            noteStore.editNote(updatedNote, noteId.value)

        } else { // If no note exists, create a new one
            const newNode: Note = {
                id: generateUniqueId(), // Generate a unique ID
                date: new Date(Date.now()), // Set the current date
                icon: 'check_box', // Default icon
                title: title.value,
                description: description.value
            }
            noteStore.createNote(newNode); // Create the new note in the store
        }

        router.push('/'); // Navigate back to the main page
        
    } else {
        alert('Please fill in both the Title and Description fields before proceeding!');
    }
}

</script>

<style scoped>

form {
    margin-top: 1rem;
}

label {
    margin-bottom: 0.5rem;
}

input, textarea {
    margin-bottom: 2rem;
    border-radius: 0.8rem;
    background-color: #233445;
    padding: 1rem;
    border: none;
    color: #f6f7f7;
    font-size: 1.1em;
}

input:focus, textarea:focus {
    outline: none;
    border: solid #1a80e6
}

textarea {
    resize: vertical;
    height: 9rem;
}

form div {
    display: flex;
    flex-direction: column;
}
</style>