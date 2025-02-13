var express = require("express")
var router = express.Router()

/* GET users listing. */
var mongoose = require("mongoose")
var DogModel = require("../models/DogModel.js")

//req och res här är request- respektive response-objekten
router.get("/", function (req, res, next) {
  //find är Mongoose funktion.
  DogModel.find().then(function (dogs) {
    //Om det inte uppstår fel så skicka hundarna i jsonformat
    res.json(dogs)
  })
})

router.get("/:id", function (req, res) {
  const dogId = req.params.id
  DogModel.findById(dogId)
    .then((dog) => {
      if (!dog) {
        return res.status(404).send("Hund inte funnen")
      }
      res.json(dog)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

router.post("/", function (req, res, next) {
  //req.body är innehållet i requestobjektet, dvs en json med en bil
  DogModel.create(req.body).then(function (post) {
    res.json(post) //Här skickar vi tillbaka datan vi skickar in i databasen, om skrivningen gick bra
  })
})

router.delete("/:id", function (req, res, next) {
  DogModel.findByIdAndDelete(req.params.id, req.body).then(function (post) {
    res.json(post)
  })
})

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const dog = await DogModel.findByIdAndUpdate(id, req.body)

    const UpdatedDog = await DogModel.findById(id)
    res.json(UpdatedDog)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
