let standardBoardState = [
    // NOTE: white pieces
    ['e1', 'wk'],
    ['d1', 'wq'],
    ['a1', 'wr'], ['h1', 'wr'],
    ['b1', 'wn'], ['g1', 'wn'],
    ['c1', 'wb'], ['f1', 'wb'],
    ['a2', 'wp'], ['b2', 'wp'], ['c2', 'wp'], ['d2', 'wp'],
    ['e2', 'wp'], ['f2', 'wp'], ['g2', 'wp'], ['h2', 'wp'],
    // NOTE: black pieces
    ['e8', 'bk'],
    ['d8', 'bq'],
    ['a8', 'br'], ['h8', 'br'],
    ['b8', 'bn'], ['g8', 'bn'],
    ['c8', 'bb'], ['f8', 'bb'],
    ['a7', 'bp'], ['b7', 'bp'], ['c7', 'bp'], ['d7', 'bp'],
    ['e7', 'bp'], ['f7', 'bp'], ['g7', 'bp'], ['h7', 'bp']
];
// Map<position, piece>
let defaultBoardStateMap = new Map(standardBoardState);

const nextChar = (c) => {
    if(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }
    return null;
};
const prevChar = (c) => {
    if(c) {
        return String.fromCharCode(c.charCodeAt(0) - 1);
    }
    return null;
};
const setUpChessBoard = (boardState) => {
    if(!boardState) { boardState = defaultBoardStateMap; }
    
    let board = "<table class=\"chessboard\">";
    let file = 'a';
    let rank = 8;
    for(let i = 0; i < 64; ++i) {
        // console.log(file + rank + '\n');
        // NOTE: open row
        if(i % 8 == 0) {
            board += "\n<tr class=\"chessboard\">";
        }

        // NOTE: open td
        board += "\n<td class=\"chessboard\">";

        // NOTE: put chess piece
        if(boardState.has(file + rank)) {
            board += "<img src=\"/media/pieces/" + boardState.get(file + rank) + ".webp\">";
        }

        // NOTE: close td
        board += "\n</td>"

        // NOTE: close row
        if(i % 8 == 7) {
            board += "\n</tr>";
        }

        // NOTE: increment file and rank
        let c = nextChar(file);
        if(c == 'i') { file = 'a'; rank--; }
        else { file = c; }
    }

    board += "</table>";

    return board;
}
const showPlay = () => {
    $('#login').addClass('hidden');
    $('#signup').addClass('hidden');
    $('#play').removeClass('hidden');
};
const showSignup = () => {
    $('#login').addClass('hidden');
    $('#play').addClass('hidden');
    $('#signup').removeClass('hidden');
    $('#newUsername').focus();
};
const showLogin = () => {
    $('#signup').addClass('hidden');
    $('#play').addClass('hidden');
    $('#login').removeClass('hidden');
    $('#username').focus();
};
const showNameBox = () => {
    $('#friendNameGroup').removeClass('hidden');
    $('#playFriend').attr('onclick', 'playFriend();').val('Play friend');
}
const hideNameBox = () => {
    $('#friendNameGroup').addClass('hidden');
    $('#playFriend').attr('onclick', 'showNameBox();').val('Play a friend');
}
const playFriend = () => {
    alert('playing friend');
}
const playRandom = () => {
    hideNameBox();
    alert('playing random player');
}
$(document).ready(() => {
    $('.chessBoardDisplay').html(setUpChessBoard(null));
    window.location.href = '#pageTop';
    $('.exit').click(() => {
        $('.pop-up').hide();
        $('#content').css('pointer-events', 'all');
    })
});
