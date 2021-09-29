import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.virtual('createdComments', {
  ref: 'Match', // references the match model
  localField: '_id', // id for the user
  foreignField: 'owner' // id for user will need to match owner on comment
})

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json){ 
    delete json.password
    return json
  }
})

userSchema
  .pre('validate', function(next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation){
      this.invalidate('passwordConfirmation', 'Passwords don\'t match')
    }
    next()
  })

userSchema
  .pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })


userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation
  })

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)