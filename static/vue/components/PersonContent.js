app.component('person-card', {
  props: [
    'person'
  ],
  template:
    /*html*/
    `
    <div class="person-card" :data-person-id="person.id">
      <div class="person-content">
        <h2>
          <span data-person-fname="{{ person.fname }}">{{ person.fname }}</span>
          <span data-person-lname="{{ person.lname }}">{{ person.lname }}</span>
        </h2>
      </div>
      <ul class="note-list">
        <note-list :notes="person.notes"></note-list>
      </ul>
    </div>
    `,
  data() {
    return {}
  },
  methods: {
  },
  computed: {
  }
})
