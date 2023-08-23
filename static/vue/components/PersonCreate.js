app.component('person-create', {
  props: [
    'people'
  ],
  template:
    /*html*/
    `
    <form @submit.prevent="onSubmit">
      <label for="fname"><span>First Name</span><span class="input-error">{{ error.fname }}</span></label>
      <input v-model="fname" id="fname" type="text"/>

      <label for="lname"><span>Last Name</span><span class="input-error">{{ error.lname }}</span></label>
      <input v-model="lname" id="lname" type="text"/>

      <button type="submit">✨ Create Person</button>
    </form>
    `,
  data() {
    return {
      fname: '',
      lname: '',
      error: {
        fname: '',
        lname: '',
      }
    }
  },
  methods: {
    onSubmit() {
      for(const key in this.error)
        this.error[key] = "";
      let newPerson = {
        fname: this.fname,
        lname: this.lname
      }
      axios.post('http://localhost:5000/api/people', newPerson)
      .then(response => {
        person = response.data;
        this.people.push(person);
        this.fname = ''
        this.lname = ''
      })
      .catch(error => {
        e_data = error.response.data
        if (e_data.status == 400) {
          detail = JSON.parse(e_data.detail);
          for (const [key, value] of Object.entries(detail)) {
            this.error[key] = value.join('; ');
          }
        } else {
          console.error('Error persisting person via API:', error);
        }
      });
    }
  },
  computed: {
  }
})
