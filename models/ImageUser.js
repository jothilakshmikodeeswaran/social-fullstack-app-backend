import mongoose, { Schema } from "mongoose";


const ImageUserSchema  = new Schema({
    name: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});



const ImageUser = mongoose.model("ImageUser", ImageUserSchema );

export default ImageUser;
