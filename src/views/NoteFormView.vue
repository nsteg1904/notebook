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
import { ref } from 'vue';
import { useNoteStore } from '@/stores/NoteStore';
import { useRouter } from 'vue-router';
import CustomButton from '@/components/CustomButton.vue';
import Note from '@/types/Note';

const title = ref<string>('');
const description = ref<string>('');

const noteStore = useNoteStore();

const router = useRouter();

const generateUniqueId = (): number => Math.floor(Date.now() * 1000)

const saveNote = () => {
    if(title.value !== '' || description.value !== ''){
        const newNode: Note = {
            id: generateUniqueId(),
            date: new Date(Date.now()),
            icon: 'check_box',
            title: title.value,
            description: description.value
        }
    
        noteStore.createNote(newNode);
        router.push('/');
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
    font-weight: 1.1em;
}

input:focus, textarea:focus {
    outline: none;
    border: solid #1a80e6
}

textarea {
    resize: vertical;
    height: 8rem;
}

form div {
    display: flex;
    flex-direction: column;
}
</style>