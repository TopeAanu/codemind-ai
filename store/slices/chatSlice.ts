import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  codeBlocks?: Array<{
    language: string
    code: string
  }>
}

interface ChatState {
  messages: Message[]
  loading: boolean
  error: string | null
  input: string
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
  input: "",
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload
    },
    addMessage: (state, action: PayloadAction<Omit<Message, "id" | "timestamp">>) => {
      state.messages.push({
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      })
    },
    startChatRequest: (state) => {
      state.loading = true
      state.error = null
    },
    completeChatRequest: (state) => {
      state.loading = false
    },
    failChatRequest: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    clearChat: (state) => {
      state.messages = []
      state.error = null
    },
  },
})

export const { setInput, addMessage, startChatRequest, completeChatRequest, failChatRequest, clearChat } =
  chatSlice.actions
export default chatSlice.reducer
