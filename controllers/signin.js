const jwt = require("jsonwebtoken");
const Admin = require("../models/administrators");

exports.signIn = (req, res) => {
  Admin.findOne({ username: req.body.username })
    .exec()
    .then(admin => {
      if (!admin) {
        res.status(500).send({ message: "Admin does not exist." });
      } else if (admin.password !== req.body.password) {
        res.status(500).send({ message: "Incorrect password." });
      } else {
        const token = jwt.sign(
          {
            username: admin.username
          },
          process.env.SIGNIN_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).send({ message: "Successfully signed in.", token });
      }
    });
};
