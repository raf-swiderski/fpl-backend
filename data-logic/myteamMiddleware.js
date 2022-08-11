function sortTeamByPosition(myTeamData) {
    myTeamData.sort((a, b) => (a.element_type < b.element_type) ? -1 : 1)
};

function sortPlayers(allPlayers, sortBy) {  
    return allPlayers.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1)
};

function addTeamNamesToMyTeam(myTeamData, bootstrapTeamData) {
    myTeamData.forEach((player) => {

        for (let i = 0; i < bootstrapTeamData.length; i++) {
            if (bootstrapTeamData[i].code === player.team_code) {
                player.team_name = bootstrapTeamData[i].name
            }
        }
    })
    return myTeamData
};

function getCurrentGW(events) {
    var string
    events.forEach(week => {
        if (week.is_current) { string = week.id.toString() }
    });
    return string
};

function convertPlayerPricing(myTeamData) {
    myTeamData.forEach(player => {
        player.now_cost = player.now_cost / 10
        if (Number.isInteger(player.now_cost)) {
            player.now_cost = parseFloat(player.now_cost).toFixed(1);
        }
    });
};

function reduceFirstNameOfPlayersToOneName(data) {
    data.forEach(player => {
        let firstName = player.first_name
        let array = firstName.split(" ")
        player.first_name = array[0]
    });
};

function addTheInTeamProperty(allPlayers) {
    allPlayers.forEach(player => {
       player.in_team = false
    });
    return allPlayers
}

module.exports = {
    addTeamNamesToMyTeam,
    sortTeamByPosition,
    getCurrentGW,
    convertPlayerPricing,
    reduceFirstNameOfPlayersToOneName,
    sortPlayers, 
    addTheInTeamProperty
};