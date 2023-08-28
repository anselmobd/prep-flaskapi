import axios from 'axios'
import PeopleList from 'vue/components/PeopleList.js'

export default {
  components: {
    PeopleList
  },
  template:
    /*html*/
    `
    <h1>Pessoas e mensagens</h1>
    <people-list
      :people="people"
      @person-update="personUpdate"
      @person-delete="personDelete"
  />
    `,
  data() {
    return {
      people: {}
    }
  },
  mounted() {
    axios.get('http://localhost:5000/api/people')
    .then(response => {
      this.people = response.data;
    })
    .catch(error => {
      console.error('Erro ao obter people via API:', error);
    });
  },
  methods: {
    personUpdate(value) {
      let person = this.people.find(a => a.id === value.id)
      for (const key in value)
        person[key] = value[key];
    },
    personDelete(id) {
      let index = this.people.findIndex(a => a.id === id);
      this.people.splice(index, 1);
    }
  }
}
