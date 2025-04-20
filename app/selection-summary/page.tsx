"use client"

import { useState } from "react"
import Image from "next/image"
import { KlyckLayout } from "@/components/klyck-layout"
import { Button } from "@/components/ui/button"

export default function SelectionSummary() {
  const [selectedPhotos] = useState(20)
  const [additionalPhotos] = useState(1)
  const [totalPrice] = useState(35)

  return (
    <KlyckLayout>
      <div className="relative min-h-screen bg-gray-100">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="relative aspect-square w-full">
                <Image
                  src={`/placeholder.svg?height=200&width=200&text=Photo ${i + 1}`}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
          <div className="flex w-full max-w-md flex-col rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start">
              <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                <Image src="/images/bride-with-dog.jpg" alt="Selected photo" fill className="object-cover" />
              </div>

              <div className="ml-4 flex-1">
                <h2 className="text-xl font-bold">Résumé de votre sélection</h2>

                <div className="mt-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Photos incluses:</span>
                    <span className="font-medium">{selectedPhotos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Photos supplémentaires:</span>
                    <span className="font-medium">{additionalPhotos} (voir)</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t pt-2">
                    <span className="font-medium">Total à payer:</span>
                    <span className="font-bold">{totalPrice}€</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Annuler
                  </Button>
                  <Button className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500">Payer</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </KlyckLayout>
  )
}
