import confetti from 'canvas-confetti'

function randomInRange(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const confettishow = () => {
  confetti({
    angle: randomInRange(55, 125),
    spread: 360,
    particleCount: 1200,
    origin: { y: 0.6 },
  })
}
