import { Linkedin, Github, Globe } from "lucide-react"

const Team = ({ data }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
            {/* Header Section */}
            <section className="safe-paddings overflow-hidden py-16 relative">
                <div className="container relative text-center">
                    <div className="absolute -top-1/2 left-1/2 h-[503px] w-[503px] -translate-x-1/2 bg-blue-100 blur-[100px] md:-left-[30%] md:h-[350px] md:w-[350px]"></div>
                    <div className="relative">
                        <h1 className="text-4xl sm:text-6xl font-bold leading-denser text-[#004258]">{data.team.title}</h1>
                        <div className="h-1 w-16 bg-blue-500 mx-auto my-6 rounded-full"></div>
                        <p className="mx-auto mt-8 max-w-[1008px] text-lg sm:text-2xl leading-normal text-gray-700">
                            {data.team.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Members Section */}
            <section className="safe-paddings bg-white py-12 sm:py-16 lg:py-20">
                <div className="container">
                    <ul className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
                        {data.team.members
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((member, index) => (
                                <li
                                    className="flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
                                    key={index}
                                >
                                    <div className="h-48 w-48 overflow-hidden rounded-2xl shadow-md">
                                        <img
                                            className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                                            src={member.photo || "/placeholder.svg"}
                                            loading="lazy"
                                            alt={member.name}
                                        />
                                    </div>

                                    {/* Nome */}
                                    <p className="mt-4 text-base font-bold leading-normal text-[#004258]">{member.name}</p>

                                    <span className="mt-2 text-xs text-gray-600">
                    {member.position} {member.company !== "" ? "-" : ""} {member.company}
                  </span>

                                    <span className="mt-2 text-xs text-gray-600">{member.communityRole}</span>


                                    <div className="mt-3 flex space-x-4 justify-center">
                                        {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-blue-600 transition-colors"
                                            aria-label="LinkedIn"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                        </a>
                                        )}

                                        {/* GitHub */}
                                        {member.github && (
                                            <a
                                                href={member.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900 transition-colors"
                                                aria-label="GitHub"
                                            >
                                                <Github className="h-5 w-5" />
                                            </a>
                                        )}

                                        {/* Personal Website */}
                                        {member.website && (
                                            <a
                                                href={member.website}
                                                target="_blank"
                                                rel="noopener follow"
                                                className="text-gray-600 hover:text-green-600 transition-colors"
                                                aria-label="Website"
                                            >
                                                <Globe className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Team

