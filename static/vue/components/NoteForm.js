app.component('note-form', {
  props: [
    'person'
  ],
  template:
    /*html*/
    `
    <form @submit.prevent="onSubmit">
      <label for="content"><span>Note</span></label>
      <input v-model="content" id="content" type="text"/>
      <button type="submit">✨ Create Note</button>
    </form>
    `,
  data() {
    return {
      content: ''
    }
  },
  methods: {
    onSubmit() {
      let newNote = {
        person_id: this.person.id.toString(),
        content: this.content
      }
      // this.$emit('note-submitted', newNote)
      axios.post('http://localhost:5000/api/notes', newNote)
      .then(response => {
          note = response.data;
          this.person.notes.unshift(note);
      })
      .catch(error => {
          console.error('Erro ao obter people via API:', error);
      });

      this.content = ''
    }
  },
  computed: {
  }
})
