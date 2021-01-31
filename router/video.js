const Video = require("../models/video")

const router = new require('express').Router()

router.get('/', async (req, res) => {
  res.send(await Video.find({}))
})

router.post('/', async (req, res) => {
  const { title, url } = req.body
  res.send(await Video.create({ title, url }));
})


module.exports = router