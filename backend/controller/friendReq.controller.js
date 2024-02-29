import Conversation from "../models/convarsation.model.js";
import friendReq from "../models/friendReq.model.js";

//Send friend request
export const sendFriendRequest = async (req, res) => {
  console.log("send reques working");
  try {
    const { id: receiverId } = req.params;
    console.log("conversation id", receiverId);
    const senderId = req.user._id;

    let request = await friendReq
      .find({
        $and: [
          {
            "participants.senderId": req.user._id,
          },
          {
            "participants.receiverId": receiverId,
          },
        ],
      })
    if (request.length === 0) {
      request = await friendReq.create({
        participants: {
          senderId,
          receiverId,
        },
      });
    } else {
      request = await friendReq.findOneAndDelete({
        $and: [
          {
            "participants.senderId": req.user._id,
          },
          {
            "participants.receiverId": receiverId,
          },
        ],
      });
      return res.status(200).json({ request, message: "delete request sent" });
    }
    res
      .status(200)
      .json({ request, message: "Friend request sent successfully" });
  } catch (error) {
    console.log("Error in sendFriendRequest controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

//Get friend requests
export const getFriendRequests = async (req, res) => {
  try {
    const request = await friendReq.find({
      $and: [
        {
          "participants.receiverId": req.user._id,
        },
        {
          isAccepted: false,
        },
      ],
    }).populate("participants.senderId");
    res.status(200).json(request);
  } catch (error) {
    console.log("Error in getFriendRequests controller: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//Accept friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    const request = await friendReq.findOne({
      _id: req.params.id,
    });
    if (!request) return res.status(404).json({ error: "Request not found" });
    if (request) {
      if (!request.isAccepted) {
        request.isAccepted = true;
        await request.save();
        return res
          .status(200)
          .json({ message: "Friend request accepted successfully" });
      } else {
        return res
          .status(200)
          .json({ message: "Friend request already accepted" });
      }
    }
  } catch (error) {
    console.log("Error in acceptFriendRequest controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
