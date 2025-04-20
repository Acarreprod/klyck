"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { Calendar, Download, Filter, ImageIcon, MoreHorizontal, Plus, Search, Settings, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock project data
const projects = [
  {
    id: 1,
    name: "Summer Wedding 2023",
    client: "John & Jane Doe",
    date: "Apr 10, 2025",
    status: "Active",
    photos: 120,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Wedding",
  },
  {
    id: 2,
    name: "Corporate Event",
    client: "Acme Inc.",
    date: "Apr 5, 2025",
    status: "Completed",
    photos: 85,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Corporate",
  },
  {
    id: 3,
    name: "Family Portrait Session",
    client: "Smith Family",
    date: "Mar 28, 2025",
    status: "Active",
    photos: 64,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Family",
  },
  {
    id: 4,
    name: "Product Photography",
    client: "Tech Gadgets Co.",
    date: "Mar 15, 2025",
    status: "Completed",
    photos: 42,
    thumbnail: "/placeholder.svg?height=400&width=600&text=Product",
  },
]

export default function PhotographerDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Photographer Dashboard</h1>
              <p className="text-muted-foreground">Manage your photography projects and client galleries.</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/create-project">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> New Project
                </Button>
              </Link>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Galleries</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">3 awaiting review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+256 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5 GB</div>
                <p className="text-xs text-muted-foreground">of 100 GB (24.5%)</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search projects..." className="w-[200px] pl-8" />
                </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {projects.map((project) => (
                  <Link href="/photographer-dashboard/project-detail" key={project.id}>
                    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={project.thumbnail || "/placeholder.svg"}
                          alt={project.name}
                          className="h-full w-full object-cover"
                        />
                        <Badge
                          className={`absolute top-2 right-2 ${
                            project.status === "Active"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Project</DropdownMenuItem>
                              <DropdownMenuItem>Share Gallery</DropdownMenuItem>
                              <DropdownMenuItem>Archive Project</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription>{project.client}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-0 text-sm text-muted-foreground">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{project.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ImageIcon className="h-3.5 w-3.5" />
                            <span>{project.photos} photos</span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {projects
                  .filter((project) => project.status === "Active")
                  .map((project) => (
                    <Link href="/photographer-dashboard/project-detail" key={project.id}>
                      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          <img
                            src={project.thumbnail || "/placeholder.svg"}
                            alt={project.name}
                            className="h-full w-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                            {project.status}
                          </Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0 text-sm text-muted-foreground">
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{project.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ImageIcon className="h-3.5 w-3.5" />
                              <span>{project.photos} photos</span>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {projects
                  .filter((project) => project.status === "Completed")
                  .map((project) => (
                    <Link href="/photographer-dashboard/project-detail" key={project.id}>
                      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          <img
                            src={project.thumbnail || "/placeholder.svg"}
                            alt={project.name}
                            className="h-full w-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600">
                            {project.status}
                          </Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0 text-sm text-muted-foreground">
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{project.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Image className="h-3.5 w-3.5" />
                              <span>{project.photos} photos</span>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
