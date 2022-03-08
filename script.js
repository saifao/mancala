/*----- constants -----*/
const pots = ['a', 'b', 'c', 'd', 'e', 'f', 'G', 'h', 'i', 'j', 'k', 'l', 'm', 'N']
const p1path = ['a', 'b', 'c', 'd', 'e', 'f', 'G', 'h', 'i', 'j', 'k', 'l', 'm']
const p2path = ['h', 'i', 'j', 'k', 'l', 'm', 'N', 'a', 'b', 'c', 'd', 'e', 'f']
const p1pots = ['a', 'b', 'c', 'd', 'e', 'f']
const p2pots = ['m', 'l', 'k', 'j', 'i', 'h']
const stones = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]

/*----- app's state (variables) -----*/
let player, choice, sidx_init, count, path, p1_init, p2_init

/*----- cached element references and add event listeners -----*/
document.getElementById('a').addEventListener('click', () => playTurn(1, 'a'))
document.getElementById('b').addEventListener('click', () => playTurn(1, 'b'))
document.getElementById('c').addEventListener('click', () => playTurn(1, 'c'))
document.getElementById('d').addEventListener('click', () => playTurn(1, 'd'))
document.getElementById('e').addEventListener('click', () => playTurn(1, 'e'))
document.getElementById('f').addEventListener('click', () => playTurn(1, 'f'))
document.getElementById('h').addEventListener('click', () => playTurn(2, 'h'))
document.getElementById('i').addEventListener('click', () => playTurn(2, 'i'))
document.getElementById('j').addEventListener('click', () => playTurn(2, 'j'))
document.getElementById('k').addEventListener('click', () => playTurn(2, 'k'))
document.getElementById('l').addEventListener('click', () => playTurn(2, 'l'))
document.getElementById('m').addEventListener('click', () => playTurn(2, 'm'))


/*----- functions -----*/
// function init() {

function playTurn(player, choice) {
    sidx_init = pots.findIndex(element => element === choice)
    count = stones[sidx_init]
    stones[sidx_init] = 0

    if (player == true) {
        if (p1pots.includes(pots[sidx_init + count]) && stones[sidx_init + count] === 0) {
            stones[sidx_init + count] = stones[12 - p1pots.findIndex(e => e === pots[sidx_init + count])]
            stones[12 - p1pots.findIndex(e => e === pots[sidx_init + count])] = 0
        }
        p1_init = p1path.findIndex(element => element === choice)
        for (i = 0; i < p1_init; i++) {
            p1path.push(p1path.shift())
        }
        path = p1path
    } else {
        if (p2pots.includes(pots[sidx_init + count]) && stones[sidx_init + count] === 0) {
            stones[sidx_init + count] = stones[p2pots.findIndex(e => e === pots[sidx_init + count])]
            stones[p2pots.findIndex(e => e === pots[sidx_init + count])] = 0
        }
        p2_init = p2path.findIndex(element => element === choice)
        for (i = 0; i < p2_init; i++) {
            p2path.push(p2path.shift())
        }
        path = p2path
    }

    addStones(player, path, count)

    //     if (player === 1) {
    //         p1_idx = p1path.indexOf(choice);
    //         p1_idx++;
    //         choice = p1path[p1_idx];
    //         if (i === 1 && p1pots.indexOf(choice) && beads[pots.indexOf(choice)] === 0) {
    //             beads[pots.indexOf(choice)] += beads[pots.indexOf(p2pots[p1pots.indexOf(choice)])]
    //             beads[pots.indexOf(p2pots[p1pots.indexOf(choice)])] = 0
    //         }
    //     } else {
    //         p2_idx = p2path.indexOf(choice);
    //         p2_idx++
    //         choice = p2path[p2_idx];
    //         if (p2_idx === 6) {
    //             choice = 'h'
    //         }
    //         if (i === 1 && p2pots.indexOf(choice) && beads[pots.indexOf(choice)] === 0) {
    //             beads[pots.indexOf(choice)] += beads[pots.indexOf(p1pots[p2pots.indexOf(choice)])]
    //             beads[pots.indexOf(p1pots[p2pots.indexOf(choice)])] = 0
    //         }
    //     }
    //     beads[pots.indexOf(choice)] += 1;
}


function addStones(player, path, count) {
    for (let i = 1; i <= count; i++) {
        stones[pots.findIndex(element => element === path[i])]++
    }
}


// const buttonA = document.getElementById('buttonA')
// const buttonB = document.getElementById('buttonB')
// const buttonC = document.getElementById('buttonC')
// const buttonD = document.getElementById('buttonD')
// const buttonE = document.getElementById('buttonE')
// const buttonF = document.getElementById('buttonF')
// const buttonH = document.getElementById('buttonH')
// const buttonI = document.getElementById('buttonI')
// const buttonJ = document.getElementById('buttonJ')
// const buttonK = document.getElementById('buttonK')
// const buttonL = document.getElementById('buttonL')
// const buttonM = document.getElementById('buttonM')