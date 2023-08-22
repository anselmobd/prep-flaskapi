app.component('people-list', {
  props: [
    'people'
  ],
  template:
    /*html*/
    `
    <div class="people-list">
      <person-card v-for="person in people" :person="person"></person-card>
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
