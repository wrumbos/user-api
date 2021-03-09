const usersRoute = require('./app/routes/usersRoute')
const express = require('express')
const app = express()
const port = 3000

var cors = require('cors');
app.use(cors({origin: '*'}));

app.use(express.json());

app.use('/api/', usersRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
