"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Download,
  Edit,
  ExternalLink,
  ImageIcon,
  Mail,
  MoreHorizontal,
  Share2,
  Trash2,
  Users,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock project data
const project = {
  id: 1,
  name: "Summer Wedding 2023",
  client: "John & Jane Doe",
  date: "April 10, 2025",
  status: "Active",
  photos: 120,
  selected: 85,
  delivered: 72,
  thumbnail: "/placeholder.svg?height=400&width=600&text=Wedding",
  description: "Wedding photography for John and Jane Doe at Sunset Gardens.",
  clientEmail: "john.jane@example.com",
  createdAt: "March 15, 2025",
  lastUpdated: "April 12, 2025",
}

// Mock gallery photos
const galleryPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/placeholder.svg?height=400&width=600&text=Photo ${i + 1}`,
  selected: i < 8,
  delivered: i < 6,
}))

export default function ProjectDetail() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/photographer-dashboard"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <p className="text-muted-foreground">
                  {project.client} • {project.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" /> Edit
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" /> Email Client
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" /> Download All
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                  <CardDescription>View and manage your project details and progress.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="mb-2 font-medium">Project Details</h3>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Status:</dt>
                          <dd>
                            <Badge className="bg-green-500 hover:bg-green-600">{project.status}</Badge>
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Client:</dt>
                          <dd>{project.client}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Event Date:</dt>
                          <dd>{project.date}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Created:</dt>
                          <dd>{project.createdAt}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Last Updated:</dt>
                          <dd>{project.lastUpdated}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Client Email:</dt>
                          <dd>{project.clientEmail}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">Project Progress</h3>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Photos Uploaded</span>
                            <span className="font-medium">
                              {project.photos} / {project.photos}
                            </span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Photos Selected</span>
                            <span className="font-medium">
                              {project.selected} / {project.photos}
                            </span>
                          </div>
                          <Progress value={(project.selected / project.photos) * 100} className="h-2" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Photos Delivered</span>
                            <span className="font-medium">
                              {project.delivered} / {project.selected}
                            </span>
                          </div>
                          <Progress value={(project.delivered / project.selected) * 100} className="h-2" />
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                          <Link href="/gallery-selection">
                            <Button variant="outline" size="sm">
                              Continue Selecting
                            </Button>
                          </Link>
                          <Link href="/final-gallery">
                            <Button size="sm" className="gap-2">
                              <ExternalLink className="h-3.5 w-3.5" /> View Gallery
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="all" className="mt-6">
                <TabsList>
                  <TabsTrigger value="all">All Photos</TabsTrigger>
                  <TabsTrigger value="selected">Selected</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {galleryPhotos.map((photo) => (
                      <div key={photo.id} className="group relative aspect-[3/2] overflow-hidden rounded-md border">
                        <img
                          src={photo.src || "/placeholder.svg"}
                          alt={`Photo ${photo.id}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {photo.selected && (
                          <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <ImageIcon className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="selected" className="mt-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {galleryPhotos
                      .filter((photo) => photo.selected)
                      .map((photo) => (
                        <div key={photo.id} className="group relative aspect-[3/2] overflow-hidden rounded-md border">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={`Photo ${photo.id}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="delivered" className="mt-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {galleryPhotos
                      .filter((photo) => photo.delivered)
                      .map((photo) => (
                        <div key={photo.id} className="group relative aspect-[3/2] overflow-hidden rounded-md border">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={`Photo ${photo.id}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" alt={project.client} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{project.client}</h3>
                      <p className="text-sm text-muted-foreground">{project.clientEmail}</p>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Mail className="h-3.5 w-3.5" /> Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Gallery Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Total Views:</dt>
                      <dd className="font-medium">24</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Client Selections:</dt>
                      <dd className="font-medium">18 photos</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Downloads:</dt>
                      <dd className="font-medium">12</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Last Viewed:</dt>
                      <dd className="font-medium">2 hours ago</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Client viewed gallery</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Download className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Client downloaded 3 photos</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Gallery shared with client</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">72 photos delivered</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
