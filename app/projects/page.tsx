"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { KlyckLayout } from "@/components/klyck-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock project data
const projects = Array.from({ length: 16 }, (_, i) => {
  const isEven = i % 2 === 0
  return {
    id: i + 1,
    name: isEven ? "Elgrandetoto" : "Alicia & Malcom",
    photos: Math.floor(Math.random() * 500) + 20,
    status: Math.random() > 0.7 ? "Client selecting" : "Delivery",
  }
})

export default function Projects() {
  const [filter, setFilter] = useState("all")

  return (
    <KlyckLayout showPhotographerHeader>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">Show:</span>
            <Button variant="outline" size="sm" className="h-8">
              All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project) => (
            <Link href="/project-detail" key={project.id}>
              <div className="group overflow-hidden rounded-lg border transition-all duration-200 hover:shadow-md">
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=${project.name}`}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                  {project.status === "Client selecting" && (
                    <Badge className="absolute top-2 right-2 bg-orange-500">Client selecting</Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.photos} photos</p>
                  <Button size="sm" className="mt-2 bg-yellow-400 text-black hover:bg-yellow-500">
                    Delivery
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </KlyckLayout>
  )
}
