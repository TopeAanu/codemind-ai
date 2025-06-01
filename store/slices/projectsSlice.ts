import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Project {
  id: string
  name: string
  description: string
  language: string
  lastModified: string
  status: "active" | "archived" | "error"
  githubUrl?: string
  analysisCount: number
}

interface ProjectsState {
  items: Project[]
  loading: boolean
  error: string | null
  viewMode: "grid" | "list"
  searchQuery: string
  filterLanguage: string
}

const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
  viewMode: "grid",
  searchQuery: "",
  filterLanguage: "",
}

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload
      state.loading = false
    },
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.unshift(action.payload)
    },
    updateProject: (state, action: PayloadAction<{ id: string; updates: Partial<Project> }>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates }
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setFilterLanguage: (state, action: PayloadAction<string>) => {
      state.filterLanguage = action.payload
    },
  },
})

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  addProject,
  updateProject,
  deleteProject,
  setViewMode,
  setSearchQuery,
  setFilterLanguage,
} = projectsSlice.actions
export default projectsSlice.reducer
