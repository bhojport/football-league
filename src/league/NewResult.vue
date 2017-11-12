<template>
    <div id="new-result">
        <h1 class="text-center">New Result</h1>
        <form>
            <div class="row">
                <div class="col form-group">
                    <label for="team-a">Team Name</label>
                    <input type="text" id="team-a" class="form-control" placeholder="Enter team name..." v-model="result.tn1">
                </div>
                <div class="col form-group">
                <label for="team-b">Team Name</label>
                    <input type="text" id="team-b" class="form-control" placeholder="Enter team name..." v-model="result.tn2">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label for="score-a">Score</label>
                    <input type="number" min="0" id="score-a" class="form-control" placeholder="Enter score..." v-model="result.sc1">
                </div>
                <div class="col form-group">
                <label for="score-b">Score</label>
                    <input type="number" min="0" id="score-b" class="form-control" placeholder="Enter score..." v-model="result.sc2">
                </div>
            </div>
            <div class="row">
                <div class="col-6 form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" class="form-control" v-model="result.date">
                </div>
            </div>
            <div class="row justify-content-center">
                <button type="submit" class="btn btn-primary" @click.prevent="submit">Enter Result</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            result: {
                tn1: '',
                tn2: '',
                sc1: '',
                sc2: '',
                date: ''
            }
        };
    },
    methods: {
        submit(){
            console.log(this.result);
            this.$http
                .post('https://football-league-c088e.firebaseio.com/results.json', this.result)
                .then(response => {
                    console.log(response);
                }, error => {
                    console.log(error);
                });
        }
    }
}
</script>