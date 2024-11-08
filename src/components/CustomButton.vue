<template>
    <button>{{ props.text }}</button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    text: { type: String, required: true }
});

</script>

<style scoped>

button {
    background-color: #1a80e6;
    border: none;
    font: inherit;
    font-size: 1.2em;
    color: inherit;
    cursor: pointer;
    padding: 0.35rem 0.7rem;
    border-radius: 0.8rem;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3); 
}

</style>