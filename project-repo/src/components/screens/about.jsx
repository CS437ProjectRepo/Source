import React from 'react';
import { EnvelopeIcon, GlobeAltIcon} from '@heroicons/react/24/outline'
const teamData = [
    {
        "photo": "https://anshitakhare.com/project-repo-media/anshita.png",
        "name": "Anshita Khare",
        "role": "Software Development and Design",
        "blurb": "I had a lot of fun working on the frontend, backend, and database portion of project. Our target audience is fellow students seeking inspiration for their own projects, as well as our professors who serve as administrators. With these users in mind, we strove to create an elegantly designed application that was both cost-effective and user-friendly. This led us to develop a suite of features that allows administrators to easily manage(create, read, update, and delete) projects. Students are able to filter through the available projects by a variety of tags, including category and programming language, to quickly find the ones that most interested them.",
        "linkedin": "https://www.linkedin.com/in/an-khare-1051a4260",
        "email": "mailto: ankhare8@gmail.com",
        "website": "https:anshitakhare.com"
    },
    {
      "photo": "https://anshitakhare.com/project-repo-media/rigo.png",
      "name": "Rigoberto Rosa",
      "role": "Requirements, Software Development, Testing",
      "blurb": "",
      "linkedin": "www.linkedin.com/in/rigobertorosa",
      "email": "mailto:rigorosa@bu.edu"
  },
    {
        "photo": "https://anshitakhare.com/project-repo-media/soi.png",
        "name": "Supawadee Phakdee",
        "role": "Project Management",
        "blurb": "As the project manager, I worked to ensure that ensure that all aspects of the project are well-planned, well-documented, and well-executed, in order to deliver a successful project through a range of key activities, including developing and maintaining a Configuration Items List to track project components, creating personas to better understand our target audience of professors and students, maintaining an Estimation Record to track progress against budget and timeline, developing Use Cases to define how the project's features will be used by professors and students, and creating a State Transition Diagram to map out how the project's components will interact over time. I also work to ensure that all tools and technologies integrate effectively with each other by creating a Tool Connectivity Diagram.",
        "linkedin": "https://www.linkedin.com/in/supawadee-phakdee/",
        "email": "mailto:souy.supawadee@gmail.com"
    },
    {
        "photo": "https://anshitakhare.com/project-repo-media/marouan.png",
        "name": "Marouan Boussif",
        "role": "Testing",
        "blurb": "Remember, every day is a new opportunity to learn, grow, and make a difference",
        "linkedin": "https://www.linkedin.com/in/marouan-boussif-790004118/",
        "email": "mailto:marouan_usa2008@outlook.fr"
    },
    {
        "photo": "https://anshitakhare.com/project-repo-media/ayoub.png",
        "name": "Ayoub Amghar",
        "role": "Wireframes",
        "blurb": "",
        "linkedin": "https://www.linkedin.com/in/ayoub-amghar-494910182/",
        "email": "mailto:amghar1a@bu.edu"
    }
]

const About = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="absolute inset-x-0 top-0 overflow-hidden pl-[50%] -z-10">
        <img src="https://tailwindui.com/img/beams-basic-transparent.png" alt="" loading="lazy" className="-ml-[39rem] w-[113.125rem] max-w-none"/>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-md text-gray-800 sm:mt-4">
            We are a group of five passionate individuals who worked together to bring this project to life.
          </p>
        </div>
        <div className="mt-10">
          <ul className="grid grid-cols-1 gap-6">
            {teamData.map((member, index) => (
              <li key={index} className="col-span-1 flex bg-white rounded-lg shadow divide-x divide-gray-200 bg-opacity-50">
                <div className="hidden lg:flex">
                  <img
                    className="object-cover rounded-tl-lg rounded-bl-lg" style={{maxWidth: 15 + 'vw', height: "auto"}}
                    src={member.photo}
                    alt={member.name}
                  />
                </div>
                <div className="px-4 py-2">
                  <h3 className="text-md font-medium text-gray-800">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                  <p className="text-gray-800 text-sm break-words mt-2">{member.blurb}</p>
                  <div className="flex gap-2 my-2">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <svg className="w-5 h-5 pb-1 -mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> 
                            <path fill="#a65ad8" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                        </svg>
                    </a>
                    <a href={member.email} target="_blank" rel="noopener noreferrer">
                        <EnvelopeIcon className="w-5 h-5 ml-1 text-purple-500"/>
                    </a>
                    {
                      member.website && (
                        <a href={member.website} target="_blank" rel="noopener noreferrer">
                            <GlobeAltIcon className="w-5 h- text-purple-500"/>
                        </a>
                      )
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
