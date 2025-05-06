import { CatFact } from "@/components/CatQuiz/types"

export async function fetchCatFacts(limit: number): Promise<CatFact[]> {
  const randomParam = Math.floor(Math.random() * 100000)
  const response = await fetch(
    `https://catfact.ninja/facts?limit=${limit}&random=${randomParam}`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch cat facts")
  }
  const data = await response.json()
  return data.data as CatFact[]
}
