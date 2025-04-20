import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, HelpCircle, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

export function MainNav() {
  return (
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
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                KLYCK
              </Link>
              <Link href="/photographer-dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/create-project" className="text-sm font-medium">
                Create Project
              </Link>
              <Link href="/gallery-selection" className="text-sm font-medium">
                Gallery Selection
              </Link>
              <Link href="/final-gallery" className="text-sm font-medium">
                Client Galleries
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 text-lg font-semibold mr-4">
          KLYCK
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/photographer-dashboard" className="font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/create-project" className="font-medium transition-colors hover:text-primary">
            Create Project
          </Link>
          <Link href="/gallery-selection" className="font-medium transition-colors hover:text-primary">
            Gallery Selection
          </Link>
          <Link href="/final-gallery" className="font-medium transition-colors hover:text-primary">
            Client Galleries
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:block">
            <Input type="search" placeholder="Search..." className="w-[200px] lg:w-[300px]" />
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
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>PH</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
