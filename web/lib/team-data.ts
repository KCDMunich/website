export type TeamMember = {
  id: string;
  name: string;
  role: string;
  organization?: string;
  photo: string;
  linkedin: string;
};

export type TeamOrganizer = {
  name: string;
  url: string;
  logo: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "anela",
    name: "Anela Avdibegovic",
    role: "Marketing Manager",
    organization: "white duck",
    photo: "/images/team/anela_a.jpeg",
    linkedin: "https://www.linkedin.com/in/anela-avdibegovic/",
  },
  {
    id: "lesya",
    name: "Lesya Körbächer",
    role: "Scrum Master · SAFe Agilist",
    organization: "Agile Transformation Advisory",
    photo: "/images/team/LesyaKoerbaecher.jpeg",
    linkedin: "https://www.linkedin.com/in/lesyaromanyuk/",
  },
  {
    id: "martin",
    name: "Martin Brandl",
    role: "CTO",
    organization: "white duck",
    photo: "/images/team/martin.jpeg",
    linkedin: "https://www.linkedin.com/in/mbrandl/",
  },
  {
    id: "markus",
    name: "Markus Sümmchen",
    role: "CEO",
    organization: "white duck",
    photo: "/images/team/markus.jpeg",
    linkedin: "https://www.linkedin.com/in/msuemmchen/",
  },
  {
    id: "max",
    name: "Max Körbächer",
    role: "Co-founder · CNCF Ambassador",
    organization: "Liquid Reply",
    photo: "/images/team/max_k.jpg",
    linkedin: "https://www.linkedin.com/in/maxkoerbaecher/",
  },
  {
    id: "nico",
    name: "Nico Meisenzahl",
    role: "COO",
    organization: "white duck",
    photo: "/images/team/nico.png",
    linkedin: "https://www.linkedin.com/in/nicomeisenzahl/",
  },
  {
    id: "suad",
    name: "Suad Wolgram",
    role: "Product Manager & Software Engineer",
    organization: "white duck",
    photo: "/images/team/swo_kcd.jpg",
    linkedin: "https://www.linkedin.com/in/suadwolgram/",
  },
];

export const TEAM_ORGANIZERS: TeamOrganizer[] = [
  {
    name: "Liquid Reply",
    url: "https://liquidreply.com/",
    logo: "/icons-src/liquid.png",
  },
  {
    name: "white duck",
    url: "https://whiteduck.de/",
    logo: "/icons-src/whiteduck.png",
  },
];
