const express = require('express')
const path = require('path')
const app = express()
const router = express.Router();
const port = process.env.port || 3000

router.get('/', (req, res) => {
  // res.send('Hello World!')
  res.sendFile(path.join(__dirname, 'views', 'channelling_hans.html'))
})

app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, '..', 'vendor')))
app.use(express.static(path.join(__dirname, '..', 'data')))
app.use('/', router);

app.listen(port, () => console.log(`Started on http://localhost:${port}`))
