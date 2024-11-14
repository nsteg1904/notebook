<template>
    <!-- note list -->
    <ul>
        <li v-for="note in notes" :key="note.id">
            <note-card 
                :note="note"
            />
        </li>
    </ul>
   

</template>

<script setup lang="ts">
import NoteCard from './NoteCard.vue';
import { useNoteStore} from '@/stores/NoteStore';
import { storeToRefs } from 'pinia';

// Initialize store instance
const noteStore = useNoteStore();

// Get notes from the store
const { notes } = storeToRefs(noteStore);


</script>

<style scoped>

ul, li {
    list-style-type: none;
    padding: 0;
}

</style>