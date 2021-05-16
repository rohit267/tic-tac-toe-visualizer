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
        switchPlayer();
    }
}

function switchPlayer() {
    //console.log("PLAYER SWITCHED");
    let bestScore = -Infinity;
    let i, j, besti, bestj;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                board[i][j] = ai;
                let score = minimax(board, 0, false);

                $("#visualizeConatiner").append(`
                <div class='smallBox col-md-2 text-center'>
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
                board[i][j] = "";

                if (bestScore < score) {
                    bestScore = score;
                    besti = i;
                    bestj = j;
                }
            }
        }
    }
    console.log("I,J===>", besti, bestj, bestScore, board);
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
}

function resetAll() {
    window.location.reload();
}

function minimax(board, depth, isMaximizingPlayer) {
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
                    let score = minimax(board, depth + 1, false);
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
                    let score = minimax(board, depth + 1, true);
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
