/*----- constants -----*/
const pots = ['a', 'b', 'c', 'd', 'e', 'f', 'G', 'h', 'i', 'j', 'k', 'l', 'm', 'N']
const p1path = ['a', 'b', 'c', 'd', 'e', 'f', 'G', 'h', 'i', 'j', 'k', 'l', 'm']
const p2path = ['h', 'i', 'j', 'k', 'l', 'm', 'N', 'a', 'b', 'c', 'd', 'e', 'f']
const p1pots = ['a', 'b', 'c', 'd', 'e', 'f']
const p2pots = ['m', 'l', 'k', 'j', 'i', 'h']
const stones = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]

/*----- app's state (variables) -----*/
let player, choice, sidx_init, count, path, p1_init, p2_init

/*----- cached element references -----*/
const tbodyEl = document.querySelector('tbody')
const h1El = document.querySelector('h1')
const buttonEl = document.querySelector('button')

/*----- event listeners -----*/
tbodyEl.addEventListener('click', handlePlayerClick)

buttonEl.addEventListener('click', function (evt) {
    init()
})

/*----- functions -----*/
// function init() {

function something(player, choice) {
    sidx_init = pots.findIndex(element => element === choice)
    count = stones[sidx_init]
    stones[sidx_init] = 0


    if (player == true) {
        p1_init = p1path.findIndex(element => element === choice)
        for (i = 0; i < p1_init; i++) {
            p1path.push(p1path.shift())
        }
        path = p1path
    } else {
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