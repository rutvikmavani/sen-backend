const mongoose = require('mongoose')

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    college: {
      type: {
        name: {
          type: String,
          required: true
        },
        id: {
          type: String,
          required: true
        }
      },
      required: true
    },
    department: String,
    areaOfInterests: {
      type: [{ name: { type: String, required: true } }],
      required: true
    },
    publications: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        publishDate: Date,
        link: String
      }
    ],
    coursesTaught: [
      {
        name: { type: String, required: true },
        code: String
      }
    ],
    contactDetails: {
      emailId: String,
      phoneNo: {
        countryCode: Number,
        Number: Number
      },
      socialMedia: [{ name: String, link: String }]
    }
  },
  { collection: 'faculty' }
)
facultySchema.index({ '$**': 'text' })

module.exports = mongoose.model('Faculty', facultySchema)
