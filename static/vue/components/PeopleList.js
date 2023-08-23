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
      <person-content v-for="person in people" :person="person" @a-person-update="aPersonUpdate"></person-content>
    </div>
    `,
  data() {
    return {}
  },
  methods: {
    aPersonUpdate(value) {
      this.$emit('one-person-update', value);
    }
  },
  computed: {
  }
})
