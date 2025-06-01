import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import projectsSlice from "./slices/projectsSlice"
import analysisSlice from "./slices/analysisSlice"
import uiSlice from "./slices/uiSlice"
import chatSlice from "./slices/chatSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectsSlice,
    analysis: analysisSlice,
    ui: uiSlice,
    chat: chatSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
