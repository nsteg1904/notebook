import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainView from '@/views/MainView/MainView.vue'
import NoteFormView from '@/views/NoteFormView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Your Notes', component: MainView },
  { path: '/newNote', name: 'New Note', component: NoteFormView },
  { path: '/editNote', name: 'Edit Note', component: NoteFormView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
