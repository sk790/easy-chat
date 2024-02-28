import Conversation from "../models/convarsation.model.js";

export const getFriendRequests = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      $and: [
        {
          participants: {
            $in: [req.user._id],
          },
        },
        { isFriend: false },
      ],
    });
    res.status(200).json(conversation);
  } catch (error) {
    console.log("Error in getFriendRequests controller: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
