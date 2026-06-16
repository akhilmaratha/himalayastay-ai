"use client"

import Link from "next/link";

const experiences = [
  {
    title: "Village Walks",
    subtitle: "Guided by locals",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYPmaMU9_P37z1G7Nt7XN3SToCdMhCDoIcj7stg89abqn8yi7KgQvSxXI3jyHAoofJBaHuUixfvXWctqxxmrBIJeHS6FqcwoKKt4KjLFBjoiUbv-OZaYsMrU8hF09MrxUJZqeP3SUotF2_k4UuaXJoB7j9dOMpNwOSfF6gIQUmKTRxrIFR_ZoD02Kur-Hj6AZVmERV1coPIU0BpTjN17wIlu2q1UBPTW5ikrRvfGf7zmUhbmtHZa6UCkDkZBPG4afgvpxYHYQ-a5BK",
  },
  {
    title: "Traditional Cooking",
    subtitle: "Farm to hearth",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCz4GVE5NjzkMzWOdZFDnIoeYMXMxJc4pkSQupAov6e4AN3Gkgq5C_yvR9Q9FMKAe2klpZk11jz-jG8lWABHMtcPpqoqMcnOqeZcjeFFtgPyPin2TP4CafSxiM5z5LfyySGelYsTKoQikdLR5Fwz3lCdPHW5XUumcUOyBnRn6iuwASVN6oFvLp7IZSW7xTLFM918z0B32jnqPpCi0t05ZO7kXZOKUNlfWUyZWA9SZCXJ-lOkckLKWVKInckjvmHOmj1XDnDa_57F-e0",
  },
  {
    title: "Wildlife Spotting",
    subtitle: "Forest trails",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAh1Y6hSNpEDD_rIgvpljH8fk2XxVXk7FNPTpfmGnXMWVHLh4ph94NLh8Kxm3JMy3qsfP9q5VnNaOkkUTtupPBsp3Tns8Ce7KM7FB9oXaV2wGtjmrwLVMkXAtpZs9bycHvTT37aMuzSDUHnxZyRfwRYJevEKlSGoeSCZf06PDc_XUG5fj3yKwd1QOURzUKBAcyW_rHG1NBZUqI25Kmxeg8CuPsKGr3Z3wV7ZH5k1dYlvfKtj4Iw6klSOCCiuk8t55fit2GL3bO19IcO",
  },
  {
    title: "Stargazing",
    subtitle: "High altitude skies",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJxiqmGo2Cym92sYzU-PRkfJAllcps7pGWMRQNZPurq0vaoZkEfjnFQpfoZNf0ctAkRgp_6wxMQLFQhfS1TYO32Z33TkX851UlzkolYIsDr_DACu7hX6_0ZNmLGZfDzWkS7Phv09TPgRWOmLRHsd3UMwlDFpDciqeL3uchC5tNKEcMeggyWMVEj5CSnPaRjLKXqThdfiAxrl0A4PW3WR-z3Ay5Si0hCkb0rhiy4exbefLx_e8Z5cldFXognc-_0QdVZ2I-NYFxtAwB",
  },
];

export default function ExperienceSection() {
  return (
    <section className="max-w-container-max mx-auto px-sm md:px-md mt-xl md:mt-32">
      <h2 className="font-display-md text-display-md md:text-display-md font-bold text-on-background mb-2">
        Immersive Experiences
      </h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
        Engage deeply with the land and its people.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-sm md:gap-md">
        {experiences.map((exp, i) => (
          <Link
            key={i}
            href="#"
            className="group block relative aspect-square rounded-xl overflow-hidden ambient-shadow-1"
          >
            <img
              alt={exp.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={exp.image}
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h4 className="font-label-md text-label-md font-bold text-white mb-1">
                {exp.title}
              </h4>
              <p className="font-label-sm text-label-sm text-white/80">
                {exp.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
