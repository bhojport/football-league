<template>
    <div id="results">
        <h1 class="text-center">Results</h1>
        <dl>
            <div v-for="(result,i) in results" :key="i">
                <dt class="mt-3">{{result.date}}</dt>
                <div class="row" v-for="(team, idx) in result.team" :key="idx">
                    <dd class="col-5" :class="{'text-success': team.scoreA > team.scoreB }">{{team.teamA}} ({{team.scoreA}})</dd>
                    <dd class="col-2">vs</dd>
                    <dd class="col-51" :class="{'text-success': team.scoreB > team.scoreA }">{{team.teamB}} ({{team.scoreB}})</dd>
                </div>
            </div>
        </dl>
        <button @click="fetchResults">Fetch Results</button>
        <dl>
            <div v-for="(value,key) in resultsData" :key="key">
                <dt class="mt-3">{{key}}</dt>
								<div class="row" v-for="(v,i) in value" :key="i">
									<dd class="col-5" :class="{'text-success': v.sc1 > v.sc2}">{{v.tn1}} ({{v.sc1}})</dd>
									<dd class="col-2">vs</dd>
									<dd class="col-5" :class="{'text-success':v.sc2 > v.sc1}">{{v.tn2}} ({{v.sc2}})</dd>
								</div>
            </div>
        </dl>
    </div>
</template>
<script>
export default {
  data: function(){
      return {
        results: [
            {
                date: '12/11/2017',
                team: [
                    {teamA: 'Aston Villa', teamB: 'Manchester Utd', scoreA: 1, scoreB: 3},
                    {teamA: 'Liverpool', teamB: 'Leads', scoreA: 1, scoreB: 1}
                ]
            },
            {
                date: '12/11/2017',
                team: [
                    {teamA: 'Liverpool', teamB: 'Stroke City', scoreA: 4, scoreB: 7},
                    {teamA: 'Mancity', teamB: 'Watford', scoreA: 2, scoreB: 1},
                    {date: '12/10/2017', teamA: 'Everton', teamB: 'Swansea', scoreA: 1, scoreB: 1}
                ]
            }
        ],
        resultsData: []
      }
  },
  methods: {
      fetchResults(){
        this.$http
						.get('https://football-league-c088e.firebaseio.com/results.json')
						.then(response => {
								return response.json();
						}, error => {
								console.log(error);
						})
						.then(results => {
								const resultsArr = [];
								for(let key in results){
										// console.log(results[key]);
										resultsArr.push(results[key]);
								}
							const resData = resultsArr.reduce(function (r, a) {
									r[a.date] = r[a.date] || [];
									r[a.date].push(a);
									return r;
							}, Object.create(null));
							this.resultsData = resData;
						});
    }
  }
}
</script>