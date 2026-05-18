const express = require('express');
const path = require('path');
const app = express();
const engine = require('ejs-mate');


app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const adminRoutes = require('../routes/');
app.use('/', adminRoutes);

const PORT = process.env.ADMIN_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Running address: http://localhost:${PORT}/`);
});
