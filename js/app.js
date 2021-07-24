const idArrays = [
    "OneOne",
    "OneTwo",
    "OneThree",
    "TwoOne",
    "TwoTwo",
    "TwoThree",
    "ThreeOne",
    "ThreeTwo",
    "ThreeThree",
];
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const backGroundColors = [
    "violet",
    "indigo",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
    "black",
];

const ai = "O";
const human = "X";

let boardMoveNumber = 0;

$(document).ready(function () {
    $(`#${idArrays[0]}`).click(function (e) {
        e.preventDefault();
        printPlayerSymbol(idArrays[0]);
    });
    $(`#${idArrays[1]}`).click(function (e) {
        e.preventDefault();
        printPlayerSymbol(idArrays[1]);
    });
    $(`#${idArrays[2]}`).click(function (e) {
        e.preventDefault();
        printPlayerSymbol(idArrays[2]);
    });
    $(`#${idArrays[3]}`).click(function (e) {
        e.preventDefault();
        printPlayerSymbol(idArrays[3]);
    });
    $(`#${idArrays[4]}`).click(function (e) {
        e.preventDefault();
        printPlayerSymbol(idArrays[4]);
    });
    $(`#${idArrays[5]}`).click(function (e) {
        e.preventDefault();
        printPlayerSymbol(idArrays[5]);
    });
    $(`#${idArrays[6]}`).click(function (e) {
        e.preventDefault();
        printPlayerSymbol(idArrays[6]);
    });
    $(`#${idArrays[7]}`).click(function (e) {
        e.preventDefault();
        printPlayerSymbol(idArrays[7]);
    });
    $(`#${idArrays[8]}`).click(function (e) {
        e.preventDefault();
        printPlayerSymbol(idArrays[8]);
    });
    $(`#reset`).click(function (e) {
        e.preventDefault();
        resetAll();
    });
});

function printPlayerSymbol(fromId) {
    if (boardMoveNumber < 9) {
        let boardI = null,
            boardJ = null;
        switch (fromId) {
            case idArrays[0]:
                boardI = 0;
                boardJ = 0;
                break;
            case idArrays[1]:
                boardI = 0;
                boardJ = 1;
                break;
            case idArrays[2]:
                boardI = 0;
                boardJ = 2;
                break;
            case idArrays[3]:
                boardI = 1;
                boardJ = 0;
                break;
            case idArrays[4]:
                boardI = 1;
                boardJ = 1;
                break;
            case idArrays[5]:
                boardI = 1;
                boardJ = 2;
                break;
            case idArrays[6]:
                boardI = 2;
                boardJ = 0;
                break;
            case idArrays[7]:
                boardI = 2;
                boardJ = 1;
                break;
            case idArrays[8]:
                boardI = 2;
                boardJ = 2;
                break;
        }

        // HUMAN MORE
        $(`#${fromId}`).html(`<span class="text playerText">${human}</span>`);
        board[boardI][boardJ] = human;
        ++boardMoveNumber;
        let win = checkWin();
        if (win == "tie") {
            alert("Game Draw...");
            resetAll();
        }
        // arrayFiller();
        switchPlayer();
    }
}

function drawIntermediateBoard(board) {
    $("#visualizeConatiner").append(`
    <div class='smallBox col text-center ${backGroundColors[freeCount]}'>
    <table class='smallTable' >
    <tr>
        <td class="smallTd">${board[0][0]}</td>
        <td class="smallTd vert" >${board[0][1]}</td>
        <td  class="smallTd">${board[0][2]}</td>
    </tr>
    <tr>
        <td  class="smallTd hori">${board[1][0]}</td>
        <td  class="smallTd vert hori">${board[1][1]}</td>
        <td  class="smallTd hori">${board[1][2]}</td>
    </tr>
    <tr>
        <td  class="smallTd">${board[2][0]}</td>
        <td  class="smallTd vert">${board[2][1]}</td>
        <td  class="smallTd">${board[2][2]}</td>
    </tr>
</table>
</div>`);
}

