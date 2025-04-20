'use client'

import { useState } from "react"
import Image from "next/image"
import { KlyckLayout } from "@/components/klyck-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"

// Génère des photos factices
const generatePhotos = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder.svg?height=400&width=600&text=Photo ${i + 1}`,
    category: ["All", ["Faces", "Smiles", "Kisses", "Dance", "Rings", "Car", "Close-up"][i % 7]],
  }))
}

export default function Gallery() {
  const [photos] = useState(generatePhotos())
  const [activeTab, setActiveTab] = useState("All")

  const categories = ["All", "Faces", "Smiles", "Kisses", "Dance", "Rings", "Car", "Close-up"]

  return (
    <KlyckLayout>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
            PROJECT PHOTOS
          </div>
          <h1 className="mb-2 text-3xl font-bold">Wedding Alicia & Malcom</h1>
          <p className="max-w-3xl text-gray-600">
            We're happy to share with you the photos of the happiest day of your lives! We hope you enjoy these
            beautiful memories.
          </p>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Download all
            </Button>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Discover all</Button>
          </div>
        </div>

        {/* Featured photos grid */}
        <div className="mb-12 grid grid-cols-2 grid-rows-2 gap-2 md:grid-cols-4">
          <div className="relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=800&width=800&text=Featured 1"
              alt="Featured photo 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=400&text=Featured 2"
              alt="Featured photo 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=400&text=Featured 3"
              alt="Featured photo 3"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=400&text=Featured 4"
              alt="Featured photo 4"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=400&text=Featured 5"
              alt="Featured photo 5"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Tabs et contenu */}
        <div className="mb-6 rounded-full bg-yellow-100 p-2">
          <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex w-full justify-start space-x-4 overflow-x-auto bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-4 py-1 data-[state=active]:bg-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {photos
                  .filter((photo) => activeTab === "All" || photo.category.includes(activeTab))
                  .map((photo) => (
                    <div key={photo.id} className="group relative overflow-hidden rounded-2xl border">
                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={`Photo ${photo.id}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">Scroll for more</div>

        <div className="mt-12 rounded-lg bg-yellow-100 p-8 text-center">
          <p className="text-lg">Footer ici</p>
        </div>
      </div>
    </KlyckLayout>
  )
}