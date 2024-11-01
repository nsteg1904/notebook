<template>
  <header>
    <div @click.prevent="changeView('/')">
      <i class="material-icons-outlined">event_note</i>
      <h1>Notebook</h1>
    </div>
  </header>
  <main>
    <section id="main">

      <!-- webseite navigation -->
      <nav>
        <h2>{{ $route.name }}</h2>

        <!-- show button only on main page-->
        <custom-button v-if="isOnMainPage" 
          @click.prevent="changeView('/newNote')" 
          :text="'New Note'" 
        />

      </nav>

      <!-- main content of the website -->
      <router-view></router-view>
    </section>
  </main>
</template>

<script setup lang="ts">
import CustomButton from './components/CustomButton.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isOnMainPage = computed(() => route.fullPath === '/');

const changeView = (path: string): void => {
  router.push(path);
}

</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
}

header div {
  width: 15rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

header div i {
  font-size: 3.6rem;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
}

#main {
  width: 60rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>