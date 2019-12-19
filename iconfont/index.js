const path = require('path')
const express = require('express')
const openBrowser = require('react-dev-utils/openBrowser');

const port = 9000
const app = express()
const host = 'http://localhost'

app.use(express.static(path.resolve(__dirname, './')))

app.get('/', (_, res) => {
    res.setHeader('content-type', 'text/html')
    res.sendFile(path.resolve(__dirname, './demo_index.html'));
})

// Here you can add any code.
console.log(`App Mock Server running  ${port}`)
app.listen(port)


openBrowser(host + ':' + `${port}`);
