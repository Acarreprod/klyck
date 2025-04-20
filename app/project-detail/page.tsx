"use client"

import { useState } from "react"
import Image from "next/image"
import { KlyckLayout } from "@/components/klyck-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Clock } from "lucide-react"

export default function ProjectDetail() {
  const [activeTab, setActiveTab] = useState("All")

  const categories = ["All", "Commented"]

  // Mock project data
  const project = {
    id: 1,
    title: "Shooting Maison Francis Kurkdjian",
    client: "Julie Dupont",
    date: "16 novembre 2023 à 14:30",
    projectId: "PH-2023-349",
    photosSelected: 25,
    additionalPhotos: 5,
    timeline: [
      { date: "14 Nov 2023", text: "Première connexion à la galerie", time: "10:23" },
      { date: "15 Nov 2023", text: "A commencé la sélection (12 photos)", time: "14:19" },
      { date: "16 Nov 2023", text: "A continué la sélection (8 photos de plus)", time: "09:45" },
      { date: "16 Nov 2023", text: "A validé sa sélection finale (25 photos)", time: "14:30" },
    ],
  }

  // Generate mock photos
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder.svg?height=400&width=600&text=Photo ${i + 1}`,
    commented: i < 5,
  }))

  return (
    <KlyckLayout showPhotographerHeader>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="text-sm text-gray-500">Sélection de photos par le client</p>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 21C20 18.87 18.33 17.04 16 16.28C14.8 15.86 13.4 15.6 12 15.6C10.6 15.6 9.2 15.86 8 16.28C5.67 17.04 4 18.87 4 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium">Client: Julie Dupont</span>
              </div>

              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 8V12L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>Date de sélection: {project.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 21V9" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>ID du projet: {project.projectId}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Photos sélectionnées: {project.photosSelected}</span>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-medium">Résumé de la sélection</h3>
              <div className="flex justify-between">
                <span>Photos incluses:</span>
                <span className="font-medium">{project.photosSelected}</span>
              </div>
              <div className="flex justify-between">
                <span>Additional photos:</span>
                <span className="font-medium">{project.additionalPhotos}</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" /> Download selection
                </Button>
                <Button className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500">Approve selection</Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 font-medium">Quick actions</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6L12 13L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Contact the client
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Upload delivery files
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 10H23"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Archive project
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold">Selected photos</h2>
          <p className="mb-4 text-sm text-gray-600">25 photos selected by Julie Dupont</p>

          <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="px-4 py-2">
                  {category} {category === "Commented" && "(5)"}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {photos
                  .filter((photo) => activeTab === "All" || (activeTab === "Commented" && photo.commented))
                  .map((photo) => (
                    <div key={photo.id} className="group relative overflow-hidden rounded-2xl border">
                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={`Photo ${photo.id}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 font-medium">Chronologie</h3>
          <div className="space-y-4">
            {project.timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  <Clock className="h-3 w-3" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.text}</p>
                  <p className="text-xs text-gray-500">
                    {item.date}, {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </KlyckLayout>
  )
}
