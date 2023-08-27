const app = Vue.createApp({
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
      person = this.people.find(a => a.id === value.id);
      for(const key in value)
        person[key] = value[key];
    },
    personDelete(id) {
      index = this.people.findIndex(a => a.id === id);
      this.people.splice(index, 1);
    }
  }
})