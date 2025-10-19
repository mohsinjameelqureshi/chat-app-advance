import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const getAllContacts = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user?._id;

  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  }).select("-password -refreshToken");

  if (!filteredUsers) {
    throw new ApiError(500, "Something went wrong while feteching contacts");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { users: filteredUsers },
        "Successfully fetch all users"
      )
    );
});
const getMessagesByUserId = asyncHandler(async (req, res) => {
  const myId = req.user?._id;
  const { id: userToChat } = req.params;

  const message = await Message.find({
    $or: [
      {
        senderId: myId,
        receiverId: userToChat,
      },
      {
        senderId: userToChat,
        receiverId: myId,
      },
    ],
  });

  if (message.length === 0) {
    res
      .status(200)
      .json(
        new ApiResponse(200, message, "No chat happened between both users")
      );
  }

  res
    .status(200)
    .json(new ApiResponse(200, message, "Chat between both users"));
});

const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const image = req.file?.path;
  const { id: receiverId } = req.params;
  const senderId = req.user?._id;

  if (!text && !image) {
    throw new ApiError(400, "Message must contain text or image");
  }

  let imageUrl;

  try {
    // Upload image only if it exists
    if (image) {
      imageUrl = await uploadOnCloudinary(image);
      if (!imageUrl?.url) {
        throw new ApiError(500, "Image upload failed");
      }
    }

    // Build message object dynamically
    const messageData = {
      senderId,
      receiverId,
    };

    if (text) messageData.text = text.trim();
    if (imageUrl?.url) messageData.image = imageUrl.url;

    // Create and save message
    const newMessage = new Message(messageData);
    await newMessage.save();

    res
      .status(200)
      .json(new ApiResponse(200, newMessage, "Message sent successfully"));
  } catch (error) {
    // Cleanup uploaded image if anything fails
    if (imageUrl?.public_id) {
      await deleteFromCloudinary(imageUrl.public_id, imageUrl.resource_type);
    }

    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to send message"
    );
  }
});
const getChatPartners = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user?._id;

  // find all the messages where logged-in user is either sender or receiver
  const messages = await Message.find({
    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  });

  const chatPartnerIds = [
    ...new Set(
      messages.map((msg) =>
        msg.senderId.toString() === loggedInUserId.toString()
          ? msg.receiverId.toString()
          : msg.senderId.toString()
      )
    ),
  ];

  const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select(
    "-password -refreshToken"
  );

  res.status(200).json(new ApiResponse(200, chatPartners, "My chat users"));
});

export { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage };
