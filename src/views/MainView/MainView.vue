<template>
    <!-- note list -->
    <div v-for="note in notes" :key="note.id">
        <note-card 
            :note="note"
        />
    </div>
   

</template>

<script setup lang="ts">
import NoteCard from './NoteCard.vue';
import { useNoteStore} from '@/stores/NoteStore';
import { storeToRefs } from 'pinia';

// Initialize store instance
const noteStore = useNoteStore();

// Get notes from the store
const { notes } = storeToRefs(noteStore)

</script>

<style scoped>

</style>