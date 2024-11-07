<template>
    <div class="icon-picker">
        <div 
            class="icon-button" 
            
        >
            <button @click.prevent="toggleDropdown" :class="{'selected-icon-button': isDropdownVisable}">
                <span>{{isDropdownVisable ? 'Select an Icon' : 'Selected Icon'}} <i class="material-icons-outlined">{{ selectedIcon }}</i></span>
            </button>
        </div>
        <div class="icons" v-if="isDropdownVisable">
            <ul class="icon-list">
                <li v-for="icon in icons" :key="icon"  @click.prevent="changeSelectedIcon(icon)">
                    <i 
                        class="material-icons-outlined"
                        :class="{'selected-icon': icon === selectedIcon}"
                    >{{ icon }}</i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{ selectedIcon: string, icons: string[] }>();
const emit = defineEmits<{ (e: 'changeSelectedIcon', icon: string): void }>();

const isDropdownVisable = ref<boolean>(false);

const toggleDropdown = () => isDropdownVisable.value = !isDropdownVisable.value;

const changeSelectedIcon = (icon: string) => emit('changeSelectedIcon', icon);


</script>

<style scoped>

.selected-icon-button {
    margin-bottom: 0.9rem;
    outline: solid #1a80e6 0.2rem;
    color: #f6f7f7;
}

button {
    width: 15rem;
    cursor: pointer;
    background-color: #233445;
    border: none;
    color: #959da5;
    padding: 0.35rem 0.7rem;
    border-radius: 0.8rem;
    font: inherit
}

button span {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.3rem;
}

i {
    font-size: 2.3em;
    cursor: pointer;
    color: #f6f7f7;
}

.selected-icon{
    outline: solid #1a80e6 0.2rem;
}

.icons {
    background-color: #233445;
    border-radius: 0.8rem;
    padding: 0.1rem;
    outline: solid #1a80e6 0.2rem;

}

.icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(3.5rem, 1fr));
    gap: 0.5rem; 
    margin: 0 auto; 
    padding: 0.5rem;
    max-width: 100%; 
}


ul, li {
    list-style: none;
    padding: 0; 
    margin: 0; 
}

.icon-list li i {
    background-color: #101b23;
    padding: 0.45rem;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); 
}

.icon-list li i:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5); 
    transform: translateY(-2px); 
    transition: all 0.2s ease; 
}



</style>