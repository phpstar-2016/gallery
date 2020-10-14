try {
    let app = require('./app.js');
    app.listen(80, () => {
        console.log('app is running');
    })
} catch (e) {
    app.response.send('Hello');
    console.log(e);
}


