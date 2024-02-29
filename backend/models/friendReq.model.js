import Mongoose from "mongoose";

const friendReqSchema = new Mongoose.Schema(
  {
    participants: {
      senderId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      receiverId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const FriendReq = Mongoose.model("FriendReq", friendReqSchema);
export default FriendReq;
