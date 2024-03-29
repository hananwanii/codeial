
//Importing modules
const express = require('express');
const app = express();

const port = 8000;
//adding cookie parser
const cookieParser = require('cookie-parser');
// adding express ejs layouts
const expressLayouts = require('express-ejs-layouts');
//connecting to database

const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
//authencation using passport.js
const passport = require('passport');
const pasportLocal = require('./config/passport-local-strategy');
//Mongo Store for storing the cookie

const MongoStore = require('connect-mongo');
//for scss to css
const sassMiddleware = require('node-sass-middleware');

//for flash messages
const flash = require('connect-flash');
const customMware = require('./config/middleware');








app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}));

app.use(express.urlencoded());


//make the uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));



app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://127.0.0.1/codeial_development',
        autoRemove: 'disabled'

        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
    

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use('/', require('./routes'));


app.listen(port, function(err){

    if (err){
        console.log(`Error in running the server: ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
    

});