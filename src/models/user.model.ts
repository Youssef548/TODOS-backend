import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  PIN: string | null;
  _doc: Document;
}

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
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
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    PIN: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
