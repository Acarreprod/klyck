"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Download, Heart, Share2, X, ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock gallery photos
const galleryPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/placeholder.svg?height=800&width=1200&text=Photo ${i + 1}`,
  liked: false,
}))

export default function FinalGallery() {
  const [photos, setPhotos] = useState(galleryPhotos)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const toggleLike = (id: number) => {
    setPhotos((prev) => prev.map((photo) => (photo.id === id ? { ...photo, liked: !photo.liked } : photo)))
  }

  const openLightbox = (id: number) => {
    setSelectedPhoto(id)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    if (selectedPhoto === null) return
    const currentIndex = photos.findIndex((photo) => photo.id === selectedPhoto)
    const nextIndex = (currentIndex + 1) % photos.length
    setSelectedPhoto(photos[nextIndex].id)
  }

  const prevPhoto = () => {
    if (selectedPhoto === null) return
    const currentIndex = photos.findIndex((photo) => photo.id === selectedPhoto)
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    setSelectedPhoto(photos[prevIndex].id)
  }

  const selectedPhotoData = selectedPhoto !== null ? photos.find((photo) => photo.id === selectedPhoto) : null

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-primary">KLYCK</h1>
            <h2 className="text-lg font-medium">Summer Wedding 2023</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Download All
            </Button>
            <Link href="/photographer-dashboard">
              <Button size="sm">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Client Gallery</h1>
              <p className="text-muted-foreground">12 photos • Created April 13, 2025</p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <Input id="search" placeholder="Search photos..." className="w-[200px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <Card key={photo.id} className="group overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className="relative aspect-[3/2] w-full cursor-pointer overflow-hidden"
                    onClick={() => openLightbox(photo.id)}
                  >
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={`Photo ${photo.id}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(photo.id)
                        }}
                      >
                        <Heart className={`h-4 w-4 ${photo.liked ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    {photo.liked && (
                      <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">Favorite</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <Dialog open={selectedPhoto !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <div className="relative flex h-[80vh] w-full items-center justify-center">
            {selectedPhotoData && (
              <Image
                src={selectedPhotoData.src || "/placeholder.svg"}
                alt={`Photo ${selectedPhotoData.id}`}
                fill
                className="object-contain"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  selectedPhotoData && toggleLike(selectedPhotoData.id)
                }}
              >
                <Heart className={`h-5 w-5 ${selectedPhotoData?.liked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full">
                <Download className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 p-0 text-white hover:bg-black/50"
              onClick={prevPhoto}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 p-0 text-white hover:bg-black/50"
              onClick={nextPhoto}
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