let first = true;
let freeCount = 0;

let boardArrayData = [];
boardArrayData.push({
    id: "supreme",
    parent: "sabkaBaap",
    boad: JSON.parse(JSON.stringify(board)),
    children: [],
});

let boardRoot;

// function arrayFiller(){
//     fillBoardRecursively("root", ai, board);
//     //Convert the array to tree Object https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
//     const idMapping = boardArrayData.reduce((acc, el, i) => {
//         acc[el.id] = i;
//         return acc;
//     }, {});

//     boardArrayData.forEach((el) => {
//         // Handle the root element
//         if (el.parent === "root") {
//             boardRoot = el;
//             return;
//         }
//         // Use our mapping to locate the parent element in our data array
//         const parentEl = boardArrayData[idMapping[el.parent]];
//         // Add our current el to its parent's `children` array
//         parentEl.children = [...(parentEl.children || []), el];
//     });
//     draw(boardRoot);
//     // console.log(boardRoot);
// }

// function fillBoardRecursively(parentNode,player, board){
//     for(int i=0; i<3; i++){
//         for(int j=0; j<3; j++){
//             if(board[i][j] == ""){
//                 if(player === ai){
//                     board[i][j] = ai;
//                     let thisId = uuidv4();
//                     boardArrayData.push({
//                         id: thisId + returnBoardString(board),
//                         parent: parentNode,
//                         boad: board,
//                         children: [],
//                     });
//                     fillBoardRecursively(thisId + returnBoardString(board), human, board);
//                     board[i][j] = "";
//                 }else{
//                     board[i][j] = human;
//                     let thisId = uuidv4();
//                     boardArrayData.push({
//                         id: thisId + returnBoardString(board),
//                         parent: parentNode,
//                         boad: board,
//                         children: [],
//                     });
//                     fillBoardRecursively(thisId + returnBoardString(board), ai, board);
//                     board[i][j] = "";
//                 }
//             }
//         }
//     }
// }



function switchPlayer() {
    //console.log("PLAYER SWITCHED");
    let bestScore = -Infinity;
    let i, j, besti, bestj;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (board[i][j] == "") {

                board[i][j] = ai;

                // var boardCopy = board.slice();
                let thisId;

                if(boardMoveNumber >= 2 ){

                    thisId = uuidv4() + returnBoardString(board);

                    boardArrayData.push({
                        id: thisId ,
                        parent: "supreme",
                        boad: JSON.parse(JSON.stringify(board)),
                        children: [],
                    });
                }else{
                    thisId = "kchhMatKaro"
                }   

                let score = minimax(board, 0, false, thisId);
                ++freeCount;
                board[i][j] = "";
                if (bestScore < score) {
                    bestScore = score;
                    besti = i;
                    bestj = j;
                }
            }
        }
    }

    //Convert the array to tree Object https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
    const idMapping = boardArrayData.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
    }, {});
    // console.log(boardArrayData);
    boardArrayData.forEach((el) => {
        // Handle the root element
        if (el.parent === "sabkaBaap") {
            boardRoot = el;
            return;
        }
        // Use our mapping to locate the parent element in our data array
        const parentEl = boardArrayData[idMapping[el.parent]];
        // Add our current el to its parent's `children` array
        parentEl.children = [...(parentEl.children || []), el];
    });
    // boardRoot = "supreme";
    draw(boardRoot);
    console.log(boardRoot);


    switch (besti) {
        case 0:
            switch (bestj) {
                case 0:
                    $(`#${idArrays[0]}`).html(
                        `<span class="text playerText">${ai}</span>`
                    );

                    break;
                case 1:
                    $(`#${idArrays[1]}`).html(
                        `<span class="text playerText">${ai}</span>`
                    );
                    break;
                case 2:
                    $(`#${idArrays[2]}`).html(
                        `<span class="text playerText">${ai}</span>`
                    );
                    break;
            }
            break;
        case 1:
            switch (bestj) {
                case 0:
                    $(`#${idArrays[3]}`).html(
                        `<span class="text playerText">${ai}</span>`
                    );
                    break;
                case 1:
                    $(`#${idArrays[4]}`).html(
                        `<span class="text playerText">${ai}</span>`
                    );
                    break;
                case 2:
                    $(`#${idArrays[5]}`).html(
                        `<span class="text playerText">${ai}</span>`
                    );
                    break;
            }

            break;
        case 2:
            switch (bestj) {
                case 0:
                    $(`#${idArrays[6]}`).html(
                        `<span class="text playerText">${ai}</span>`
                    );
                    break;
                case 1:
                    $(`#${idArrays[7]}`).html(
                        `<span class="text playerText">${ai}</span>`
                    );
                    break;
                case 2:
                    $(`#${idArrays[8]}`).html(
                        `<span class="text playerText">${ai}</span>`
                    );
                    break;
            }
            break;
    }
    board[besti][bestj] = ai;
    setTimeout(() => {
        let win = checkWin();
        if (win) {
            alert("AI Wins....");
            resetAll();
        }
    }, 200);
}

