import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainView from '@/views/MainView/MainView.vue'
import NoteFormView from '@/views/NoteFormView/NoteFormView.vue'

// Define routes
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Your Notes', component: MainView },
  { path: '/newNote', name: 'New Note', component: NoteFormView },
  { path: '/editNote/:id?', name: 'Edit Note', component: NoteFormView, props: true },
]

// Create router instance
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
