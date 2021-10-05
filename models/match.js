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
  views: { type: Number, required: true },
  votes: { type: Number, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, // our relationship(!) SOMETHING FUCKY - ADDING ID OF MATCH AND NOT ADMIN
  // ObjectId relates to the User model, and is one specific user's ID
  usersViewed: [],
  usersVoted: [],
  comments: [commentSchema]
  }, {
    timestamps: true
  })

  //! FIRE RATING - votes / views
  matchSchema.virtual('rating')
  .get(function(){
    return Number(((this.votes / this.views) * 100).toFixed(0))
  })

  matchSchema.virtual('thumbNail')
  .get(function(){
    return `https://img.youtube.com/vi/${this.url.slice(30)}/default.jpg`
  })

matchSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Match', matchSchema)