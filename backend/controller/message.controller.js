import Conversation from "../models/convarsation.model.js";
import FriendReq from "../models/friendReq.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    let { id: receiverId } = req.params;
    const senderId = req.user._id;

    const isFriend = await FriendReq.findOne({
      $and: [
        {
          "participants.receiverId": receiverId,
        },
        {
          "participants.senderId": senderId,
        },
        {
          isAccepted: true,
        },
      ],
    });

    if (!isFriend)
      return res.status(400).json({
        success: false,
        error: "You are not allowed to send message to this user",
      });
    let conversation;
    if (isFriend) {
      conversation = await Conversation.findOne({
        participants: {
          $all: [senderId, receiverId],
        },
      });
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      await conversation.save();
      await newMessage.save();

      //Socket functionality here
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      res.status(201).json(newMessage);
    }
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
