<template>
    <form action="">
        <div>
            <div class="title margin-bottom-2rem">
                <label for="title">Title</label>
                <input 
                    id="title" 
                    type="text"
                    placeholder="Title..."
                    v-model="title"
                >
            </div>
            <div class="description margin-bottom-2rem">
                <label for="description">Description</label>
                <textarea
                    id="description" 
                    type="text" 
                    placeholder="Description..."
                    v-model="description"
                ></textarea> 
            </div>
            <div class="icon-picker margin-bottom-2rem">
                <label>Icon</label>
                <icon-picker 
                    :selected-icon="selectedIcon"
                    :icons="icons"
                    @change-selected-icon="changeSelectedIcon"
                />
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
import IconPicker from './IconPicker.vue';
import Note from '@/types/Note';
import icons from '@/assets/icons.json'; // JSON-Datei mit Icons

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
const selectedIcon = ref<string>(note.value?.icon || icons[0]);

const changeSelectedIcon = (iconName: string) => selectedIcon.value = iconName;

// Generate a unique ID
const generateUniqueId = (): string => crypto.randomUUID();

// Function to save the note, either as a new note or an updated one
const saveNote = () => {

    // Check if title and description are filled out
    if (title.value !== '' && description.value !== ''){

        if(note.value) { // If a note already exists, update it
            const updatedNote: Note = {
                ...note.value,
                icon: selectedIcon.value,
                title: title.value,
                description: description.value
            }
            noteStore.editNote(updatedNote, noteId.value)

        } else { // If no note exists, create a new one
            const newNode: Note = {
                id: generateUniqueId(), // Generate a unique ID
                date: Date.now(), // Set the current date
                icon: selectedIcon.value,
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
    border-radius: 0.8rem;
    background-color: #233445;
    padding: 1rem;
    border: none;
    color: #f6f7f7;
    font: inherit;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3); 
}

input::placeholder, 
textarea::placeholder {
    color: #959da5; 
    opacity: 1; 
}

input:focus, textarea:focus {
    outline: solid #1a80e6 0.2rem
}

textarea {
    resize: vertical;
    height: 8rem; 
    line-height: 1.5; 
}

form div {
    display: flex;
    flex-direction: column;
}


</style>