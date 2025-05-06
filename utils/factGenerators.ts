export function generatePlausibleWords(word: string): string[] {
    const catRelatedWords = [
      "whiskers","paws","claws","tail","fur","meow","purr","kitten","feline",
      "domestic","wild","predator","nocturnal","agile","independent",
      "territorial","sensitive","flexible","retractable","carnivore",
      "hunter","grooming","scratching","climbing","jumping",
    ]
  
    const filtered = catRelatedWords.filter(
      (w) =>
        w !== word.toLowerCase() &&
        !w.includes(word.toLowerCase()) &&
        !word.toLowerCase().includes(w)
    )
  
    return filtered.sort(() => Math.random() - 0.5).slice(0, 3)
  }
  
  export function generateFalseCatFact(): string {
    const falseFacts = [
      "Cats have exactly nine lives due to their exceptional reflexes and survival instincts.",
      "Cats cannot taste sweetness because they lack the necessary taste receptors.",
      "All cats are born with blue eyes that change color as they age.",
      "Cats purr only when they are happy or content.",
      "A cat's heart beats twice as fast as a human heart, at 240 beats per minute.",
      "Cats cannot see color, they only see in black and white.",
      "Cats have five toes on their front paws but only four on their back paws.",
      "Cats lose their ability to land on their feet if they fall from heights greater than 7 stories.",
      "The average house cat can run faster than Usain Bolt at top speed.",
      "Cats have a third eyelid that glows in the dark to help with night vision.",
      "Cats can predict earthquakes up to 10 minutes before they occur.",
      "A cat's brain is more similar to a human's brain than a dog's brain.",
      "Cats were domesticated only 500 years ago, making them one of the most recently domesticated animals.",
      "Cats cannot feel pain in their tails, which is why they don't mind having them pulled.",
      "All calico cats are female without exception.",
      "Cats have perfect memory recall and can remember every human they've ever met.",
      "Cats can see perfectly in complete darkness with no light source.",
      "A cat's whiskers will grow back if trimmed, but they will be a different color.",
      "Cats cannot contract or transmit any human diseases.",
      "Cats only meow when they are hungry or in pain.",
    ]
  
    return falseFacts[Math.floor(Math.random() * falseFacts.length)]
  }
  