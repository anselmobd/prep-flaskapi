export default {
  props: [
    'notes'
  ],
  template:
    /*html*/
    `
    <li class="note-card" v-for="note in notes" :key="note.id">
      <div class="note-content">{{ note.content }}</div>
    </li>
    `,
}
