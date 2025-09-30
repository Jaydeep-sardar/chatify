import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  unreadCounts: {}, // { userId: count }
  notifications: JSON.parse(localStorage.getItem("notifications")) || true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  toggleNotifications: () => {
    const newNotificationState = !get().notifications;
    localStorage.setItem("notifications", JSON.stringify(newNotificationState));
    set({ notifications: newNotificationState });
  },

  markAsRead: (userId) => {
    const { unreadCounts } = get();
    const updatedCounts = { ...unreadCounts };
    delete updatedCounts[userId];
    set({ unreadCounts: updatedCounts });
  },

  incrementUnreadCount: (userId) => {
    const { unreadCounts } = get();
    set({ 
      unreadCounts: { 
        ...unreadCounts, 
        [userId]: (unreadCounts[userId] || 0) + 1 
      } 
    });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
    if (selectedUser) {
      get().markAsRead(selectedUser._id);
    }
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      // remove optimistic message on failure
      set({ messages: messages });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, isSoundEnabled, notifications } = get();
      const { authUser } = useAuthStore.getState();
      
      // Don't process own messages
      if (newMessage.senderId === authUser._id) return;

      const isMessageFromSelectedUser = selectedUser && newMessage.senderId === selectedUser._id;
      
      if (isMessageFromSelectedUser) {
        // If chat is open, add message directly
        const currentMessages = get().messages;
        set({ messages: [...currentMessages, newMessage] });
      } else {
        // If chat is not open, increment unread count
        get().incrementUnreadCount(newMessage.senderId);
      }

      // Play notification sound
      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound.play().catch((e) => console.log("Audio play failed:", e));
      }

      // Show browser notification
      if (notifications && !isMessageFromSelectedUser) {
        const sender = get().allContacts.find(contact => contact._id === newMessage.senderId) ||
                      get().chats.find(chat => chat._id === newMessage.senderId);
        
        if (sender && 'Notification' in window && Notification.permission === 'granted') {
          new Notification(`New message from ${sender.fullName}`, {
            body: newMessage.text || 'Sent an image',
            icon: sender.profilePic || '/avatar.png',
            tag: newMessage.senderId
          });
        }
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  requestNotificationPermission: async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  },

  getTotalUnreadCount: () => {
    const { unreadCounts } = get();
    return Object.values(unreadCounts).reduce((total, count) => total + count, 0);
  },
}));
