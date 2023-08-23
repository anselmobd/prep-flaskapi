app.component('note-form', {
  props: [
    'person'
  ],
  template:
    /*html*/
    `
    <form @submit.prevent="onSubmit">
      <label for="content"><span>Note</span><span class="input-error">{{ error.content }}</span></label>
      <input v-model="content" id="content" type="text"/>
      <button type="submit">✨ Create Note</button>
    </form>
    `,
  data() {
    return {
      content: '',
      error: {
        'content': ''
      }
    }
  },
  methods: {
    onSubmit() {
      for(const key in this.error)
        this.error[key] = "";
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
        e_data = error.response.data
        if (e_data.status == 400) {
          detail = JSON.parse(e_data.detail);
          for (const [key, value] of Object.entries(detail)) {
            this.error[key] = value.join('; ');
          }
        } else {
          console.error('Error persisting note via API:', error);
        }
      });

      this.content = ''
    }
  },
  computed: {
  }
})
