/*----- constants -----*/
const pots = ['a', 'b', 'c', 'd', 'e', 'f', 'G', 'h', 'i', 'j', 'k', 'l', 'm', 'N']
const p1path = ['a', 'b', 'c', 'd', 'e', 'f', 'G', 'h', 'i', 'j', 'k', 'l', 'm']
const p2path = ['h', 'i', 'j', 'k', 'l', 'm', 'N', 'a', 'b', 'c', 'd', 'e', 'f']
const p1pots = ['a', 'b', 'c', 'd', 'e', 'f']
const p2pots = ['m', 'l', 'k', 'j', 'i', 'h']
let stones = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]

/*----- app's state (variables) -----*/
let player, choice, turn, sidx_init, count, path, p1_init, p2_init, winner, token

/*----- cached element references -----*/
let h1El = document.querySelector('h1')
let h3El = document.querySelector('h3')
let pot1a = document.getElementById('1a')
let pot1b = document.getElementById('1b')
let pot1c = document.getElementById('1c')
let pot1d = document.getElementById('1d')
let pot1e = document.getElementById('1e')
let pot1f = document.getElementById('1f')
let pot2m = document.getElementById('2m')
let pot2l = document.getElementById('2l')
let pot2k = document.getElementById('2k')
let pot2j = document.getElementById('2j')
let pot2i = document.getElementById('2i')
let pot2h = document.getElementById('2h')
let p1bank = document.getElementById('p1bank')
let p2bank = document.getElementById('p2bank')

/*----- event listeners -----*/
document.getElementById('pots').addEventListener('click', (evt) => render(evt))
document.querySelector('button').addEventListener('click', () => reset())

/*----- functions -----*/
function init() {
    token = 'normal'
}

function render(evt) {
    player = parseInt(evt.target.id[0])
    choice = evt.target.id[1]
    if (isNaN(player)) {
        h1El.innerText = 'Whoops! You have to click the pots!'
    } else {
        if (!turn) {    //on first move turn will not be assigned hence falsy
            if (player === 1) {
                playTurn(player, choice, 1)
                turn = 2
            } else if (player === 2) {
                playTurn(player, choice, 2)
                turn = 1
            }
            updateView(turn)
            h3El.innerText = `First Move By Player ${player}. Nice!`
        } else {
            [turn, token] = playTurn(player, choice, turn)
            updateView(turn)
            checkWin()
        }
    }
}

function updateView(turn) {
    h1El.innerText = `Player ${turn}'s turn!`
    pot1a.innerText = stones[0]
    pot1b.innerText = stones[1]
    pot1c.innerText = stones[2]
    pot1d.innerText = stones[3]
    pot1e.innerText = stones[4]
    pot1f.innerText = stones[5]
    p1bank.innerText = stones[6]
    pot2h.innerText = stones[7]
    pot2i.innerText = stones[8]
    pot2j.innerText = stones[9]
    pot2k.innerText = stones[10]
    pot2l.innerText = stones[11]
    pot2m.innerText = stones[12]
    p2bank.innerText = stones[13]
}

function checkWin() {
    p1PotsTotal = stones[0] + stones[1] + stones[2] + stones[3] + stones[4] + stones[5]
    p2PotsTotal = stones[7] + stones[8] + stones[9] + stones[10] + stones[11] + stones[12]
    p1Score = stones[6]
    p2Score = stones[13]
    if (p1PotsTotal === 0 || p2PotsTotal === 0) {
        if (p1Score > p2Score) {
            winner = '1'
            h1El.innerText = 'Player 1 Wins!'
            h3El.innerText = 'Hit Reset to Play Mancala again!'
        } else if (p1Score < p2Score) {
            winner = '2'
            h1El.innerText = 'Player 2 Wins!'
            h3El.innerText = 'Hit Reset to Play Mancala again!'
        } else {
            winner = 'tie'
            h1El.innerText = 'Both Players Tie!'
            h3El.innerText = 'Hit Reset to Play Mancala again!'
        }
    }
}

function playTurn(player, choice, turn) {
    if (!winner) {
        if (player === turn) {
            sidx_init = pots.findIndex(element => element === choice)
            count = stones[sidx_init]
            stones[sidx_init] = 0

            // if there are actually stones in the pot chosen
            if (player === 1 && count > 0) {
                // if the pot in which the last stone will land belongs to p1pots && number of stones in that pot === 0 && number of stones in the pot opposite is not zero then...
                if (p1pots.includes(pots[sidx_init + count]) && stones[sidx_init + count] === 0 && stones[12 - p1pots.findIndex(e => e === pots[sidx_init + count])] !== 0) {
                    // number of stones in the pot opposite goes to the player1's bank (stones[6]) plus last stone that landed 
                    stones[6] += stones[12 - p1pots.findIndex(e => e === pots[sidx_init + count])] + 1
                    // number of stones in the pot opposite is reduced to zero
                    stones[12 - p1pots.findIndex(e => e === pots[sidx_init + count])] = 0
                    // Number of stones in pot where last stone landed is decrement by 1 to offset the increment by 1 which happens later at addStones(player, path, count). 
                    stones[sidx_init + count] -= 1
                    token = 'repeat'
                } else if (sidx_init + count === 6) {
                    token = 'repeat'
                }
                p1_init = p1path.findIndex(element => element === choice)
                for (i = 0; i < p1_init; i++) {
                    p1path.push(p1path.shift())
                }
                path = p1path
                addStones(player, path, count)
                // New turn is determined correctly (depending on if token passed to changeTurn is repeat or not). Token returned will be 'normal' which is important because otherwise value of token will remain 'repeat' and so changeTurn will always determine that the same player should play again and again and again since turn only changes when token is normal not repeat.
                return [turn, token] = changeTurn(turn, token)

            } else if (player === 2 && count > 0) {
                if (p2pots.includes(pots[sidx_init + count]) && stones[sidx_init + count] === 0 && stones[p2pots.findIndex(e => e === pots[sidx_init + count])] !== 0) {
                    stones[13] += stones[p2pots.findIndex(e => e === pots[sidx_init + count])] + 1
                    stones[p2pots.findIndex(e => e === pots[sidx_init + count])] = 0
                    stones[sidx_init + count] -= 1
                    token = 'repeat'
                } else if (sidx_init + count === 13) {
                    token = 'repeat'
                }
                p2_init = p2path.findIndex(element => element === choice)
                for (i = 0; i < p2_init; i++) {
                    p2path.push(p2path.shift())
                }
                path = p2path
                addStones(player, path, count)
                return [turn, token] = changeTurn(turn, token)
            }
        }
        return turn
    }
}

function addStones(player, path, count) {
    for (let i = 1; i <= count; i++) {
        // given the path, add one stone to each pot, altering the stones array via the pots array for which the indexes line up
        stones[pots.findIndex(element => element === path[i])]++
    }
}

function changeTurn(turn, token) {
    if (turn === 1 && token === 'normal') {
        return [2, 'normal'];
    } else if (turn === 2 && token === 'normal') {
        return [1, 'normal'];
    } else if (turn === 1 && token === 'repeat') {
        return [1, 'normal'];
    } else if (turn === 2 && token === 'repeat') {
        return [2, 'normal'];
    }
}

function reset() {
    winner = undefined
    turn = undefined
    stones = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]
    updateView()
    h1El.innerText = 'Play Mancala!'
    h3El.innerText = 'Somebody make a move!'
    init()
}

init()