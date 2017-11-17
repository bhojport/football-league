<template>
    <div id="results">
        <h1 class="text-center">Results</h1>
        <dl>
            <div v-for="(value,key) in dbResults" :key="key">
                <dt class="mt-3">{{key}}</dt>
								<div class="row" v-for="(v,i) in value" :key="i" @click="edit(i+1, v, secretData[i], leagueData[i],leagueData[i+1])">
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
		resultsData: [],
		secretData: [],
		leagueData: []
      }
  },
	computed: {
		dbResults(){
        this.$http
						.get('results.json')
						.then(response => {
								return response.json();
						}, error => {
								console.log(error);
						})
						.then(results => {
								const resultsArr = [];
								const secretKeys = [];
								for(let key in results){
										resultsArr.push(results[key]);
										secretKeys.push(key);
								}
								const resData = resultsArr.reduce(function (r, a) {
										r[a.date] = r[a.date] || [];
										r[a.date].push(a);
										return r;
								}, Object.create(null));
								
								this.resultsData = resData;
								this.secretData = secretKeys;
						});
				this.$http
						.get('league.json')
						.then(response=>{
							return response.json();
						}, error => console.log(error))
						.then(league => {
							const leagueKeys = [];
							for(let key in league){
								leagueKeys.push(key);
							}
							this.leagueData = leagueKeys;
						})
				return this.resultsData;
    }
	},
	methods: {
		edit(id,data,dataKey, team1Key, team2Key){
			this.$router.push({name: 'EditResult', params: {id: id, data: data, dataKey: dataKey, team1Key: team1Key, team2Key: team2Key}})
		}
	}
}
</script>