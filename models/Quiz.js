const mongoose = require('mongoose')

const schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required']
  },

  // TODO: implement it later
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },

  questions: [
    {
      title: {
        type: String,
        required: [true, 'question title is required']
      },

      options: [
        {
          title: {
            type: String,
            required: [true, 'option title is required']
          }
        }
      ],
      answer: {
        type: String,
      },

      userAnswer: {
        type: String,
      },
      marks: {
        type: Number
      }
    }
  ],
})

const Quiz = mongoose.model('Quiz', schema)

module.exports = Quiz