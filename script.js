/*----- constants -----*/
const pots = ['a', 'b', 'c', 'd', 'e', 'f', 'G', 'h', 'i', 'j', 'k', 'l', 'm', 'N']
const p1path = ['a', 'b', 'c', 'd', 'e', 'f', 'G', 'h', 'i', 'j', 'k', 'l', 'm']
const p2path = ['h', 'i', 'j', 'k', 'l', 'm', 'N', 'a', 'b', 'c', 'd', 'e', 'f']
const p1pots = ['a', 'b', 'c', 'd', 'e', 'f']
const p2pots = ['m', 'l', 'k', 'j', 'i', 'h']
const stones = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]

/*----- app's state (variables) -----*/
let player, choice, turn, sidx_init, count, path, p1_init, p2_init

/*----- cached element references and add event listeners -----*/
document.getElementById('pots').addEventListener('click', (evt) => render(evt))


/*----- functions -----*/
// function init() {

function render(evt) {
    player = parseInt(evt.target.id[0])
    choice = evt.target.id[1]
    if (isNaN(player)) {
        return 'Whoops! You are clicking outside the pots!';
    } else {
        if (turn != 1 && turn != 2) {
            turn = player
            console.log(`first move by player ${turn}`)
        }
        if (turn === player) {
            playTurn(player, choice)
        }
        console.log(`Player ${turn}'s turn to move!`)
    }
}
function playTurn(player, choice) {
    sidx_init = pots.findIndex(element => element === choice)
    count = stones[sidx_init]
    stones[sidx_init] = 0

    if (player === 1) {
        if (count > 0 && p1pots.includes(pots[sidx_init + count]) && stones[sidx_init + count] === 0) {
            stones[sidx_init + count] = stones[12 - p1pots.findIndex(e => e === pots[sidx_init + count])]
            stones[12 - p1pots.findIndex(e => e === pots[sidx_init + count])] = 0
        }
        p1_init = p1path.findIndex(element => element === choice)
        for (i = 0; i < p1_init; i++) {
            p1path.push(p1path.shift())
        }
        path = p1path
        addStones(player, path, count)
        turn = changeTurn(turn)
    } else if (player === 2) {
        if (count > 0 && p2pots.includes(pots[sidx_init + count]) && stones[sidx_init + count] === 0) {
            stones[sidx_init + count] = stones[p2pots.findIndex(e => e === pots[sidx_init + count])]
            stones[p2pots.findIndex(e => e === pots[sidx_init + count])] = 0
        }
        p2_init = p2path.findIndex(element => element === choice)
        for (i = 0; i < p2_init; i++) {
            p2path.push(p2path.shift())
        }
        path = p2path
        addStones(player, path, count)
        turn = changeTurn(turn)
    }
}


function addStones(player, path, count) {
    for (let i = 1; i <= count; i++) {
        stones[pots.findIndex(element => element === path[i])]++
    }
}

function changeTurn(turn) {
    if (turn === 1) {
        return 2;
    } else if (turn === 2) {
        return 1;
    }
}

