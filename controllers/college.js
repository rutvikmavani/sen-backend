const College = require("../models/colleges");
const Admin = require("../models/administrators");
const Faculty = require("../models/faculty");

exports.addCollege = function(req, res) {
  console.log(req.body.admin)
  Admin.create(req.body.admin)
    .then(admin => {
      College.create({
        name: req.body.college.name,
        location: {
          country: req.body.college.location.country,
          city: req.body.college.location.city
        },
        administrator: admin._id
      })
        .then(() => {
          res.status(200).send("Successfully added college & admin.");
        })
        .catch(err => {
          console.log(err);
          res.status(500).send("Something went wrong later.");
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Something went wrong earlier.");
    });
};

exports.updateCollege = (req, res) => {
  College.findOneAndUpdate({_id:req.body.college._id}, req.body.college )
  .then( (college) => {
    if(!college)
    {
      console.log(college);
      return res.status(204).send("No match");
    }
    else
    {
    Admin.findOneAndUpdate({_id:req.body.admin._id}, req.body.admin )
    .then( () => {
      res.status(200).send("Success");
    })
    .catch ((err) => {
      res.status(500).send("Something went wrong late")
    })
}})
  .catch ( (err) =>{
    res.status(500).send("Something went wrong early")
  })

};

exports.searchCollege = (req, res) => {
  var searchString = req.params.query;
  College.find({$text: {$search: searchString}}).then( (cllg) => {
    res.status(200).send(cllg)      
  }).catch ( (err) =>  {
    res.status(500).send("Search failed")
  })
};

exports.getCollege = (req, res) => {

  const _id = req.params.collegeId;
  College.findById(_id).then( (college) => {
    if(!college)
    {
      return res.status(204).send(college)
    }
    res.status(200).send(college);
  })
  .catch( (error) => {
    res.status(500).send("Something went wrong")
  })
};

exports.deleteCollege = (req, res) => {
    console.log(req.params.collegeId);
    const _id = req.params.collegeId;
    College.findById(_id).then( (collg) => {
      if(!collg)
      {
        return res.status(204).send("college doesn't exist")
      }
      const admin_id = collg.administrator;

      Admin.deleteOne({_id: admin_id}).catch( (error)=>{
        res.status(500).send("Something went wrong")
      })

      var len = collg.faculty.length;
      for(var i=0;i<len;i++)
      {
        Faculty.deleteOne({_id:collg.faculty[i].id}).catch( (error)=> {
          res.status(500).send("Something went wrong!")
        })
      }
      College.deleteOne({_id}).catch((e) => {
        res.staus(500).send("Something went wrong")
    })
  })
  .then(() => {
    res.status(200).send("success");
  })
  .catch((err) => {
    res.staus(500).send("failure");
  })
};
