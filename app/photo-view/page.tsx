"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { KlyckLayout } from "@/components/klyck-layout"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

export default function PhotoView() {
  const router = useRouter()
  const [liked, setLiked] = useState(false)

  return (
    <KlyckLayout>
      <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-yellow-50 p-4">
        <div className="relative mx-auto max-w-4xl">
          <div className="relative aspect-[3/4] w-full max-w-2xl overflow-hidden rounded-lg">
            <Image src="/images/bride-with-dog.jpg" alt="Bride with dog" fill className="object-cover" />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`absolute right-4 top-4 h-10 w-10 rounded-full ${
              liked ? "bg-red-100 text-red-500" : "bg-white"
            }`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`h-6 w-6 ${liked ? "fill-red-500" : ""}`} />
          </Button>
        </div>
      </div>
      <div className="py-2 text-center text-sm text-gray-500">image10542.jpg</div>
    </KlyckLayout>
  )
}
