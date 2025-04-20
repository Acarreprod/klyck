"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock photo data
const photos = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  src: `/placeholder.svg?height=400&width=600&text=Photo ${i + 1}`,
  selected: false,
}))

export default function GallerySelection() {
  const router = useRouter()
  const [selectedPhotos, setSelectedPhotos] = useState(photos)
  const selectedCount = selectedPhotos.filter((photo) => photo.selected).length

  const togglePhotoSelection = (id: number) => {
    setSelectedPhotos((prev) =>
      prev.map((photo) => (photo.id === id ? { ...photo, selected: !photo.selected } : photo)),
    )
  }

  const handleContinue = () => {
    if (selectedCount > 0) {
      router.push("/selection-summary")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link
                href="/create-project"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground mb-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Project Details
              </Link>
              <h1 className="text-2xl font-bold">Select Photos for Gallery</h1>
              <p className="text-muted-foreground">Choose the photos you want to include in your client gallery.</p>
            </div>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-sm">
                      <Info className="h-4 w-4" />
                      <span>Selection Info</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click on photos to select them for your gallery.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Badge variant="outline" className="text-sm">
                {selectedCount} selected
              </Badge>
              <Button onClick={handleContinue} disabled={selectedCount === 0} className="gap-2">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {selectedPhotos.map((photo) => (
              <Card
                key={photo.id}
                className={`group relative cursor-pointer overflow-hidden transition-all duration-200 ${
                  photo.selected ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
                onClick={() => togglePhotoSelection(photo.id)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={`Photo ${photo.id}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {photo.selected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-5 w-5" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
