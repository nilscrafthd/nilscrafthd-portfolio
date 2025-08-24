import SectionHero from "../section-hero"

export default function AboutHero() {
  return (
    <SectionHero
      title="About"
      description="I briefly talked about myself."
      icon="fas fa-user"
      gradientFrom="from-yellow-600"
      gradientTo="to-amber-800"
      shadowColor="shadow-amber-800/20"
    />
  )
}
