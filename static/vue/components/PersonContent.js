app.component('person', {
    props: {
    },
    template:
      /*html*/
      `
      <div class="person-card" data-person-id="{{ person.id }}">
        <div class="person-content">
        <h2>
          <span data-person-fname="{{ person.fname }}">{{ person.fname }}</span>
          <span data-person-lname="{{ person.lname }}">{{ person.lname }}</span>
        </h2>
        </div>
      </div>
      `,
    data() {
      return {
        person: {
            'fname': "Anselmo",
            'lname': "BD",
        },
      }
    },
    methods: {
    },
    computed: {
    }
  })