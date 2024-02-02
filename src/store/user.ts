import { createSlice } from "@reduxjs/toolkit";
import { type Message, users } from "~/mockData/users";
const initialUserState=users
const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    deleteUser(state, { payload }) {
      state = state.filter((prof) => prof.id !== payload);
      return state
    },
    clearChats(state, { payload }) {
      state = state.map((item) => {
        if (item.id === payload) {
          item.messages=[];
          item.recentMessage = null;
        }
        return item;
      });
    },
    changePinState(state, { payload }) {
      state = state.map((item) => {
        if (item.id === payload) item.isPinned = !item.isPinned;
        return item;
      });
    },
    addNewMessage(
      state,
      { payload }: { payload: { id: number; message: Message } },
    ) {
      state = state.map((item) => {
        if (item.id === payload.id) {
          item.messages.push(payload.message);
          item.recentMessage = payload.message;
        }
        return item;
      });
      state = [...new Set(state)];
    },
    markAllAsRead(state,{payload}){
      state = state.map((item) => {
        if (item.id === payload)
          item.messages.map((msg) => {
            msg.read = true;
            return msg
          });
        return item;
      });
    }
  },
});
export const {
  markAllAsRead,
  addNewMessage,
  deleteUser,
  changePinState,
  clearChats,
} = UserSlice.actions;
export default UserSlice.reducer