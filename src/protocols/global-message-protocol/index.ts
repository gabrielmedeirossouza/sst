export type GlobalMessageProtocol = {
  "script-loaded": void
  "select-stream": "NETFLIX" | "AMAZON_PRIME" | "YOUTUBE"
  "detected-stream": "DETECTED_NETFLIX" | "DETECTED_AMAZON_PRIME" | "DETECTED_YOUTUBE"
}