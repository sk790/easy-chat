import { create } from "zustand";

const useGetFriendRequests = create((set) => ({
  friendRequest: [],
  setMessages: (messages) => set({ messages }),
}));

export default useGetFriendRequests;