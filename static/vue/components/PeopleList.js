app.component('people-list', {
  props: [
    'people'
  ],
  template:
    /*html*/
    `
    <div class="person-create-card">
      <person-create :people="people"></person-create>
    </div>
    <div class="people-list">
      <person-content v-for="person in people" :person="person"></person-content>
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
