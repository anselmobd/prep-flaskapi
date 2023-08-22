app.component('note-list', {
  props: [
    'notes'
  ],
  template:
    /*html*/
    `
    <li class="note-card" v-for="note in notes" :data-note-id="note.id">
      <div class="note-content">{{ note.content }}</div>
    </li>
    `,
  data() {
    return {}
  },
  methods: {
  },
  computed: {
  }
})
