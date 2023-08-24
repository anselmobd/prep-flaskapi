app.component('people-list', {
  props: [
    'people'
  ],
  emits: ['person-update'],
  template:
    /*html*/
    `
    <div class="person-create-card">
      <person-create :people="people"></person-create>
    </div>
    <div class="people-list">
      <person-content
        v-for="person in people"
        :key="person.id"
        :person="person"
        @person-update="(x) => $emit('person-update', x)"
      />
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
