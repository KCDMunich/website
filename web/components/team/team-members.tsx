import Image from "next/image";
import Link from "next/link";

const TEAM_MEMBERS = [
  {
    name: "Anela Avdibegovic",
    position: "Marketing Manager - white duck",
    photo: "/images/team/anela_a.jpeg",
    url: "https://www.linkedin.com/in/anela-avdibegovic/",
  },
  {
    name: "Lesya Körbächer",
    position:
      "Scrum Master | SAFe Agilist | Agile Transformation Advisory | Freelance",
    photo: "/images/team/LesyaKoerbaecher.jpeg",
    url: "https://www.linkedin.com/in/lesyaromanyuk/",
  },
  {
    name: "Martin Brandl",
    position: "CTO - white duck",
    photo: "/images/team/martin.jpeg",
    url: "https://www.linkedin.com/in/mbrandl/",
  },
  {
    name: "Markus Sümmchen",
    position: "CEO - white duck",
    photo: "/images/team/markus.jpeg",
    url: "https://www.linkedin.com/in/msuemmchen/",
  },
  {
    name: "Max Körbächer",
    position: "Co-founder - Liquid Reply | CNCF Ambassador",
    photo: "/images/team/max_k.jpg",
    url: "https://www.linkedin.com/in/maxkoerbaecher/",
  },
  {
    name: "Nico Meisenzahl",
    position: "COO - white duck",
    photo: "/images/team/nico.png",
    url: "https://www.linkedin.com/in/nicomeisenzahl/",
  },
  {
    name: "Suad Wolgram",
    position: "Product Manager & Software Engineer - white duck",
    photo: "/images/team/swo_kcd.jpg",
    url: "https://www.linkedin.com/in/suadwolgram/",
  },
] as const;

const ORGANIZER_LOGOS = [
  {
    icon: "/icons-src/liquid.png",
    url: "http://liquidreply.com/",
    alt: "Liquid Reply",
    className: "max-h-16 w-auto max-w-[250px]",
  },
  {
    icon: "/icons-src/whiteduck.png",
    url: "https://whiteduck.de/",
    alt: "white duck",
    className: "max-h-16 w-auto max-w-[250px]",
  },
] as const;

export function TeamMembers() {
  return (
    <section className="relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-2 md:flex md:flex-wrap md:justify-evenly lg:grid-cols-4 lg:gap-6 [@media(max-width:900px)]:mx-auto [@media(max-width:900px)]:max-w-[570px]">
          {TEAM_MEMBERS.map(({ name, position, photo, url }) => (
            <li
              key={name}
              className="flex w-full max-w-[240px] flex-col sm:max-w-[200px] md:w-48 lg:w-52"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                <Image
                  src={photo}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 50vw, 240px"
                  className="object-cover"
                />
              </div>

              <p className="mt-2.5 text-2xl font-bold leading-normal text-primary sm:text-left">
                {name}
              </p>

              <span className="mt-1.5 text-muted-foreground">{position}</span>

              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 text-base font-semibold text-primary hover:underline"
              >
                LinkedIn
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-36 flex min-h-[15vh] flex-row flex-wrap items-center justify-center gap-16">
        {ORGANIZER_LOGOS.map(({ icon, url, alt, className }) => (
          <div
            key={url}
            className="flex min-h-[80px] w-[260px] items-center justify-center sm:min-h-[120px]"
          >
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full w-full items-center justify-center"
            >
              <Image
                src={icon}
                alt={alt}
                width={250}
                height={80}
                className={className}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}