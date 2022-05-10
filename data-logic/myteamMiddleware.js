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

module.exports = {
    addTeamNames,
    sortTeamByPosition
};