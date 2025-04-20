"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { KlyckLayout } from "@/components/klyck-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { AlertCircle, Check, ImageIcon, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CreateProject() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    clientEmail: "",
    description: "",
    numberOfPhotos: "20",
    galleryPassword: "",
    galleryStyle: "light",
    passwordProtected: false,
    logoUploaded: false,
  })
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [formErrors, setFormErrors] = useState<{
    title?: string
    clientEmail?: string
  }>({})

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear errors when user types
    if (field === "title" || field === "clientEmail") {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    // Simulate file upload
    simulateUpload()
  }

  const handleFileUpload = () => {
    simulateUpload()
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const validateForm = () => {
    const errors: {
      title?: string
      clientEmail?: string
    } = {}

    if (!formData.title.trim()) {
      errors.title = "Project title is required"
    }

    if (!formData.clientEmail.trim()) {
      errors.clientEmail = "Client email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      errors.clientEmail = "Please enter a valid email address"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Simulate form submission
    // In a real app, we would save the data to a database
    localStorage.setItem("klyckProjectData", JSON.stringify(formData))

    // Navigate to the gallery selection page
    router.push("/gallery/preview")
  }

  return (
    <KlyckLayout showPhotographerHeader>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold">Create New Client Gallery</h1>
          <p className="mt-2 text-gray-600">Set up a new gallery for your client to select their favorite photos.</p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-lg font-semibold">Project Files</h2>
            <p className="mb-4 text-sm text-gray-600">Upload the photos you want to include in the gallery</p>

            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                dragActive ? "border-yellow-400 bg-yellow-50" : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className="mb-4 h-12 w-12 text-yellow-400" />
                <p className="mb-2 font-medium">Drop your photos here, or Browse</p>
                <p className="text-sm text-gray-500">Import a folder or a selection of photos</p>

                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={handleFileUpload}
                  disabled={isUploading || uploadComplete}
                >
                  {uploadComplete ? "Files Uploaded" : "Select Files"}
                </Button>
              </div>

              {isUploading && (
                <div className="mt-4">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-yellow-400 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Uploading... {uploadProgress}%</p>
                </div>
              )}

              {uploadComplete && (
                <div className="mt-4 flex items-center justify-center text-green-600">
                  <Check className="mr-2 h-5 w-5" />
                  <span>24 photos uploaded successfully</span>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold">Gallery Style</h2>
              <p className="mb-4 text-sm text-gray-600">Configure the appearance of the client gallery</p>

              <RadioGroup
                value={formData.galleryStyle}
                onValueChange={(value) => handleChange("galleryStyle", value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark">Dark mode</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold">Add Logo (Optional)</h2>
              <div
                className="flex items-center justify-center h-24 w-24 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors"
                onClick={() => handleChange("logoUploaded", true)}
              >
                {formData.logoUploaded ? (
                  <div className="flex items-center justify-center h-full w-full bg-yellow-100 rounded-lg">
                    <Check className="h-8 w-8 text-yellow-600" />
                  </div>
                ) : (
                  <ImageIcon className="h-8 w-8 text-yellow-400" />
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-4 text-lg font-semibold">Project Information</h2>
            <p className="mb-4 text-sm text-gray-600">These details will be shared with your client</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Project title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Summer Wedding 2023"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={formErrors.title ? "border-red-500" : ""}
                />
                {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail">
                  Client email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="client@example.com"
                  value={formData.clientEmail}
                  onChange={(e) => handleChange("clientEmail", e.target.value)}
                  className={formErrors.clientEmail ? "border-red-500" : ""}
                />
                {formErrors.clientEmail && <p className="text-sm text-red-500">{formErrors.clientEmail}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description for your client, giving any special instructions..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfPhotos">Number of photos client can select</Label>
                <Select
                  value={formData.numberOfPhotos}
                  onValueChange={(value) => handleChange("numberOfPhotos", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of photos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 photos</SelectItem>
                    <SelectItem value="20">20 photos</SelectItem>
                    <SelectItem value="30">30 photos</SelectItem>
                    <SelectItem value="50">50 photos</SelectItem>
                    <SelectItem value="100">100 photos</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  This limits how many photos your client can select from the gallery
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="passwordProtected">Password protection</Label>
                  <Switch
                    id="passwordProtected"
                    checked={formData.passwordProtected}
                    onCheckedChange={(checked) => handleChange("passwordProtected", checked)}
                  />
                </div>
                <p className="text-xs text-gray-500">Require a password to access the gallery</p>
              </div>

              {formData.passwordProtected && (
                <div className="space-y-2">
                  <Label htmlFor="galleryPassword">Gallery password</Label>
                  <Input
                    id="galleryPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.galleryPassword}
                    onChange={(e) => handleChange("galleryPassword", e.target.value)}
                  />
                </div>
              )}

              <TooltipProvider>
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    This is a demo. No actual files will be uploaded.
                    <Tooltip>
                      <TooltipTrigger className="ml-1 underline cursor-help">Learn more</TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          In the real application, files would be uploaded to secure cloud storage and processed for the
                          gallery.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </AlertDescription>
                </Alert>
              </TooltipProvider>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline">
                  Preview gallery
                </Button>
                <Button
                  type="submit"
                  className="bg-yellow-400 text-black hover:bg-yellow-500"
                  disabled={!uploadComplete}
                >
                  Create gallery
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </KlyckLayout>
  )
}
