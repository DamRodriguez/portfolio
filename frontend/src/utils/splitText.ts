export default function splitText(text: string) {
  return text.split(",").map((t) => t.trim())
}
