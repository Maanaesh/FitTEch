import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'],
     default: 'user' }
}, {
  timestamps: true,
});

userSchema.statics.signUpUser = async function (newUserObj) {
  const { firstname, lastname, weight, height, email, password } = newUserObj;

  if (!firstname || !lastname || !weight || !height || !email || !password) {
    throw new Error("All fields are required!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    firstname,
    lastname,
    weight,
    height,
    email,
    password: hash,
  });

  return user;
};
userSchema.statics.login=async function (email,password) {
    if(!email||!password){
      throw Error("All fields must be filled");
  }
  const user = await this.findOne({email});
  if(!user){
      throw Error("Incorrect Email");
  }
  const match = await bcrypt.compare(password,user.password);

  if(!match){
      throw Error('incorrect Password');
  }
  return user
  
};

const fitUser = mongoose.model('fitUser', userSchema);
export default fitUser;
