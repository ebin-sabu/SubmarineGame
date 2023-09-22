var grid = [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']
];

var userSubCord = [];
var userFuel = 10;
var userScore = 0;
var killScore = 0;
var rounds = 0;
var killerSubsCords = [];
var obsticleCords = [];
var fuelCanCords = [];
var gameStarted = false;
var gameEnded = false;
var dead = false
function setUserSubmarinePosition(cords) {
    usercontent = "⚓️"
    var x = document.getElementById('grid').rows[parseInt(cords[0], 10)].cells;
    x[parseInt(cords[1], 10)].innerHTML = usercontent;
    userSubCord = cords;
}

function clearPosition(cords) {
    content = ''
    var x = document.getElementById('grid').rows[parseInt(cords[0], 10)].cells;
    x[parseInt(cords[1], 10)].innerHTML = content;
}

function setKillerSubmarinePosition(cords) {
    killcontent = "☠️"
    var y = document.getElementById('grid').rows[parseInt(cords[0], 10)].cells;
    y[parseInt(cords[1], 10)].innerHTML = killcontent;
}

function setObsticlePosition(cords) {
    killcontent = "🚫"
    var y = document.getElementById('grid').rows[parseInt(cords[0], 10)].cells;
    y[parseInt(cords[1], 10)].innerHTML = killcontent;
}
function hide() {
    var x = document.getElementById("start");
    x.style.display = "none";
    var y = document.getElementById("reset");
    y.style.display = "block";
}
function updateLabel() {
    var x = document.getElementById("score");
    x.innerHTML = "Score: " + userScore;
    var y = document.getElementById("fuel");
    y.innerHTML = "Fuel Levels: " + userFuel;
    var c = document.getElementById("computerScore");
    c.innerHTML = "Computer Score: " + killScore;
    var r = document.getElementById("rounds");
    r.innerHTML = "Round: " + rounds;
    var z = document.getElementById("info");
    z.innerHTML = "To move the Submarine (⚓️) Press either A,W,S,D. Collect as many points as you can but watch out for the Killer Subs (☠️)."
    if (gameEnded === true) {
        var g = document.getElementById("over");
        g.style.display = "block";
        z.innerHTML = "Game is Over, Thanks for Playing my Submarine Game. Hope you had loads of fun."
        var w = document.getElementById("outcome")
        if (dead === true) {
            w.innerHTML = "Computer Wins"
            return;
        }
        if (userScore > killScore && dead === false) {
            w.innerHTML = "You Have Won"
            return;
        }
        if (userScore < killScore) {
            w.innerHTML = "Computer Wins"
            return;
        }
        if (userScore === killScore && (killerSubsCords[0] != null)) {
            w.innerHTML = "It's a Draw"
        }
        else {
            w.innerHTML = "You Have Won"
        }
    }
}

function selectCell(cell) {
    if (gameStarted === true) {
        alert("game has started cannot change positions, restart game if you want too")
    }
    else {
        var row = cell.parentNode.rowIndex;
        var col = cell.cellIndex;
        var value = prompt("Enter value for cell (" + row + "," + col + "):");
        if (value == 'u') {
            var found = false;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (grid[i][j] === value) {
                        found = true;
                    }
                }
            }
            if (found === true) {
                alert("User Sub Already Placed")
            }
            else {
                cell.textContent = value;
                grid[row][col] = value;
                userSubCord = [row, col];
            }
        } else if (value == 'k') {
            cell.textContent = value;
            grid[row][col] = value;
            killerSubsCords.push([row, col])

        } else if (value == 'o') {
            cell.textContent = value;
            grid[row][col] = value;
            obsticleCords.push([row, col])
        } else if (value >= '5' && value <= '9') {
            cell.textContent = value;
            grid[row][col] = value;
            fuelCanCords.push([row, col])
        }
        else if (value != null) {
            alert("value must be u , r , o or number between 5-9");
        }
    }
}

function startGame() {
    if (userSubCord.length === 0) {
        alert("A User sub must be added")
        return;
    }
    else if (userSubCord.length > 0) {
        setUserSubmarinePosition(userSubCord);
    }
    for (i = 0; i < killerSubsCords.length; i++) {
        killcords = [killerSubsCords[i][0], killerSubsCords[i][1]]
        setKillerSubmarinePosition(killcords)
    }
    for (i = 0; i < obsticleCords.length; i++) {
        obsticlecordinate = [obsticleCords[i][0], obsticleCords[i][1]]
        setObsticlePosition(obsticlecordinate)
    }
    if (killerSubsCords[0] === null) {
        gameEnded = true
        hide()
        updateLabel()
        return;
    }
    gameStarted = true;
    hide()
    updateLabel()
}

// Set up event listener for key presses
document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    if (gameStarted === false || gameEnded === true) {
        return;
    }

    switch (event.key) {
        case "a":
            moveUser("a");
            break;
        case "d":
            moveUser("d");
            break;
        case "w":
            moveUser("w");
            break;
        case "s":
            moveUser("s");
            break;
        default:
            break;
    }

    event.preventDefault();
});