function resetAll() {
    window.location.reload();
}

function minimax(board, depth, isMaximizingPlayer, parentId) {
    result = checkWin();

    if (result !== null) {
        if (result == ai) {
            return 10000 - depth;
        } else if (result == human) {
            return -10000 + depth;
        } else {
            return 0;
        }
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        let i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = ai;
                    let score;
                    if(parentId != "kchhMatKaro"){
                        let thisId = uuidv4();
                        boardArrayData.push({
                            id: thisId + returnBoardString(board),
                            parent: parentId,
                            boad: JSON.parse(JSON.stringify(board)),
                            children: [],
                        });
                        score = minimax(
                            board,
                            depth + 1,
                            false,
                            thisId + returnBoardString(board)
                        );
                    }else{
                        score = minimax(
                            board,
                            depth + 1,
                            false,
                            "kchhMatKaro"
                        );
                    }

                    board[i][j] = "";
                    if (bestScore < score) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        let i = 0;
        let j = 0;

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = human;
                    let score;
                    if(parentId != "kchhMatKaro"){
                        let thisId = uuidv4();

                        boardArrayData.push({
                        id: thisId + returnBoardString(board),
                        parent: parentId,
                        boad: JSON.parse(JSON.stringify(board)),
                        children: [],
                        });
                         score = minimax(
                            board,
                            depth + 1,
                            true,
                            thisId + returnBoardString(board)
                        );
                    }else{
                         score = minimax(
                            board,
                            depth + 1,
                            true,
                            "kchhMatKaro"
                        );
                    }
                    board[i][j] = "";
                    if (bestScore > score) {
                        bestScore = score;
                    }
                    // bestScore = Math.min(bestScore, score);
                }
            }
        }
        return bestScore;
    }
}

function returnBoardString(mBoard) {
    let mString = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            mString += mBoard[i][j];
        }
    }
    return mString;
}

function isEqual(x, y, z) {
    return x == y && y == z && z != "";
}

