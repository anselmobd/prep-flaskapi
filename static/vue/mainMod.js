import axios from 'axios'
import PeopleListMod from '/static/vue/components/PeopleListMod.js'

export default {
  components: {
    PeopleListMod
  },
  template:
    /*html*/
    `
    <h1>Pessoas e mensagens</h1>
    <people-list-mod
      :people="people"
    ></people-list-mod>
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
      person = this.people.find(a => a.id === value.id)
      for(const key in value)
        person[key] = value[key];
    }
  }
}
