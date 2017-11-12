<template>
    <div id="new-result">
        <h1 class="text-center">New Result</h1>
<form>
    <div class="row">
        <div class="col form-group">
            <label for="team-a">Team Name</label>
            <input type="text" id="team-a" class="form-control" placeholder="Enter team name...">
        </div>
        <div class="col form-group">
        <label for="team-b">Team Name</label>
            <input type="text" id="team-b" class="form-control" placeholder="Enter team name...">
        </div>
    </div>
    <div class="row">
        <div class="col form-group">
            <label for="score-a">Score</label>
            <input type="number" min="0" id="score-a" class="form-control" placeholder="Enter score...">
        </div>
        <div class="col form-group">
        <label for="score-b">Score</label>
            <input type="number" min="0" id="score-b" class="form-control" placeholder="Enter score...">
        </div>
    </div>
    <div class="row">
        <div class="col-6 form-group">
            <label for="date">Date</label>
            <input type="date" id="date" class="form-control">
        </div>
    </div>
    <div class="row justify-content-center">
        <button type="submit" class="btn btn-primary">Enter Result</button>
    </div>
</form>
    </div>
</template>