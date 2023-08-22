const app = Vue.createApp({
    data() {
        return {
            person: {}
        }
    },
    mounted() {
        axios.get('http://localhost:5000/api/people/1')
        .then(response => {
            this.person = response.data;
        })
        .catch(error => {
            console.error('Erro ao obter person via API:', error);
        });
    }
})