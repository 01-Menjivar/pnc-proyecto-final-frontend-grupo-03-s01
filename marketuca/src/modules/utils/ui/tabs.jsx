"use client"

import React, { useState } from "react"

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  // Clone children and pass activeTab and setActiveTab
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeTab, setActiveTab })
    }
    return child
  })

  return <div className="w-full">{childrenWithProps}</div>
}

export function TabsList({ children, activeTab, setActiveTab, className = "" }) {
  // Clone children and pass activeTab and setActiveTab
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeTab, setActiveTab })
    }
    return child
  })

  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 ${className}`}>
      {childrenWithProps}
    </div>
  )
}

export function TabsTrigger({ children, value, activeTab, setActiveTab, className = "" }) {
  const isActive = activeTab === value

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        isActive ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500 hover:text-gray-900"
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children, value, activeTab }) {
  if (value !== activeTab) return null

  return <div className="mt-2">{children}</div>
}
