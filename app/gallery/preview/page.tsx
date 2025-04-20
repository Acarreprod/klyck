"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { KlyckLayout } from "@/components/klyck-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, ExternalLink, Share2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Generate mock photos
const generatePhotos = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder.svg?height=400&width=600&text=Photo ${i + 1}`,
    category: ["All", ["Kisses", "Dance", "Rings", "Preparing", "Car", "Family", "Close-up"][i % 7]],
  }))
}

export default function GalleryPreview() {
  const router = useRouter()
  const [photos] = useState(generatePhotos())
  const [activeTab, setActiveTab] = useState("All")
  const [projectData, setProjectData] = useState<any>(null)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    // Get project data from localStorage
    const data = localStorage.getItem("klyckProjectData")
    if (data) {
      setProjectData(JSON.parse(data))
    }
  }, [])

  const categories = ["All", "Kisses", "Dance", "Rings", "Preparing", "Car", "Family", "Close-up"]

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://demo.klyck.vercel.app/gallery/client-view")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendEmail = () => {
    setShareDialogOpen(false)
    // Simulate email sending
    setTimeout(() => {
      alert("Email sent to client!")
    }, 500)
  }

  const handleClientView = () => {
    router.push("/gallery/client-view")
  }

  return (
    <KlyckLayout showPhotographerHeader>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{projectData?.title || "Summer Wedding 2023"}</h1>
              <p className="text-gray-600">Gallery preview - {photos.length} photos</p>
            </div>
            <div className="mt-4 flex gap-3 sm:mt-0">
              <Button variant="outline" className="gap-2" onClick={() => setShareDialogOpen(true)}>
                <Share2 className="h-4 w-4" /> Share with client
              </Button>
              <Button className="gap-2 bg-yellow-400 text-black hover:bg-yellow-500" onClick={handleClientView}>
                <ExternalLink className="h-4 w-4" /> Client view
              </Button>
            </div>
          </div>

          <Alert className="mt-6 bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-yellow-800">
              This is a preview of how your client will see the gallery. You can share this link with your client or
              view it yourself.
            </AlertDescription>
          </Alert>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm">
              <span className="font-medium">Client:</span>
              <span>{projectData?.clientEmail || "client@example.com"}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm">
              <span className="font-medium">Selection limit:</span>
              <span>{projectData?.numberOfPhotos || "20"} photos</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm">
              <span className="font-medium">Password protected:</span>
              <span>{projectData?.passwordProtected ? "Yes" : "No"}</span>
            </div>
          </div>
        </motion.div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant={previewMode ? "outline" : "default"}
              onClick={() => setPreviewMode(false)}
              className="gap-2"
            >
              Grid view
            </Button>
            <Button
              variant={previewMode ? "default" : "outline"}
              onClick={() => setPreviewMode(true)}
              className="gap-2"
            >
              Client preview
            </Button>
          </div>
        </div>

        {previewMode ? (
          <div className="rounded-lg border p-8 text-center">
            <div className="mx-auto max-w-md">
              <Image
                src="/placeholder.svg?height=300&width=400&text=Client+Preview"
                alt="Client preview"
                width={400}
                height={300}
                className="mx-auto mb-6 rounded-lg"
              />
              <h2 className="text-2xl font-bold">{projectData?.title || "Summer Wedding 2023"}</h2>
              <p className="mt-2 text-gray-600">
                {projectData?.description || "Select your favorite photos from your recent photoshoot."}
              </p>
              <div className="mt-6">
                <Button className="gap-2 bg-yellow-400 text-black hover:bg-yellow-500" onClick={handleClientView}>
                  <ExternalLink className="h-4 w-4" /> View as client
                </Button>
              </div>
            </div>
          </div>
        ) : (
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
                  .map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      className="group relative overflow-hidden rounded-2xl border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * (index % 10) }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={`Photo ${photo.id}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share gallery with client</DialogTitle>
            <DialogDescription>Send your client a link to view and select their photos.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link">Gallery link</Label>
              <div className="flex items-center space-x-2">
                <Input id="link" value="https://demo.klyck.vercel.app/gallery/client-view" readOnly />
                <Button size="icon" variant="outline" onClick={handleCopyLink}>
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Send via email</Label>
              <Input id="email" type="email" value={projectData?.clientEmail || "client@example.com"} readOnly />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} className="bg-yellow-400 text-black hover:bg-yellow-500">
              Send email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </KlyckLayout>
  )
}
