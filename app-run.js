try {
    let app = require('./app.js');
    app.listen(80, () => {
        console.log('app is running');
    })
} catch (e) {
    app.response.send('Sorry! Server is in maintenance! Please try later');
    console.log(e);
}