function checkWin() {
    winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (isEqual(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (isEqual(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    // Diagonal
    if (isEqual(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (isEqual(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return "tie";
    } else {
        return winner;
    }
}

//d3 code;
const width = 1500;

function tree(data) {
    const root = d3.hierarchy(data);
    root.dx = 10;
    root.dy = width / (root.height + 1);
    return d3.tree().nodeSize([root.dx, root.dy])(root);
}

function draw(data) {
    const root = tree(data);

    let x0 = Infinity;
    let x1 = -x0;
    root.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    const svg = d3.create("svg").attr("viewBox", [-500, -200, width + 200, width + 200]);
    const g = svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
    // .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

    const link = g
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 3)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr(
            "d",
            d3.linkVertical().x((d) => d.x).y((d) => d.y)
        );

    const node = g
        .append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node.append("circle")
        .attr("fill", (d) => (d.children ? "#555" : "#999"))
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", (d) => "0.32rem")
        .attr("x", (d) => (d.children ? -20 : 6))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        // .text((d) => d.data.name)
        .text((d) => d.data.boad[0][0])
        .clone(true)
        .lower()
        .attr("stroke", "white");
    node.append("text")
        .attr("dy", (d) => "0.32rem")
        .attr("x", (d) => (d.children ? -12 : 14))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        // .text((d) => d.data.name)
        .text((d) => d.data.boad[0][1])
        .clone(true)
        .lower()
        .attr("stroke", "white");
    node.append("text")
        .attr("dy", (d) => "0.32rem")
        .attr("x", (d) => (d.children ? -4 : 22))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        // .text((d) => d.data.name)
        .text((d) => d.data.boad[0][2])
        .clone(true)
        .lower()
        .attr("stroke", "white");
    node.append("text")
        .attr("dy", (d) => "0.88rem")
        .attr("x", (d) => (d.children ? -20 : 6))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        // .text((d) => d.data.name)
        .text((d) => d.data.boad[1][0])
        .clone(true)
        .lower()
        .attr("stroke", "white");
    node.append("text")
        .attr("dy", (d) => "0.88rem")
        .attr("x", (d) => (d.children ? -12 : 14))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        // .text((d) => d.data.name)
        .text((d) => d.data.boad[1][1])
        .clone(true)
        .lower()
        .attr("stroke", "white");
    node.append("text")
        .attr("dy", (d) => "0.88rem")
        .attr("x", (d) => (d.children ? -4 : 22))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        // .text((d) => d.data.name)
        .text((d) => d.data.boad[1][2])
        .text((d) => "\n")
        .clone(true)
        .lower()
        .attr("stroke", "white");
    node.append("text")
        .attr("dy", (d) => "1.43rem")
        .attr("x", (d) => (d.children ? -20 : 6))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        // .text((d) => d.data.name)
        .text((d) => d.data.boad[2][0])
        .clone(true)
        .lower()
        .attr("stroke", "white");
    node.append("text")
        .attr("dy", (d) => "1.43rem")
        .attr("x", (d) => (d.children ? -12 : 14))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        // .text((d) => d.data.name)
        .text((d) => d.data.boad[2][1])
        .clone(true)
        .lower()
        .attr("stroke", "white");
    node.append("text")
        .attr("dy", (d) => "1.43rem")
        .attr("x", (d) => (d.children ? -4 : 22))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        // .text((d) => d.data.name)
        .text((d) => d.data.boad[2][2])
        .text((d) => "\n")
        .clone(true)
        .lower()
        .attr("stroke", "white");


    // console.log(svg.node())
    $("#visualizeConatiner").html(svg.node());




    boardArrayData = [];
    boardArrayData.push({
        id: "supreme",
        parent: "sabkaBaap",
        boad: JSON.parse(JSON.stringify(board)),
        children: [],
    });

}

function returnBoard(d){
    
    let a = " ";
    let b = " ";
    let c = " ";
    let j = " ";
    let e = " ";
    let f = " ";
    let g = " ";
    let h = " ";
    let i = " ";

    if(d.data.boad[0][0] != ""){
        a = d.data.boad[0][0];
    }
    if(d.data.boad[0][1] != ""){
        b = d.data.boad[0][1];
    }
    if(d.data.boad[0][2] != ""){
        c = d.data.boad[0][2];
    }
    if(d.data.boad[0][0] != ""){
        j = d.data.boad[1][0];
    }
    if(d.data.boad[0][1] != ""){
        e = d.data.boad[1][1];
    }
    if(d.data.boad[0][2] != ""){
        f = d.data.boad[1][2];
    }
    if(d.data.boad[0][0] != ""){
        g = d.data.boad[2][0];
    }
    if(d.data.boad[0][1] != ""){
        h = d.data.boad[2][1];
    }
    if(d.data.boad[0][2] != ""){
        i = d.data.boad[2][2];
    }

    let text;
    text = a+" | "+b+" | "+c+ '\n';
    text += j+" | "+e+" | "+f+ "\n";
    text += g+" | "+h+" | "+i+ "\n";

    return text;
}
