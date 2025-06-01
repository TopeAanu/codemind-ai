"use client"

import type React from "react"

import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { useEffect } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.ui.theme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return <>{children}</>
}
