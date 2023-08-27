import PersonControl from 'vue/components/PersonControl.js'
import NoteForm from 'vue/components/NoteForm.js'
import NoteList from 'vue/components/NoteList.js'

export default {
  components: {
    PersonControl,
    NoteForm,
    NoteList
  },
  props: [
    'person'
  ],
  emits: [
    'person-update',
    'person-delete'
  ],
  template:
    /*html*/
    `
    <div class="person-card" :data-person-id="person.id">
      <person-control
        :person="person"
        @person-content-hidden="personContentHidden"
        @person-update="(x) => $emit('person-update', x)"
        @person-delete="(x) => $emit('person-delete', x)"
      />
      <div class="person-content" v-bind:class="{hidden: editing}">
        <h2>
          <span data-person-fname="{{ person.fname }}">{{ person.fname }}</span><span>&nbsp;</span>
          <span data-person-lname="{{ person.lname }}">{{ person.lname }}</span>
        </h2>
      </div>
      <ul class="note-list">
        <li class="note-create-card">
          <note-form :person="person"></note-form>
        </li>
        <note-list :notes="person.notes"></note-list>
      </ul>
    </div>
    `,
  data() {
    return {
      editing: false
    }
  },
  methods: {
    personContentHidden(value) {
      this.editing = value;
    }
  }
}
