<template>
    <div id="league">
        <h1 class="text-center">League Table</h1>
				<table class="table table-striped">
					<thead>
							<tr>
									<th scope="col">Pos</th>
									<th scope="col">Team v t e</th>
									<th scope="col">Pld</th>
									<th scope="col">W</th>
									<th scope="col">D</th>
									<th scope="col">L</th>
									<th scope="col">Pts</th>
							</tr>
					</thead>
					<tbody>
							<tr v-for="(value,key) in dbResults" :key="key">
									<th scope="row">{{key+1}}</th>
									<td>{{value.team}}</td>
									<td>{{value.win+value.draw+value.loss}}</td>
									<td>{{value.win}}</td>
									<td>{{value.draw}}</td>
									<td>{{value.loss}}</td>
									<td>{{value.win*3+value.draw}}</td>
							</tr>
					</tbody>
				</table>
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
						.get('https://football-league-c088e.firebaseio.com/league.json')
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
								let resData = Object.values(resultsArr.reduce((h,o)=>(h[o.team]=h[o.team]||{draw:0,loss:0,win:0,team:o.team},['loss','draw','win'].forEach(k=>h[o.team][k]+=o[k]),h),{}));
								this.resultsData = resData;
						});
				return this.resultsData;
    }
	}
}
</script>