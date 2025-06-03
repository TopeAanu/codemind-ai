"use client";

import type * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ThemedSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
}

interface ThemedSelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function ThemedSelect({
  value,
  onValueChange,
  placeholder,
  className,
  children,
}: ThemedSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white",
          className
        )}
      >
        <SelectValue
          placeholder={placeholder}
          className="text-gray-900 dark:text-white"
        />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
        {children}
      </SelectContent>
    </Select>
  );
}

export function ThemedSelectItem({
  value,
  children,
  className,
}: ThemedSelectItemProps) {
  return (
    <SelectItem
      value={value}
      className={cn(
        "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700",
        className
      )}
    >
      {children}
    </SelectItem>
  );
}
