const express = require("express");
const path = require('path')
const app = express();
const cors = require('cors')
const port = 4000;
app.use(express.json());

const authRoutes = require("./Api/Routes/Routes");
let {dbconnect} = require('./Api/Helper/dbmongo');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Origin', 'X-Requested-With','Authorization', 'Content-Type','headers', 'Accept'],
  
//   credentials: true

// }));

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use("/api", authRoutes);

dbconnect();
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});





