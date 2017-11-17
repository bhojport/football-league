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
		leagueData: [],
		resource: {}
      }
  },
	computed: {
		dbResults(){
			this.resource.get({})
				.then(response => {
					return response.json();
				})
				.then(results =>{
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
				})
			this.resource.getLeague()
				.then(response=>{
							return response.json();
						}, error => console.log(error))
						.then(league => {
							const leagueKeys = [];
							for(let key in league){
								leagueKeys.push(key);
							}
							this.leagueData = leagueKeys;
						});
				return this.resultsData;
	}
	},
	methods: {
		edit(id,data,dataKey, team1Key, team2Key){
			this.$router.push({name: 'EditResult', params: {id: id, data: data, dataKey: dataKey, team1Key: team1Key, team2Key: team2Key}})
		}
	},
	created(){
		const customActions = {
			getLeague: {
				method: 'GET',
				url: 'league.json'
			}
		}
		this.resource = this.$resource('results.json', {}, customActions);
		/* Bhojendra Note: this.resource.get({}) is used for getting all data
		like that we're passing customActions and we call this.resource.getLeague() for this we
		are passing empty object before we pass customActions in $resource. */
	}
}
</script>