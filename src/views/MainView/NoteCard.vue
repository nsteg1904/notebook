<template>
    <article>
        <div id="icon-container">
            <i class="material-icons-outlined">{{ note.icon }}</i>
        </div>
        <div id="content">
            <h4>{{ note.title }}</h4>
            <p>{{ note.description }}</p>
        </div>
        <div id="manage">
            <p>{{ convertDate }}</p>
            <div>
                <i class="material-icons-outlined" @click.prevent="noteStore.deleteNote(note.id)">delete</i>
                <i class="material-icons-outlined" @click.prevent="$router.push('/editNote')">edit_note</i>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref } from 'vue';
import { useNoteStore } from '@/stores/NoteStore';
import Note from '@/types/Note';

const props = defineProps({
    note: { type: Object as PropType<Note>, required: true }
});

const note = ref<Note>(props.note);

const noteStore = useNoteStore();

const convertDate = computed(() => note.value.date.toLocaleDateString("de-DE"));

</script>

<style scoped>
article {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0rem;
}

#content {
    margin: 0rem 1rem;
    cursor: pointer;
}

#content h4 {
    margin-bottom: 0.3rem;
}

#content p {
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
    border-radius: 0.6rem;
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