import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

userSchema.methods.matchPasswords = async function (pass) {
    return await bcrypt.compare(pass, this.pass);
}

userSchema.pre('save', async function (next) {
    if( !this.isModified('pass') ){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass,salt);
     
})


const User = mongoose.model('User',userSchema);

export default User;