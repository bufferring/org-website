import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTelegram } from "react-icons/fa";

const TeamCarousel = () => {
  const divisions = [
    {
      name: "Frontend Division",
      members: [
        {
          id: 1,
          name: "Miguel Pérez",
          role: "Frontend Lead Dev", // Lead
          github: "https://github.com/PotOfCode",
          githubUser: "PotOfCode",
          telegramUser: "PotOfCode",
        },
        {
          id: 2,
          name: "Yumeybelli Monasterio",
          role: "Developer", // Developer
          github: "https://github.com/Yumesitahack",
          githubUser: "Yumesitahack",
          telegramUser: "Yume_08",
        },
        {
          id: 3,
          name: "Alfonzo Maestre",
          role: "Developer", // Developer
          github: "https://github.com/AlfonzoPro",
          githubUser: "AlfonzoPro",
          telegramUser: "AlfonzoPro",
        },
        {
          id: 4,
          name: "Pietro Sánchez",
          role: "Developer", // Developer
          github: "https://github.com/P13tr04",
          githubUser: "P13tr04",
          telegramUser: "P13tr04",
        },
        {
          id: 5,
          name: "Yorbys Montilla",
          role: "Developer", // Developer
          github: "https://github.com/onweb-kym",
          githubUser: "onweb-kym",
          telegramUser: "Yorbysm",
        },
      ],
    },
    {
      name: "Backend Division",
      members: [
        {
          id: 1,
          name: "Luis Ramirez",
          role: "Backend Lead Dev", // Lead
          github: "https://github.com/MrTanuk",
          githubUser: "MrTanuk",
          telegramUser: "MrTanuk",
        },
        {
          id: 2,
          name: "Jesus Vasquez",
          role: "Developer", // Developer
          github: "https://github.com/zayas1234",
          githubUser: "zayas1234",
          telegramUser: "zayas1234",
        },
        {
          id: 3,
          name: "Bermys Santana",
          role: "Developer", // Developer
          github: "https://github.com/Ailya45",
          githubUser: "Ailya45",
          telegramUser: "Ailya45",
        },
        {
          id: 4,
          name: "José Velazque",
          role: "Developer", // Developer
          github: "https://github.com/Velangel",
          githubUser: "Velangel",
          telegramUser: "Velazquemamadisimo",
        },
        {
          id: 5,
          name: "Carlos Ortiz",
          role: "Developer", // Developer
          github: "https://github.com/Hades-dev-code",
          githubUser: "Hades-dev-code",
          telegramUser: "Hades-dev-code",
        },
        {
          id: 6,
          name: "Rafael Rodríguez",
          role: "Developer", // Developer
          github: "https://github.com/GrandR4",
          githubUser: "GrandR4",
          telegramUser: "Grand_R4",
        },
        {
          id: 7,
          name: "Josue Carrillo",
          role: "Developer", // Developer
          github: "https://github.com/WolveJC",
          githubUser: "WolveJC",
          telegramUser: "WolveJC05",
        },
      ],
    },
    {
      name: "AI Division",
      members: [
        {
          id: 1,
          name: "Raymon Reyes",
          role: "AI Lead Dev", // Lead
          github: "https://github.com/Ray-Phamton",
          githubUser: "Ray-Phamton",
          telegramUser: "Ray_Phamton",
        },
        {
          id: 2,
          name: "Mauricio Rodríguez",
          role: "Developer", // Developer
          github: "https://github.com/ImMau14",
          githubUser: "ImMau14",
          telegramUser: "l0mauu",
        },
        {
          id: 3,
          name: "Jonny Cabrera",
          role: "Developer", // Developer
          github: "https://github.com/Theyobii",
          githubUser: "Theyobii",
          telegramUser: "theyobii",
        },
        {
          id: 4,
          name: "Johan Santana",
          role: "One For All CEO", // Developer
          github: "https://github.com/santcodex",
          githubUser: "santcodex",
          telegramUser: "johanrjosue",
        },
      ],
    },
  ];

  return (
    <div className="space-y-16">
      {divisions.map((division, index) => (
        <div key={division.name} className="overflow-hidden py-4">
          <h3 className="mb-6 text-xl font-bold text-center text-gray-300">
            {division.name}
          </h3>
          <div
            className={`marquee-container ${
              index === 1 ? "" : "marquee-reverse"
            }`}
          >
            <div className="marquee-content">
              {[...division.members, ...division.members].map((member, idx) => (
                <motion.div
                  key={`${member.id}-${idx}`}
                  className="p-6 mx-4 w-auto rounded-xl border border-gray-800 backdrop-blur-sm min-w-fit bg-gray-900/50"
                  whileHover={{ scale: 0.95 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex overflow-hidden justify-center items-center mr-4 w-16 h-16 bg-gray-800 rounded-full border-2 border-gray-700">
                      <span className="text-xl font-bold text-gray-300">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{member.name}</h4>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <a
                      href={`https://t.me/${member.telegramUser}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 space-x-1 text-xs text-gray-300 bg-gray-800 rounded-full transition-colors hover:bg-gray-700 w-fit"
                    >
                      <FaTelegram />
                      <span>@{member.telegramUser}</span>
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 space-x-1 text-xs text-gray-300 bg-gray-800 rounded-full transition-colors hover:bg-gray-700 w-fit"
                    >
                      <FaGithub />
                      <span>{member.githubUser}</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamCarousel;