<template>
    <div id="edit-result">
        <h1 class="text-center">Edit Result</h1>
        <form>
            <div class="row">
                <div class="col form-group">
                    <label for="team-a">Team Name</label>
                    <input type="text" id="team-a" class="form-control" placeholder="Enter team name..." v-model="data.tn1">
                </div>
                <div class="col form-group">
                <label for="team-b">Team Name</label>
                    <input type="text" id="team-b" class="form-control" placeholder="Enter team name..." v-model="data.tn2">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label for="score-a">Score</label>
                    <input type="number" min="0" id="score-a" class="form-control" placeholder="Enter score..." v-model="data.sc1">
                </div>
                <div class="col form-group">
                <label for="score-b">Score</label>
                    <input type="number" min="0" id="score-b" class="form-control" placeholder="Enter score..." v-model="data.sc2">
                </div>
            </div>
            <div class="row">
                <div class="col-6 form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" class="form-control" v-model="data.date">
                </div>
            </div>
            <div class="row justify-content-center">
                <button type="submit" class="btn btn-primary" @click.prevent="submit">Update Result</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            // TODO: Use interceptor and avoid the following http request technique.
            finishedPatchResult: false,
            finishedPatchLeagueTeam: false,
            finishedPatchLeagueTeam2: false
        }
    },
    props: ['data','dataKey','team1Key','team2Key'],
    methods: {
        submit(){
            this.$http
                .patch('results.json', {[this.dataKey]: this.data})
                .then(response => {
                    console.log(response);
                    this.finishedPatchResult = true;
                    if(this.finishedPatchResult && this.finishedPatchLeagueTeam && this.finishedPatchLeagueTeam2) this.$router.push({name:'Results'});
                }, error => {
                    console.log(error);
                });
            let leagueTeam = {};
            let leagueTeam2 = {};
            leagueTeam.team = this.data.tn1;
            leagueTeam.win = this.data.sc1 > this.data.sc2 ? 1 : 0;
            leagueTeam.loss = this.data.sc1 < this.data.sc2 ? 1 : 0;
            leagueTeam.draw = this.data.sc1 === this.data.sc2 ? 1 : 0;
            leagueTeam2.team = this.data.tn2;
            leagueTeam2.win = this.data.sc2 > this.data.sc1 ? 1 : 0;
            leagueTeam2.loss = this.data.sc2 < this.data.sc1 ? 1 : 0;
            leagueTeam2.draw = this.data.sc2 === this.data.sc1 ? 1 : 0;
            this.$http
                .patch('league.json', {[this.team1Key]: leagueTeam})
                .then(response => {
                    console.log(response);
                    this.finishedPatchLeagueTeam = true;
                    if(this.finishedPatchResult && this.finishedPatchLeagueTeam && this.finishedPatchLeagueTeam2) this.$router.push({name:'Results'});
                }, error => {
                    console.log(error);
                });
			this.$http
                .patch('league.json', {[this.team2Key]: leagueTeam2})
                .then(response => {
                    console.log(response);
                    this.finishedPatchLeagueTeam2 = true;
                    if(this.finishedPatchResult && this.finishedPatchLeagueTeam && this.finishedPatchLeagueTeam2) this.$router.push({name:'Results'});
                }, error => {
                    console.log(error);
                });
        }
    }
}
</script>