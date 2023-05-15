import React from 'react';
import { EnvelopeIcon, GlobeAltIcon} from '@heroicons/react/24/outline'
const teamData = [
    {
        "photo": "https://anshitakhare.com/project-repo-media/anshita.png",
        "name": "Anshita Khare",
        "role": "Full Stack Software Development and Design",
        "blurb": "I had a lot of fun working on the frontend, backend, and database portion of this project using the MERN stack and the Google and Github APIs. Our target audience is fellow students seeking inspiration for their own projects, and our professors who serve as administrators. With these users in mind, my goal was to create an elegantly designed application that was both cost-effective and user-friendly. This led me to develop a suite of features that allows administrators to easily manage(create, read, update, and delete) projects and enable all users to filter through the available projects by a variety of tags, including category and programming language, to quickly find the ones that most interested them. Here are some of my cool features about our project:",
        "ul": [
          "All uploaded documentation is stored in a Google Drive folder that can be accessed by the admins and manually manipulated if needed. This was done using the Google Drive API and a Google service account",
          "When projects with a Github link are uploaded, language tags and automatically retrieved by making a query to the Github API the using the path in the supplied URL.",
          "No filters are hardcoded into the UI, instead they pull data from a config file. This allows filters to be updated as needed. The language filters are appended based on programming languages retrieved from Github; if there are languages thare are being used by projects those languages will appear in the langugage filters",
          "When users click on a project modal, a unique identifier is added to the URI using a hash fragment. This enables users to share links to specific projects knowing that that link is opened the same modal will be visible",
          "This website is fully responsive and has dark mode support 😎"
        ],
        "linkedin": "https://www.linkedin.com/in/an-khare-1051a4260",
        "email": "mailto: ankhare8@gmail.com",
        "website": "https://anshitakhare.com"
    },
    {
      "photo": "https://anshitakhare.com/project-repo-media/rigo.png",
      "name": "Rigoberto Rosa",
      "role": "Requirements, Software Development, Testing",
      "blurb": "During this project, I focused on backend development and worked to improve my skills in MongoDB, Express, and Node.js. As part of this experience, I also gained knowledge about unit testing which helped to improve the reliability and stability of our code. Overall, this project has deepened my passion for computer science and its potential to influence the world in meaningful ways.",
      "linkedin": "https://www.linkedin.com/in/rigobertorosa",
      "email": "mailto:rigorosa@bu.edu"
  },
    {
        "photo": "https://anshitakhare.com/project-repo-media/soi.png",
        "name": "Supawadee Phakdee",
        "role": "Project Management",
        "blurb": "As the project manager, I ensured that all project aspects were well-planned, documented, and executed for a successful delivery. My key activities included developing and maintaining a Configuration Items List to track project components, creating personas to understand the target audience, maintaining an Estimation Record to track progress, developing Use Cases to define features, and creating a State Transition Diagram to map component interactions over time. I also ensured effective integration of all tools and technologies by creating a Tool Connectivity Diagram",
        "linkedin": "https://www.linkedin.com/in/supawadee-phakdee/",
        "email": "mailto:souy.supawadee@gmail.com"
    },
    {
        "photo": "https://anshitakhare.com/project-repo-media/marouan.png",
        "name": "Marouan Boussif",
        "role": "Testing",
        "blurb": "For this project, I used libraries like HTTPMocks to test project routes in the server. Remember, every day is a new opportunity to learn, grow, and make a difference",
        "linkedin": "https://www.linkedin.com/in/marouan-boussif-790004118/",
        "email": "mailto:marouan_usa2008@outlook.fr"
    },
    {
        "photo": "https://anshitakhare.com/project-repo-media/ayoub.png",
        "name": "Ayoub Amghar",
        "role": "Wireframes",
        "blurb": "I experimented with Adobe XD but ultimately used Balsamiq to create wireframes for this project. I carefully positioned each element and adjusted their properties to create a detailed wireframe that accurately represented the app's functionality and layout. Once I was satisfied with the wireframe, I exported it as a PDF and shared it with our team for feedback.",
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
                    className="object-contain rounded-tl-lg rounded-bl-lg" style={{maxWidth: 15 + 'vw', height: "auto"}}
                    src={member.photo}
                    alt={member.name}
                  />
                </div>
                <div className="px-4 py-2 text-sm">
                  <h3 className="text-lg font-medium text-gray-800">{member.name}</h3>
                  <p className="text-gray-500 text-md ">{member.role}</p>
                  <p className="text-gray-800 break-words my-2">{member.blurb}</p>
                  {
                    member.ul && (
                      <ul className="list-disc text-gray-800 break-words my-4 ml-10">
                        {
                           member.ul.map((li, index) => (
                            <li key={index} className="mb-2">{li}</li>
                            ))
                        }
                      </ul>
                    )}
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
