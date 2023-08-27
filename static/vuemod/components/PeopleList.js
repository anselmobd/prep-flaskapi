export default {
  props: {
    people: Object
  },
  template:
    /*html*/
    `
    <p v-for="person in people" :key="person.id">{{ person.lname }}</p>
    `,
  data() {
    return {}
  }
}
