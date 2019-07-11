const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: {
      type: {
        country: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        }
      },
      required: true
    },
    faculty: [
      {
        name: String,
        id: String
      }
    ],
    administrator: {
      type: String,
      required: true
    }
  },
  {
    collection: 'colleges'
  }
)
collegeSchema.index({ '$**': 'text' })
module.exports = mongoose.model('College', collegeSchema)
