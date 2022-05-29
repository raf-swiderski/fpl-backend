function sortTeamByPosition(myTeamData) {

    myTeamData.sort((a, b) => (a.element_type < b.element_type) ? -1 : 1)

}

function addTeamNames(myTeamData, bootstrapTeamData) {
    myTeamData.forEach((player) => {

        for (let i = 0; i < bootstrapTeamData.length; i++) {
        
        if (bootstrapTeamData[i].code === player.team_code) {
            player.team_name = bootstrapTeamData[i].name
        }
        }
    })
    return myTeamData
}

function getCurrentGW(events) {
    var string
    events.forEach(week => {
        if (week.is_current) { string = week.id.toString() }
    });
    return string
}

function convertPlayerPricing(myTeamData) {
    myTeamData.forEach(player => {
        player.now_cost = player.now_cost / 10
        if (Number.isInteger(player.now_cost)) {
            player.now_cost = parseFloat(player.now_cost).toFixed(1);
        }
    });
}

module.exports = {
    addTeamNames,
    sortTeamByPosition,
    getCurrentGW,
    convertPlayerPricing
};