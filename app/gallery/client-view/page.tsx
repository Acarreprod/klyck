"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Heart, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Generate mock photos
const generatePhotos = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder.svg?height=400&width=600&text=Photo ${i + 1}`,
    category: ["All", ["Kisses", "Dance", "Rings", "Preparing", "Car", "Family", "Close-up"][i % 7]],
    selected: false,
  }))
}

export default function ClientGalleryView() {
  const router = useRouter()
  const [photos, setPhotos] = useState(generatePhotos())
  const [activeTab, setActiveTab] = useState("All")
  const [projectData, setProjectData] = useState<any>(null)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [selectionStatus, setSelectionStatus] = useState<"under" | "exact" | "over">("under")
  const [showConfetti, setShowConfetti] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const maxSelections = projectData?.numberOfPhotos ? Number.parseInt(projectData.numberOfPhotos) : 20
  const selectedCount = photos.filter((photo) => photo.selected).length

  useEffect(() => {
    // Get project data from localStorage
    const data = localStorage.getItem("klyckProjectData")
    if (data) {
      const parsedData = JSON.parse(data)
      setProjectData(parsedData)

      // If password protected, show password dialog
      if (parsedData.passwordProtected && !authenticated) {
        setPasswordDialogOpen(true)
      } else {
        setAuthenticated(true)
      }
    } else {
      // Default to authenticated if no project data
      setAuthenticated(true)
    }
  }, [authenticated])

  useEffect(() => {
    if (selectedCount < maxSelections) {
      setSelectionStatus("under")
    } else if (selectedCount === maxSelections) {
      setSelectionStatus("exact")
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } else {
      setSelectionStatus("over")
    }
  }, [selectedCount, maxSelections])

  const categories = ["All", "Kisses", "Dance", "Rings", "Preparing", "Car", "Family", "Close-up"]

  const togglePhotoSelection = (id: number) => {
    setPhotos(photos.map((photo) => (photo.id === id ? { ...photo, selected: !photo.selected } : photo)))
  }

  const resetSelection = () => {
    setPhotos(photos.map((photo) => ({ ...photo, selected: false })))
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if password matches
    if (projectData?.galleryPassword === password || password === "demo") {
      setPasswordDialogOpen(false)
      setAuthenticated(true)
    } else {
      setPasswordError(true)
    }
  }

  const confirmSelection = () => {
    if (selectedCount > 0) {
      setConfirmDialogOpen(true)
    }
  }

  const finalizeSelection = () => {
    setConfirmDialogOpen(false)
    router.push("/gallery/thank-you")
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enter Gallery Password</DialogTitle>
              <DialogDescription>
                This gallery is password protected. Please enter the password to view the photos.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter gallery password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError(false)
                    }}
                    className={passwordError ? "border-red-500" : ""}
                  />
                  {passwordError && <p className="text-sm text-red-500">Incorrect password. Please try again.</p>}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500">
                  Enter Gallery
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-primary">KLYCK</h1>
            <h2 className="text-lg font-medium">{projectData?.title || "Summer Wedding 2023"}</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Heart className="h-4 w-4" /> Favorites
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Info className="h-4 w-4" /> Help
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-2 text-3xl font-bold">Select Your Favorite Photos</h1>
            <p className="max-w-2xl text-gray-600">
              You can choose up to {maxSelections} photos for editing. Click on the ones you want to keep. Once
              validated, your photographer will receive your selection.
            </p>

            <motion.div
              className="mt-6 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  className={`absolute left-0 top-0 h-full ${
                    selectionStatus === "over"
                      ? "bg-red-500"
                      : selectionStatus === "exact"
                        ? "bg-green-500"
                        : "bg-yellow-400"
                  }`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min((selectedCount / maxSelections) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span
                  className={`font-medium ${
                    selectionStatus === "over" ? "text-red-500" : selectionStatus === "exact" ? "text-green-500" : ""
                  }`}
                >
                  {selectedCount} / {maxSelections} selected
                  {selectionStatus === "over" && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                      <AlertTriangle className="ml-1 inline h-4 w-4" />
                    </motion.span>
                  )}
                  {selectionStatus === "exact" && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                      <span className="ml-1">🎉</span>
                    </motion.span>
                  )}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 flex w-full justify-start space-x-4 overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="px-4 py-2">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {photos
                  .filter((photo) => activeTab === "All" || photo.category.includes(activeTab))
                  .map((photo) => (
                    <motion.div
                      key={photo.id}
                      layout
                      className={`group relative cursor-pointer overflow-hidden rounded-2xl border ${
                        photo.selected ? "ring-2 ring-yellow-400" : ""
                      }`}
                      onClick={() => togglePhotoSelection(photo.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={`Photo ${photo.id}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <AnimatePresence>
                          {photo.selected && (
                            <motion.div
                              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12L10 17L20 7"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex items-center justify-between">
            <div
              className={`text-lg font-medium ${
                selectionStatus === "over" ? "text-red-500" : selectionStatus === "exact" ? "text-green-500" : ""
              }`}
            >
              {selectedCount} selected
              {selectionStatus === "over" && <AlertTriangle className="ml-1 inline h-5 w-5" />}
              {selectionStatus === "exact" && <span className="ml-1">🎉</span>}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={resetSelection}>
                Reset selection
              </Button>
              <Button
                onClick={confirmSelection}
                disabled={selectedCount === 0}
                className="bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Confirm selection
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Confetti effect when selection is exact */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ["#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#ffffff"][Math.floor(Math.random() * 5)],
                top: `${Math.random() * -10}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                top: `${100 + Math.random() * 20}%`,
                left: `${Math.random() * 100}%`,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Selection</DialogTitle>
            <DialogDescription>
              You've selected {selectedCount} photos. Once confirmed, your selection will be sent to your photographer.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
              <p>Your photographer will be notified of your selection and will begin editing these photos.</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Go back and review
            </Button>
            <Button onClick={finalizeSelection} className="bg-yellow-400 text-black hover:bg-yellow-500">
              Confirm selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
