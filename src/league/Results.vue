<template>
    <div id="results">
        <h1 class="text-center">Results</h1>
        <dl>
            <div v-for="(value,key) in dbResults" :key="key">
                <dt class="mt-3">{{key}}</dt>
								<div class="row" v-for="(v,i) in value" :key="i" @click="edit(i+1, v)">
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
		resultsData: []
      }
  },
	computed: {
		dbResults(){
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
										resultsArr.push(results[key]);
								}
								const resData = resultsArr.reduce(function (r, a) {
										r[a.date] = r[a.date] || [];
										r[a.date].push(a);
										return r;
								}, Object.create(null));
								this.resultsData = resData;
						});
				return this.resultsData;
    }
	},
	methods: {
		edit(id,data){
			this.$router.push({name: 'EditResult', params: {id: id, data: data}})
		}
	}
}
</script>