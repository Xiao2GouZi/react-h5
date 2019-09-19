var path = require('path')
var express = require('express')
var path = require('path');

var port = 9000
var app = express()

app.use(express.static(path.resolve(__dirname, './')))

app.get('/', (_, res) => {
    res.setHeader('content-type', 'text/html')
    res.sendFile(path.resolve(__dirname, './demo_index.html'));
})

// Here you can add any code.
console.log(`App Mock Server running  ${port}`)
app.listen(port)