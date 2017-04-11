'use strict';

const express = require('express');
var os = require('os');
var redis = require('redis');

var client = redis.createClient(
  process.env.REDIS_PORT_6379_TCP_PORT,
  process.env.REDIS_PORT_6379_TCP_ADDR
);



// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
  var hostname = os.hostname();
  client.incr('counter', function(err, counter) {
    if(err) return next(err);
    res.send('This page has been viewed ' + counter + ' times! in host: ' + hostname);
  });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
