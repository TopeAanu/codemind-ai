import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Analysis {
  id: string
  projectId?: string
  code: string
  language: string
  type: "debug" | "explain" | "test" | "docs"
  result: string
  timestamp: string
  status: "pending" | "completed" | "error"
}

interface AnalysisState {
  current: Analysis | null
  history: Analysis[]
  loading: boolean
  error: string | null
  code: string
  selectedLanguage: string
  analysisType: "debug" | "explain" | "test" | "docs"
}

const initialState: AnalysisState = {
  current: null,
  history: [],
  loading: false,
  error: null,
  code: "",
  selectedLanguage: "javascript",
  analysisType: "explain",
}

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload
    },
    setAnalysisType: (state, action: PayloadAction<"debug" | "explain" | "test" | "docs">) => {
      state.analysisType = action.payload
    },
    startAnalysis: (state, action: PayloadAction<Omit<Analysis, "id" | "timestamp" | "status" | "result">>) => {
      state.loading = true
      state.error = null
      state.current = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: "pending",
        result: "",
      }
    },
    completeAnalysis: (state, action: PayloadAction<{ id: string; result: string }>) => {
      state.loading = false
      if (state.current && state.current.id === action.payload.id) {
        state.current.result = action.payload.result
        state.current.status = "completed"
        state.history.unshift({ ...state.current })
      }
    },
    failAnalysis: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
      if (state.current) {
        state.current.status = "error"
      }
    },
    clearCurrent: (state) => {
      state.current = null
      state.error = null
    },
  },
})

export const { setCode, setLanguage, setAnalysisType, startAnalysis, completeAnalysis, failAnalysis, clearCurrent } =
  analysisSlice.actions
export default analysisSlice.reducer
