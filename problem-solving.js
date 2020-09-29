//Bai 1
let A1 = [1, 2, "a"];
let A2 = [1, 3, "b"];

function filterOutCommonElement (arrayA, arrayB) {
    let targetArray = [];
    arrayA.forEach(element => {
        if (!arrayB.includes(element)) {
            targetArray.push(element);
        }
    });
    arrayB.forEach(element => {
        if (!arrayA.includes(element)) {
            targetArray.push(element);
        }
    });
    return targetArray;
}
filterOutCommonElement(A1, A2);

//Bai 2
let teams = [
    {
        name: "Team 1",
        points: 50,
        GD: 30
    },
    {
        name: "Team 2",
        points: 60,
        GD: 20
    },
    {
        name: "Team 3",
        points: 50,
        GD: 33
    },
    {
        name: "Team 4",
        points: 40,
        GD: 20
    },
    {
        name: "Team 5",
        points: 55,
        GD: 32
    }
]
function sortingTeams(teamArray) {
    teamArray.sort(
        function(a, b) {          
           if (a.points === b.points) {
              return a.GD - b.GD;
           }
           return a.points < b.points ? 1 : -1;
        });
    let i = 1;
    teamArray.forEach(element => {
        element.position = i;
        i++
    });
    return teamArray;
}
console.log(sortingTeams(teams));