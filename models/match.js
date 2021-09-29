import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({ // because commentSchema referenced in matchSchema, commentSchema must come first
  text: { type: String, required: true, maxlength: 300 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})


const matchSchema = new mongoose.Schema({ 
  title: { type: String, required: true, unique: true }, 
  url: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, // our relationship(!)
  // ObjectId relates to the User model, and is one specific user's ID
  comments: [commentSchema]
  }, {
    timestamps: true
  })

  // virtual fields:
  //? VIEWS - viewer updated by increments virtually

  matchSchema.virtual('views')

  //? VOTES - viewer votes as FIRE!! incremented by event listener

  matchSchema.virtual('votes')

  //! FIRE RATING - votes / views

  matchSchema.virtual('avgRating')
  .get(function(){
    if (!this.reviews.length) return 'Not yet rated'
    const sum = this.reviews.reduce((acc, review) => {
      return acc + review.rating
    }, 0)
    return (sum / this.reviews.length).toFixed(2)
  })

movieSchema.set('toJSON', { virtuals: true })




matchSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Match', matchSchema)