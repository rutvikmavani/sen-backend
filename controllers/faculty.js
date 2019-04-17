const Faculty = require("../models/faculty");
const College = require("../models/colleges")


exports.getFaculty = (req, res) => {
  
  const _id = req.params.facultyId;
  Faculty.findById( {_id} ).then((fac)=> {
    if(!fac)
    {
      res.status(204).send(fac);
    }
    console.log(fac._id)
    res.status(200).send(fac);
  }).catch( (err) => {
    res.status(500).send("Something went wrong")
  })
};

exports.searchFaculty = (req, res) => {
  console.log(req.params.query);
  const searchString = req.params.query;
  Faculty.find({$text: {$search: searchString}}).then( (fac) => {
    res.status(200).send(fac)
  }).catch ( (err) =>  {
    res.status(500).send("Search failed")
  })
};

exports.addFaculty = (req, res) => {
 // console.log(req.body.faculty)
  Faculty.create((req.body.faculty))
  .then( (fac)=> {
     const match = fac._id.toString()
     const addthis = {
      id: match
    }

    College.findOneAndUpdate({_id:fac.college.id}, {$push: {faculty:addthis} }).then( (done) =>{
        res.status(200).send("Successfully added faculty")
      }).catch( (err) => {
      console.log(err)
      res.status(500).send("Something went wrong here")
    })
  })
  .catch( (err)=> {
    console.log(err);
    res.status(500).send("Something went wrong!")
  })
};

exports.updateFaculty = (req, res) => {
  Faculty.findOneAndUpdate({_id:req.body._id}, req.body ).then( (doc) => {
    res.status(200).send("Saved successfully")
  })
  .catch ( (err) =>{
    res.status(200).send("Something went wrong")
  })
};

exports.deleteFaculty = (req, res) => {
  const _id = req.params.facultyId
  Faculty.deleteOne({_id}).then( () => {
    res.status(200).send("Faculty deleted")
  }).catch( (e)=> {
    res.status(500).send("Something went wrong")
  })
};
