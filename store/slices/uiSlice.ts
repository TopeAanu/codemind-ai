import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  theme: "dark" | "light"
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  notifications: Array<{
    id: string
    type: "success" | "warning" | "error" | "info"
    message: string
    timestamp: string
  }>
}

const initialState: UIState = {
  theme: "dark",
  sidebarOpen: true,
  mobileMenuOpen: false,
  notifications: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark"
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    addNotification: (state, action: PayloadAction<Omit<UIState["notifications"][0], "id" | "timestamp">>) => {
      state.notifications.push({
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
  },
})

export const { toggleTheme, toggleSidebar, toggleMobileMenu, addNotification, removeNotification } = uiSlice.actions
export default uiSlice.reducer
