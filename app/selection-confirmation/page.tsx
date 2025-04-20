"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { KlyckLayout } from "@/components/klyck-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

// Generate mock photos
const generatePhotos = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder.svg?height=400&width=600&text=Photo ${i + 1}`,
    category: ["All", ["Kisses", "Dance", "Rings", "Preparing", "Car", "Family", "Close-up"][i % 7]],
  }))
}

export default function SelectionConfirmation() {
  const [photos] = useState(generatePhotos())
  const [activeTab, setActiveTab] = useState("All")
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const categories = ["All", "Kisses", "Dance", "Rings", "Preparing", "Car", "Family", "Close-up"]

  return (
    <KlyckLayout>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center space-x-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="relative h-40 w-32 rotate-3 overflow-hidden rounded-lg shadow-md"
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ rotate: (i - 2) * 5, scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Image
                  src={`/placeholder.svg?height=400&width=300&text=Wedding ${i}`}
                  alt={`Wedding sample ${i}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>

          <motion.h1
            className="mb-2 text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Your selection has been made successfully 🍑
          </motion.h1>
          <motion.p
            className="max-w-2xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Thank you for your selection. [Photographer] is currently editing your favorite photos. We will notify you
            as soon as the final photos are available.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button className="mt-4 bg-yellow-400 text-black hover:bg-yellow-500">View your selection</Button>
          </motion.div>
        </motion.div>

        <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex w-full justify-start space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="px-4 py-2">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {photos
                .filter((photo) => activeTab === "All" || photo.category.includes(activeTab))
                .map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    className="group relative overflow-hidden rounded-2xl border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index % 8), duration: 0.5 }}
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={`Photo ${photo.id}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

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
    </KlyckLayout>
  )
}
