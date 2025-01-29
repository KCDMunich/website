import React from 'react';

const Team = ({ data }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            {/* Sezione superiore con titolo e descrizione */}
            <section className="safe-paddings overflow-hidden bg-opacity-10 pb-12">
                <div className="container relative text-center text-primary-1">
                    <div
                        className="absolute -top-1/2 left-1/2 h-[503px] w-[503px] -translate-x-1/2 bg-white blur-[100px] md:-left-[30%] md:h-[350px] md:w-[350px]"
                    />
                    <div className="relative">
                        <h1 className="text-4xl sm:text-6xl font-bold leading-denser">
                            {data.team.title}
                        </h1>
                        <p className="mx-auto mt-8 max-w-[1008px] text-lg sm:text-2xl leading-normal">
                            {data.team.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Sezione del team */}
            <section className="safe-paddings bg-white py-12 sm:py-16 lg:py-20">
                <div className="container">
                    <ul className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
                        {data.team.members.map((member, index) => (
                            <li className="flex flex-col items-center text-center" key={index}>

                                <div className="h-64 w-64 overflow-hidden rounded-2xl">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={member.photo}
                                        loading="lazy"
                                        alt={member.name}
                                    />
                                </div>

                                {/* Nome */}
                                <p
                                    className="mt-4 text-xl font-bold leading-normal"
                                    style={{color: '#004258'}}
                                >
                                    {member.name}
                                </p>

                                <span className="mt-2 text-primary-1 text-base">{member.position}</span>
                                <span className="mt-2 text-primary-1 text-base">{member.company}</span>
                                <a
                                    className="mt-3 text-base font-semibold underline"
                                    style={{color: '#004258'}}
                                    href={member.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Team;
