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
            },
            finishedPostResult: false,
            finishedPostLeagueTeam: false,
            finishedPostLeagueTeam2: false
        };
    },
    methods: {
        submit(){
            // console.log(this.result);
            this.$http
                .post('https://football-league-c088e.firebaseio.com/results.json', this.result)
                .then(response => {
                    console.log(response);
                    this.finishedPostResult = true;
                    if(this.finishedPostResult && this.finishedPostLeagueTeam && this.finishedPostLeagueTeam2){
                        this.$router.push({name:'Results'});
                    }
                }, error => {
                    console.log(error);
                });
            let leagueTeam = {};
						let leagueTeam2 = {};
						// let leagueTable = [];
						leagueTeam.team = this.result.tn1;
						leagueTeam.win = this.result.sc1 > this.result.sc2 ? 1 : 0;
						leagueTeam.loss = this.result.sc1 < this.result.sc2 ? 1 : 0;
						leagueTeam.draw = this.result.sc1 === this.result.sc2 ? 1 : 0;
						leagueTeam2.team = this.result.tn2;
						leagueTeam2.win = this.result.sc2 > this.result.sc1 ? 1 : 0;
						leagueTeam2.loss = this.result.sc2 < this.result.sc1 ? 1 : 0;
						leagueTeam2.draw = this.result.sc2 === this.result.sc1 ? 1 : 0;
						// leagueTable.push(leagueTeam,leagueTeam2);
						this.$http
                .post('https://football-league-c088e.firebaseio.com/league.json', leagueTeam)
                .then(response => {
                    console.log(response);
                    this.finishedPostLeagueTeam = true
                    if(this.finishedPostResult && this.finishedPostLeagueTeam && this.finishedPostLeagueTeam2){
                        this.$router.push({name:'Results'});
                    }
                }, error => {
                    console.log(error);
                });
						this.$http
                .post('https://football-league-c088e.firebaseio.com/league.json', leagueTeam2)
                .then(response => {
                    console.log(response);
                    this.finishedPostLeagueTeam2 = true
                    if(this.finishedPostResult && this.finishedPostLeagueTeam && this.finishedPostLeagueTeam2){
                        this.$router.push({name:'Results'});
                    }
                }, error => {
                    console.log(error);
                });
        }
    }
}
</script>