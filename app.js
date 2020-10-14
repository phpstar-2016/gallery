let express = require('express');
let session_maker = require('./app/session-maker');
let session = require('./app/session');
let login = require('./controller/login');
let register = require('./controller/Register');
let upload = require('./controller/Upload');

let app = express();
app.use(new session_maker().getSession());
app.use(express.urlencoded({extended: false}));

app.all(/(\/safe\/)/, (req, res, next) => {
    let sess = new session(req.session);
    if (sess.isAuthenticated() && sess.checkTimeOut())
        next();
    else
        res.redirect('http://localhost/');
})


app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login.html');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});


app.post('/login', (req, res) => {
    let sess = new session(req.session);
    if (sess.isAuthenticated() && sess.checkTimeOut()) {
        res.end('you are logged-in currently');
        return;
    }
    let l = new login(req, res);
    l.auth();
});


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/html/register.html');
})

app.post('/register', (req, res) => {
    let reg = new register(req.body, res);
    reg.createUser();

})

app.get('/logout', (req, res) => {
    let sess = new session(req.session);
    sess.clearAuthInfo();
    res.redirect('http://localhost/');
})

app.get('/upload', (req, res)=>{
    res.sendFile(__dirname + '/html/upload.html');
})

app.post('/upload', (req, res)=>{
    let u = new upload(req, res);
    u.moveFile();
})


module.exports = app;
