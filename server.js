const express = require ('express');
const morgan = require ('morgan');
const dotenv = require ('dotenv');
const path = require ('path');
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db.js');
connectDB();

const routes = require('./routes/routes.js');

const app = express();
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// app.get('/', (req, res) => res.send('hello'))
app.use('/', routes);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res, next) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`listening on port ${PORT}`));