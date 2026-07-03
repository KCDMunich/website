import Image from "next/image"
import { MapPin } from "lucide-react"

import { Section, SectionTitle } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Hotel {
  name: string
  distance?: string
  amenities?: string[]
  imageUrl?: string
  websiteUrl: string
}

const hotels: Hotel[] = [
  {
    name: "Best Western Hotel Arabellapark München",
    distance: "2 min walk",
    amenities: ["Restaurant"],
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/319612311.jpg?k=c1a8b2e40962f6b49546a1295f4b9a5fd0d3350aa33d1da269de6cdcb6e86acd&o=&hp=1",
    websiteUrl: "https://hotel-arabellapark.de/",
  },
  {
    name: "Four Points by Sheraton Munich Arabellapark",
    amenities: ["Fitnessraum", "WLAN", "Frühstück"],
    websiteUrl:
      "https://www.marriott.com/en-us/hotels/mucwi-the-westin-grand-munich/overview/",
  },
  {
    name: "The Westin Grand Munich",
    websiteUrl:
      "https://www.marriott.com/en-us/hotels/mucap-four-points-munich-arabellapark/overview/",
  },
]

export function Hotels() {
  const [highlightedHotel, ...otherHotels] = hotels

  return (
    <Section className="bg-background">
      <SectionTitle>Nearby hotels</SectionTitle>

      <Card className="mb-8 overflow-hidden border-border/60">
        {highlightedHotel.imageUrl && (
          <div className="relative h-64 w-full md:h-72">
            <Image
              src={highlightedHotel.imageUrl}
              alt={highlightedHotel.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          </div>
        )}
        <CardContent className="space-y-4 pt-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              {highlightedHotel.name}
            </h3>
            {highlightedHotel.distance && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                {highlightedHotel.distance}
              </p>
            )}
          </div>
          <Button
            nativeButton={false}
            render={<a href="mailto:info@hotel-arabellapark.de" />}
          >
            Book now
          </Button>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          More hotels nearby
        </h3>
        <ul className="space-y-3">
          {otherHotels.map((hotel) => (
            <li key={hotel.name}>
              <Card className="border-border/60 bg-muted/20">
                <CardContent className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{hotel.name}</h4>
                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {hotel.amenities.join(" · ")}
                      </p>
                    )}
                  </div>
                  <Button
                    nativeButton={false}
                    render={
                      <a
                        href={hotel.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    variant="outline"
                    size="sm"
                  >
                    Visit website
                  </Button>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}