import {Loader2 } from "lucide-react"

export function Loading() {
  return (
    <div className="absolute z-[1] bg-blueDetails w-full h-10 flex items-center justify-center overflow-hidden">
      <Loader2 width="10px" className="w-7 h-7 animate-spin"/>
    </div>
  )
}