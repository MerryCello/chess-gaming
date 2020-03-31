// npm native modules
const express      = require('express');
const session      = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const path         = require('path');
const ejs          = require('ejs');
const fs           = require('fs');
const bcrypt       = require('bcryptjs');
const queries      = require('./queries');
const { Pool }     = require('pg');
require('dotenv').config();

// setup
let app = express();
const router = express.Router();
    // TODO: encrypt a message
const secret = 'sssssshhhhhhh'; 
// var sess;
// if working locally, run this line of code:
fs.access('./.env', fs.F_OK, (err) => { if (!err) { process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; }});


app.set('port', process.env.PORT || 5000)
   .set('view engine', 'ejs')
   .set('views', path.join(__dirname, 'views'))
   .use(express.static(path.join(__dirname, 'public')))
   .use(session({
       secret: secret,
       saveUninitialized: true,
       resave: true,
       cookie: {
           secure: true,
           maxAge: 15552000000 // 6 months (6 * 30 days)
        }
    }))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({extended: true}))
   .use(cookieParser());

router.get('/', (req, res) => {
    let players = {
        playerNames : ['Player 1', 'Player 2'],
        // NOTE: The turn is the index to the array above
        turn : 0
    }
    let isLoggedIn = (req.session.name ? true : false);
    let data = {
        // TODO: determine how to communicate game state
        gameState : 'new-game',
        players : players,
        gameIsInSession : false,
        isLoggedIn : false
    };
    res.render(app.get('views') + '/pages/gameDisplay.ejs', data);
});

/** NOTE: ROUTER ON HOLD UNTIL A PERSON CAN CREATE A GAME FIRST
 *  TODO: ENABLE A PERSON TO CREATE A GAME BY CREATING AN ACCOUNT
 * structure for game obj set in cookies:
 * game[{
 *    opponentName,
 *    id
 * }]
 */
router.get('/findGameByFriendName', (req, res) => {
    // NOTE: 1. check if a game is associated in cookies
    let data = null;
    if(req.cookies.games) {
        req.cookies.games.forEach(game => {
            if(game.opponentName == req.query.friendName) {
    // NOTE: 2. get this game in from DB
                // TODO: build function
                // takes: row id
                // returns: boardState, players { player names, turn } or null if game not found
                data = queries.getGameState(game.id);
            }
        });
    }
});

// NOTE: old project routers
// router.get('/results', calcRates.calcRates);
// router.get('/js/inputValidation.js', (req, res) => {
//        res.sendFile('inputValidation.js', { root: __dirname + "/public/js" })
// });
// router.get('/css/styles.css', (req, res) => {
//        res.sendFile('styles.css', { root: __dirname + "/public/css" })
// });

app.use('/', router);

// NOTE: Start the app
app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'));
})
