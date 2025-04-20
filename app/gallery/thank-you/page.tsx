"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, Download, Share2 } from "lucide-react"

export default function ThankYouPage() {
  const [projectData, setProjectData] = useState<any>(null)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Get project data from localStorage
    const data = localStorage.getItem("klyckProjectData")
    if (data) {
      setProjectData(JSON.parse(data))
    }

    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-primary">KLYCK</h1>
            <h2 className="text-lg font-medium">{projectData?.title || "Summer Wedding 2023"}</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>
            </div>

            <h1 className="mb-4 text-center text-3xl font-bold">Thank You!</h1>
            <p className="mb-6 text-center text-lg text-gray-600">
              Your selection has been submitted successfully. Your photographer will be notified and will begin editing
              your selected photos.
            </p>

            <div className="mb-8 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
              <p>
                You selected {projectData?.numberOfPhotos || "20"} photos from your gallery. You'll receive an email
                notification when your edited photos are ready.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">What happens next?</h2>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-800">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Your photographer will review your selection</p>
                    <p className="text-sm text-gray-600">
                      They'll check your selected photos and prepare them for editing.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-800">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Editing process begins</p>
                    <p className="text-sm text-gray-600">
                      Your photos will be professionally edited according to your photographer's style.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-800">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Final delivery</p>
                    <p className="text-sm text-gray-600">
                      You'll receive an email when your edited photos are ready to view and download.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="flex justify-center">
              <Link href="/landing">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Return to Home</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Confetti effect for success confirmation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 150 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ["#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#ffffff", "#10B981"][
                  Math.floor(Math.random() * 6)
                ],
                top: `${Math.random() * -10}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                top: `${100 + Math.random() * 20}%`,
                left: `${Math.random() * 100}%`,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
