import Conversation from "../models/convarsation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    let { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      $and: [
        {
          participants: {
            $all: [senderId, receiverId],
          },
        },
        {
          isFriend: true,
        },
      ],
    });

    if (conversation) {
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
        //io.<socketId>.emit() used to send message to specific user
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      res.status(201).json(newMessage);
    }
    // await Promise.all([newMessage.save()]);
    if (!conversation) {
      res.status(400).json({
        success: false,
        error: "You are not allowed to send message to this user",
      });
    }
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const sendFriendRequest = async (req, res) => {
  console.log("send reques working");
  try {
    const { id: receiverId } = req.params;
    console.log("conversation id", receiverId);
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }else{
      await conversation.deleteOne({participants: {$all: [senderId, receiverId]}});
      return res.status(200).json({ conversation,message:"delete request already sent" });
    }
    console.log("conversation", conversation);

    res.status(200).json({ conversation,message:"Friend request sent successfully" });
  } catch (error) {
    console.log("Error in sendFriendRequest controller: ", error.message);
    res.status(500).json({ error: error.message });
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
