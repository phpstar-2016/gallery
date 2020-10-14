let settings = {
    app_ip: '127.0.0.1',
    app_port: '80',
    password: {
        cost: 12
    },
    db: {
        name: 'gallery',
        username: '',
        password: '',
        host: '127.0.0.1',
        port: '27017',
        scheme: 'mongodb'
    },
    session: {
        life_time: 30 * 60 * 1000/* ms */
    },
    upload: {
        max_size: 1024 * 1024 * 3,
        storage_dir: 'c:/Users/Mahmoud/gallery/uploaded_images/',
        max_dimension: 200/*up to 200 pixels*/
    }
}
module.exports = settings;