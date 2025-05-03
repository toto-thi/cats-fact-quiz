import { CatQuiz } from "@/components/cat-quiz"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-50 to-gray-100">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-purple-800">Cat Facts Quiz</h1>
        <p className="text-gray-600 text-center mb-8">Test your knowledge about our feline friends!</p>
        {/* <CatQuiz /> */}
      </div>
    </main>
  )
}