function moveUser(direction) {
    // Get the current user submarine position
    let currentUserSubPos = userSubCord;
    let newUserSubPos;
    console.log(rounds);

    // Calculate the new user submarine position based on the direction
    switch (direction) {
        case "a":
            newUserSubPos = [currentUserSubPos[0], currentUserSubPos[1] - 1];
            break;
        case "d":
            newUserSubPos = [currentUserSubPos[0], currentUserSubPos[1] + 1];
            break;
        case "w":
            newUserSubPos = [currentUserSubPos[0] - 1, currentUserSubPos[1]];
            break;
        case "s":
            newUserSubPos = [currentUserSubPos[0] + 1, currentUserSubPos[1]];
            break;
        default:
            alert("Invalid direction. Please enter 'a', 'd', 'w', or 's'.");
            return;
    }

    // Check if the new position is out of bounds
    if (newUserSubPos[0] < 0 || newUserSubPos[0] > 9 ||
        newUserSubPos[1] < 0 || newUserSubPos[1] > 9) {
        alert("Cannot move outside the grid.");
        return;
    }

    // Check if the new position is occupied by an obstacle
    if (grid[newUserSubPos[0]][newUserSubPos[1]] === "o") {
        alert("Cannot move to a cell occupied by an obstacle.");
        return;
    }

    // Check if the user has enough fuel to make the move
    if (userFuel === 0) {
        gameEnded = true;
        rounds = rounds + 1
        updateLabel()
        alert("Game Over: Out of fuel");
        endGame()
        return;
    }
    let cellValue = grid[newUserSubPos[0]][newUserSubPos[1]];
    if (cellValue >= 5 && cellValue <= 9) {
        // Update the user's fuel and score
        userFuel += parseInt(cellValue);
        userScore += parseInt(cellValue);
        for (i = 0; i < fuelCanCords.length; i++) {
            row = fuelCanCords[i][0]
            col = fuelCanCords[i][1]
            if ((row === newUserSubPos[0]) && (col === newUserSubPos[1])) {
                fuelCanCords.splice(i, 1)
            }
        }
        updateLabel()
    }

    // Check if the new position contains a killer submarine
    if (cellValue === "k") {
        rounds = rounds + 1
        dead = true;
        endGame();
        return;
    }

    // Update the grid and move the user submarine
    grid[currentUserSubPos[0]][currentUserSubPos[1]] = '';
    clearPosition(currentUserSubPos)
    grid[newUserSubPos[0]][newUserSubPos[1]] = "u";
    setUserSubmarinePosition(newUserSubPos)
    rounds = rounds + 1

    // Decrement the user's fuel and update the status
    console.log(rounds)
    userFuel--;
    updateLabel()
    moveKillerSub()
}

function moveKillerSub() {
    for (let i = 0; i < killerSubsCords.length; i++) {
        let sub = [killerSubsCords[i][0], killerSubsCords[i][1]]
        let subRow = sub[0]
        let subCol = sub[1]
        let index = i
        var canMove = false;
        let EmptyCellCords = []

        // Check if user's submarine is adjacent to killer submarine
        for (let r = Math.max(0, subRow - 1); r <= Math.min(9, subRow + 1); r++) {
            for (let c = Math.max(0, subCol - 1); c <= Math.min(9, subCol + 1); c++) {
                //console.log(grid[subRow][subCol])
                if (r == subRow && c == subCol) {
                    continue; // Skip current cell (contains killer submarine)
                }
                let cell = grid[r][c];
                if (cell === "u") {
                    // User's submarine is adjacent
                    clearPosition(sub)
                    killerSubsCords.splice(index, 1)
                    killerSubsCords.push([r, c])
                    grid[subRow][subCol] = ''
                    grid[r][c] = "k"
                    setKillerSubmarinePosition([r, c])
                    dead = true
                    alert("Game Over! Killer Submarine destroyed your submarine.")
                    updateLabel()
                    canMove = false
                    endGame()
                    return;
                }
                if (cell === 'o' || cell === 'k') {
                    // Obstacle in the way, cannot move to this cell
                    continue;
                }
                if (cell >= 5 && cell <= 9) {
                    // Fuel can is near by
                    for (i = 0; i < fuelCanCords.length; i++) {
                        row = fuelCanCords[i][0]
                        col = fuelCanCords[i][1]
                        if ((row === r) && (col === c)) {
                            fuelCanCords.splice(i, 1)
                        }
                    }
                    clearPosition(sub)
                    killerSubsCords.splice(index, 1)
                    killerSubsCords.push([r, c])
                    grid[subRow][subCol] = ''
                    grid[r][c] = "k"
                    alert("Killer sub stole points")
                    setKillerSubmarinePosition([r, c])
                    killScore += parseInt(cell)
                    updateLabel()
                    canMove = false
                    return;
                }
                else {
                    // Empty cell, move the killer submarine to that cell
                    EmptyCellCords.push([r, c])
                    canMove = true
                    continue;
                }

            }
        }
        if (canMove === true) {
            randomMove = EmptyCellCords[Math.floor(Math.random() * EmptyCellCords.length)]
            clearPosition(sub)
            killerSubsCords.splice(index, 1)
            killerSubsCords.push(randomMove)
            grid[subRow][subCol] = ''
            grid[randomMove[0]][randomMove[1]] = "k"
            setKillerSubmarinePosition(randomMove)
            continue;
        }
        if (canMove === false) {
            continue;
        }
    }
}
function endGame() {
    gameEnded = true;
    updateLabel()

}