const Faculty = require('../models/faculty')
const College = require('../models/colleges')

exports.getFaculty = (req, res) => {
  const _id = req.params.facultyId
  Faculty.findById({ _id })
    .then(fac => {
      if (!fac) {
        res.status(404).send()
      }
      console.log(fac._id)
      res.send(fac)
    })
    .catch(err => {
      res.status(500).send({ error: err, message: 'Something went wrong.' })
    })
}

exports.searchFaculty = (req, res) => {
  var searchString = req.params.query
  Faculty.find({ $text: { $search: searchString } })
    .then(fac => {
      res.send(fac)
    })
    .catch(err => {
      res.status(500).send({ error: err, message: 'Something went wrong.' })
    })
}

exports.addFaculty = (req, res) => {
  Faculty.create(req.body)
    .then(fac => {
      const match = fac._id.toString()
      const addthis = {
        name: fac.name,
        id: match
      }
      College.findOneAndUpdate(
        { _id: fac.college.id },
        { $push: { faculty: addthis } }
      )
        .then(done => {
          res.status(200).send('Successfully added faculty.')
        })
        .catch(err => {
          console.log(err)
          res.status(500).send('Something went wrong.')
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong.')
    })
}

exports.updateFaculty = (req, res) => {
  Faculty.findByIdAndUpdate(req.body.id, req.body.faculty)
    .then(faculty => {
      College.update(
        { _id: faculty.college.id, 'faculty.id': faculty._id },
        {
          $set: { 'faculty.$.name': faculty.name }
        }
      ).then(() => {
        res.status(200).send('Succesfully updated faculty.')
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong.')
    })
}

exports.deleteFaculty = (req, res) => {
  const id = req.params.facultyId
  Faculty.findOneAndDelete({ _id: id })
    .exec()
    .then(faculty => {
      College.findByIdAndUpdate(faculty.college.id, {
        $pull: { faculty: { id: id } }
      })
        .then(() => {
          res.status(200).send('Successfully deleted faculty.')
        })
        .catch(err => {
          console.log(err)
          res.status(500).send('Something went wrong.')
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong.')
    })
}
