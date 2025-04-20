import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, HelpCircle, Menu, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

interface KlyckLayoutProps {
  children: React.ReactNode
  showPhotographerHeader?: boolean
}

export function KlyckLayout({ children, showPhotographerHeader = false }: KlyckLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4">
                <Link href="/landing" className="flex items-center gap-2 text-lg font-semibold">
                  KLYCK
                </Link>
                <Link href="/projects" className="text-sm font-medium">
                  Projects
                </Link>
                <Link href="/create-project" className="text-sm font-medium">
                  Create Project
                </Link>
                <Link href="/gallery/preview" className="text-sm font-medium">
                  Gallery Preview
                </Link>
                <Link href="/gallery/client-view" className="text-sm font-medium">
                  Client View
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/landing" className="flex items-center gap-2 text-lg font-semibold mr-4">
            KLYCK
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/projects" className="font-medium transition-colors hover:text-primary">
              Projects
            </Link>
            <Link href="/create-project" className="font-medium transition-colors hover:text-primary">
              Create Project
            </Link>
            <Link href="/gallery/preview" className="font-medium transition-colors hover:text-primary">
              Gallery Preview
            </Link>
            <Link href="/gallery/client-view" className="font-medium transition-colors hover:text-primary">
              Client View
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-[200px] pl-8 lg:w-[300px]" />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              <span className="sr-only">Notifications</span>
            </Button>

            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32&text=P" alt="Photographer" />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
