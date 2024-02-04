const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String , enum:["CREATOR","VIEW_ALL"], default: "VIEW_ALL"},
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports={UserModel}
