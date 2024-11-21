import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
    {
        username: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        email:{
            type:String,
            required: true,
        },
        password: {
          type: String,
          required: true,
          minlength: 8,
        }
    },
    {
        timestamps:true
    }
)


export const Account = mongoose.model('Account', accountSchema);