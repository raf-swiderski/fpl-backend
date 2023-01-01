function sortTeamByPosition(myTeamData) {
    myTeamData.sort((a, b) => (a.element_type < b.element_type) ? -1 : 1)
};

function sortPlayers(allPlayers, sortBy) {  
    return allPlayers.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1)
};

function addTeamNamesToAllPlayers(allPlayers, bootstrapTeamData) {
    allPlayers.forEach((player) => {

        for (let i = 0; i < bootstrapTeamData.length; i++) {
            if (bootstrapTeamData[i].code === player.team_code) {
                player.team_name = bootstrapTeamData[i].name
            }
        }
    })
    return allPlayers
};

function getCurrentGW(events) {
    var string
    events.forEach(week => {
        if (week.is_current) { string = week.id.toString() }
    });
    return string
};

function formatPlayerPricing(allPlayers, property) {
    allPlayers.forEach(player => {
        player[property] = player[property] / 10
        if (Number.isInteger(player[property])) {
            player[property] = parseFloat(player[property]).toFixed(1);
        }
    });
};

/* True Value */

function addTrueValueProperty(allPlayers) {

    const goalkeeperMinCost = findMinCost(1, allPlayers);
    const defenderMinCost = findMinCost(2, allPlayers);
    const midfielderMinCost = findMinCost(3, allPlayers);
    const forwardMinCost = findMinCost(4, allPlayers);

    const trueBudget = calulateTrueBudget(goalkeeperMinCost, defenderMinCost, midfielderMinCost, forwardMinCost)

    allPlayers.forEach(player => {
        player.true_budget = trueBudget

        switch (player.element_type) {
            case 1:
                player.true_value = player.now_cost - goalkeeperMinCost
                break;
            case 2:
                player.true_value = player.now_cost - defenderMinCost
                break;
            case 3:
                player.true_value = player.now_cost - midfielderMinCost
                break;
            case 4:
                player.true_value = player.now_cost - forwardMinCost
                break;
        }
    
    });
    return allPlayers
}

function calulateTrueBudget(goalkeeperMinCost, defenderMinCost, midfielderMinCost, forwardMinCost) {
    const goalkeepers = goalkeeperMinCost * 2
    const defenders = defenderMinCost * 5
    const midfielders = midfielderMinCost * 5
    const forwards = forwardMinCost * 3

    let trueBudget = (goalkeepers + defenders + midfielders + forwards) / 10
    if (Number.isInteger(trueBudget)) {
        trueBudget = parseFloat(trueBudget).toFixed(1);
    }
    return trueBudget
}

function getLowestNowCost(arr) {
    arr.sort((a, b) => a.now_cost - b.now_cost);
    return arr[0].now_cost;
}

function findMinCost(element_type, allPlayers) { /* element type = position */
    let playersOfCertainPosition = filterByElementType(allPlayers, element_type) /* getting all players of a certain position e.g. Defenders */
    let minCost = getLowestNowCost(playersOfCertainPosition) /* Gets the lowest player value of a certain position */
    return minCost
}

function filterByElementType(allPlayers, elementType) {
    return allPlayers.filter((player) => player.element_type === elementType);
}

function addTheInTeamProperty(allPlayers) {
    allPlayers.forEach(player => {
       player.in_team = false
    });
    return allPlayers
}

module.exports = {
    addTeamNamesToAllPlayers,
    addTrueValueProperty,
    sortTeamByPosition,
    getCurrentGW,
    formatPlayerPricing,
    sortPlayers, 
    addTheInTeamProperty
};