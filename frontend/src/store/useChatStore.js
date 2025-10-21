import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  allcontacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allcontacts: res.data?.data.users });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data?.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`message/${userId}`);
      set({ messages: res.data?.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    // 1️⃣ Create temporary optimistic message
    const tempId = `temp-${Date.now()}`;
    const text = messageData.get("text");
    const imageFile = messageData.get("image");

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    // 2️⃣ Immediately show in UI
    set({ messages: [...messages, optimisticMessage] });

    try {
      // 3️⃣ Send real request
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newMessage = res?.data?.data;
      if (!newMessage) throw new Error("Invalid response from server");

      // 4️⃣ Replace optimistic with actual message
      set({
        messages: get().messages.map((msg) =>
          msg._id === tempId ? newMessage : msg
        ),
      });
    } catch (error) {
      console.error("Send message error:", error);
      toast.error(error.response?.data?.message || "Failed to send");

      // 5️⃣ Remove optimistic message on error
      set({
        messages: get().messages.filter((msg) => msg._id !== tempId),
      });
    }
  },
}));
