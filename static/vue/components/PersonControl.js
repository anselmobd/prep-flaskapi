app.component('person-control', {
  props: [
    'person'
  ],
  emits: [
    'person-update',
    'person-delete',
    'person-content-hidden'
  ],
  template:
    /*html*/
    `
    <div :class="['person-control-card', {editing: editing}]">
      <a :class="['button', 'toggle-control', {hidden: editing}]" @click="handleEditClick">✍️ Edit</a>
      <div :class="['person-control', {hidden: !editing}]">
        <form @submit.prevent="onSubmit">
          <label for="fname"><span>First Name</span><span class="input-error">{{ error.fname }}</span></label>
          <input v-model.trim="fname" id="fname" type="text"/>

          <label for="lname"><span>Last Name</span><span class="input-error">{{ error.lname }}</span></label>
          <input v-model.trim="lname" id="lname" type="text"/>

          <button name="update" type="submit">💫 Update Person</button>
          <hr />
          <button @click="handleCancelClick">👈 Cancel</button><span>&nbsp;</span>
          <button name="delete" type="submit">❌ Delete Person</button>
        </form>
      </div>
    </div>
    `,
  data() {
    return {
      editing: false,
      fname: '',
      lname: '',
      error: {
        fname: '',
        lname: '',
      }
    }
  },
  methods: {
    onSubmit(event) {
      action = event.submitter.name;
      if (action == 'update') {
        this.onUpdate(event);
      } else {
        this.onDelete(event);
      }
    },
    cleanError() {
      for(const key in this.error)
        this.error[key] = "";
    },
    onUpdate(event) {
      this.cleanError();

      let editPerson = {
        fname: this.fname,
        lname: this.lname
      }
      axios.put('http://localhost:5000/api/people/'+this.person.id, editPerson)
      .then(response => {
        this.$emit('person-update', response.data);
        this.handleCancelClick(event);
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
    },
    onDelete(event) {
      if (window.confirm("Do you really want to remove this person?")) {
        axios.delete('http://localhost:5000/api/people/'+this.person.id)
        .then(response => {
          this.$emit('person-delete', response.data.id);
          this.handleCancelClick(event);
        })
        .catch(error => {
          console.error('Error deleting person via API:', error);
        });
      }
    },
    handleEditClick(event) {
      event.preventDefault();
      this.fname = this.person.fname;
      this.lname = this.person.lname;
      this.editing = true;
      this.$emit('person-content-hidden', true);
    },
    handleCancelClick(event) {
      event.preventDefault();
      this.editing = false;
      this.$emit('person-content-hidden', false);
    }
  },
  computed: {
  }
})
