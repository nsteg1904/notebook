<template>
    <article>
        <div id="icon-container">
            <i class="material-icons-outlined">{{ note.icon }}</i>
        </div>
        <div id="content" @click.prevent="toggleText">
            <h4>{{ note.title }}</h4>
            <p :class="{ showToLines: !isDescriptionExpanded }">{{ note.description }}</p>
        </div>
        <div id="manage">
            <p>{{ formattedDate }}</p>
            <div>
                <i class="material-icons-outlined" @click.prevent="deleteNote">delete</i>
                <i class="material-icons-outlined" @click.prevent="editNote">edit_note</i>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref } from 'vue';
import { useNoteStore } from '@/stores/NoteStore';
import { useRouter } from 'vue-router';
import Note from '@/types/Note';

// Define props for the note object
const props = defineProps({ note: { type: Object as PropType<Note>, required: true } });
const note = ref<Note>(props.note);

// Track whether the description is fully shown or truncated
const isDescriptionExpanded = ref<boolean>(false);

// Initialize store and router instances
const noteStore = useNoteStore();
const router = useRouter();

// Toggle the visibility of the note's description
const toggleText = () => isDescriptionExpanded.value = !isDescriptionExpanded.value;
// Handle deletion of the note
const deleteNote = () => noteStore.deleteNote(note.value.id);
// Navigate to the note edit page
const editNote = () => router.push(`/editNote/${note.value.id}`);

// Format the note's date to a human-readable string
const formattedDate = computed(() => note.value.date.toLocaleDateString("de-DE"));

</script>

<style scoped>
article {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0rem;
}

#content {
    width: 100%;
    margin: 0rem 1rem;
    cursor: pointer;
}

#content h4 {
    margin-bottom: 0.3rem;
}

.showToLines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

#icon-container i {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #233445;
    font-size: 2.3em;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 0.8rem;
}

#manage p {
    font-weight: 600;
    margin-bottom: 0.7rem;
}

#manage div {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

#manage div i {
    font-size: 2em;
    cursor: pointer;
}
</style>