import About from "@/components/about";
import Header from "@/components/header";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import {
  HoverImageLink,
  ParallaxText,
  SectionHeading,
  SlideIn,
  TextReveal,
  Transition,
} from "@/components/ui";

import { UserObject } from "@/utils/interfaces";
import Experience from "@/components/experience";
import { ContactUs } from "@/components/contact-us";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { platform } from "os";

export default function Home() {
  return (
    <main className="relative">
      <Transition className="fixed md:top-8 top-6 md:left-8 left-6 z-30 hover:text-white/80 text-white/40">
        <Link href={"/"}>
          <TextReveal className="font-semibold ">
            Ahmed Abdelrazek Portfolio
          </TextReveal>
        </Link>
      </Transition>
      <Header social={social_handles} />
      <Hero about={about} />
      <About about={about} timeline={timeline} />
      {/* <Experience timeline={timeline} /> */}
      {/* ===SKILLS SECTION=== */}
      <section id="skills">
        <ParallaxText baseVelocity={-5}>
          {skills
            .sort((a, b) => a.sequence - b.sequence)
            .map((skill) =>
              skill.enabled ? (
                <span
                  key={skill._id}
                  className="md:text-7xl text-xl font-semibold uppercase text-white/30"
                >
                  {skill.name} •
                </span>
              ) : null
            )}
        </ParallaxText>
        <ParallaxText baseVelocity={5}>
          {skills
            .sort((a, b) => a.sequence - b.sequence)
            .map((skill) =>
              skill.enabled ? (
                <span
                  key={skill._id}
                  className="md:text-7xl text-xl font-semibold uppercase text-white/30"
                >
                  {skill.name} •
                </span>
              ) : null
            )}
        </ParallaxText>
        <ParallaxText baseVelocity={-5}>
          {skills
            .sort((a, b) => a.sequence - b.sequence)
            .map((skill) =>
              skill.enabled ? (
                <span
                  key={skill._id}
                  className="md:text-7xl text-xl font-semibold uppercase text-white/30"
                >
                  {skill.name} •
                </span>
              ) : null
            )}
        </ParallaxText>
      </section>
      {/* ===SERVICES SECTION=== */}
      <section className="px-2 py-20 relative" id="services">
        <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10" />
        <SectionHeading className="md:pl-16 overflow-hidden">
          <SlideIn className="text-white/40">Here&apos;s how</SlideIn> <br />
          <SlideIn>I can help you</SlideIn>
        </SectionHeading>
        <div className="mx-auto pt-10">
          {services.map((service) => (
            <Transition key={service._id}>
              <HoverImageLink
                heading={service.name}
                href=""
                price={service.charge}
                imgSrc={service.image.url}
                subheading={service.desc}
              />
            </Transition>
          ))}
        </div>
        <Transition className="flex items-center py-10 md:hidden">
          <div className="p-4 rounded-full border border-white/50">
            <span>Discuss the project</span>
          </div>
        </Transition>
      </section>
      {/* ===PROJECTS SECTION=== */}
      <Projects data={projects} />
      {/* ===TESTIMONIALS SECTION=== */}
      {/* <section className="py-20 relative" id="testimonials">
        <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
        <SectionHeading className="md:pl-28">
          <SlideIn className="text-white/40">What Our</SlideIn> <br />
          <SlideIn className="">Clients Say</SlideIn>
        </SectionHeading>
        <Testimonials data={testimonials} speed="normal" pauseOnHover />
        <Testimonials
          data={testimonials}
          pauseOnHover
          speed="normal"
          direction="left"
        />
      </section> */}

      {/* ===CONTACT US=== */}
      <div
        className="rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden"
        id="contact"
      >
        <ContactUs email={email} about={about} social_handle={social_handles} />
      </div>
    </main>
  );
}
const services = [
  {
    name: "Web & App ",
    charge: "",
    desc: "I build brands through cultural insights & strategic vision. Custom crafted business solutions.",
    image: {
      public_id: "portfolio3/1710357775748-9vwq4q.jpeg",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/portfolio3/1710357775748-9vwq4q.jpeg",
    },
    enabled: true,
    _id: "65f1fd100556c3f887e9d87b",
  },
  {
    name: "UI/UX Solutions",
    charge: "",
    desc: "Design direction for business. Get your business on the next level. We help to create great experiences.",
    image: {
      public_id: "1706290914024-725ytf",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706290914024-725ytf",
      _id: "65b3eee8eb20546ae6d467fe",
    },
    _id: "65b3e33db48589dfcae1851d",
    enabled: true,
  },
];
const about = {
  name: "Ahmed Abdelrazek",
  title: "Software Developer",
  subTitle: "I develop Full-stack web applications and user interfaces",
  description:
    "As Mern stack developer , I have very solid skills in Javascript technologies like : NodeJs , NestJs , ExpressJs as Backend technologies and ReactJs , NextJs ,AngularJs as Frontend technologies , I have strong Knowledge in oop , Data structures and design patters , I am proud of myself on being a quick learner as I come from different background as former dentist",
  quote: "Break your limits",
  exp_year: "0",
  address: "Nasr city , Cairo , Egypt",
  some_total: "90",
  phoneNumber: "+21005038893",
  contactEmail: "ahmedrazek97@gmail.com",
  avatar: {
    public_id: "my_avatar",
    _id: "my_avatar",
    url: "/WhatsApp Image 2023-04-10 at 01.54.20.jpg",
  },
  alternateAvatars: [
    {
      public_id: "my_avatar",
      url: "/WhatsApp Image 2023-04-10 at 01.54.20.jpg",
    },
  ],
};
const social_handles = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ahmed-abdelrazek-khalifa/",
    image: {
      public_id: "my_avatar",
      _id: "my_avatar",
      url: "/WhatsApp Image 2023-04-10 at 01.54.20.jpg",
    },
    enabled: true,
    _id: "asdfdsf",
  },
  {
    platform: "Github",
    url: "https://github.com/ahmedrazek",
    image: {
      public_id: "my_avatar",
      _id: "my_avatar",
      url: "/WhatsApp Image 2023-04-10 at 01.54.20.jpg",
    },
    enabled: true,
    _id: "asdfdsf",
  },
  {
    platform: "Resume",
    url: "https://drive.google.com/file/d/126osrt68xsKPaBwx3ajrvlJqpxxLRC3e/view?usp=drive_link",
    image: {
      public_id: "my_avatar",
      _id: "my_avatar",
      url: "/WhatsApp Image 2023-04-10 at 01.54.20.jpg",
    },
    enabled: true,
    _id: "asdfdsf",
  },
];
const timeline = [
  {
    company_name: "Information Technology Institute",
    summary: "Learned about how to develop and deploy full-stack applications",
    sequence: 1,
    startDate: "2023-10-13T00:00:00.000Z",
    endDate: "2024-06-22T00:00:00.000Z",
    jobTitle: "MEARN Stack Developer",
    jobLocation: " Asyut, Cairo",
    bulletPoints: [
      "Developed RESTful APIs and integrated third-party services to ingest and process large volumes of data.",
      "\n" +
        "Designed and implemented responsive user interfaces using React.js, Next.Js, AngularJs, Tailwind, Bootstrap and Saas",
      "\n" +
        "Utilized Node.js, Express.js, NestJs, MySQl, PostgreSQL and MongoDB to build scalable and efficient back-end systems",
      "\n" +
        "Conducted unit tests and participated in peer code reviews to ensure code quality.\n",
    ],
    forEducation: true,
    enabled: true,
    _id: "65f1fdef0556c3f887e9da44",
  },
  {
    company_name: "Information Technology Institute",
    summary: "Learned about how to develop Backend Applications",
    sequence: 2,
    startDate: "2023-10-13T00:00:00.000Z",
    endDate: "2024-06-22T00:00:00.000Z",
    jobTitle: "Node.Js Backend Developer",
    jobLocation: " Asyut, Cairo",
    bulletPoints: [
      "Developed RESTful APIs and integrated third-party services to ingest and process large volumes of data.",
      "\n" +
        "Utilized Node.js, Express.js, NestJs, MySQl, PostgreSQL and MongoDB to build scalable and efficient back-end systems.\n",
    ],
    forEducation: true,
    enabled: true,
    _id: "65f1fdef0556c3f887e9da454",
  },
  {
    company_name: "Information Technology Institute",
    summary:
      "Learned about how to develop user friendly and responsive frontend applications",
    sequence: 3,
    startDate: "2023-10-13T00:00:00.000Z",
    endDate: "2024-06-22T00:00:00.000Z",
    jobTitle: "Frontend Developer",
    jobLocation: " Asyut, Cairo",
    bulletPoints: [
      "Designed and implemented responsive user interfaces using React.js, Next.Js, AngularJs, Tailwind, Bootstrap and Saas\n",
    ],
    forEducation: true,
    enabled: true,
    _id: "65f1fdef0556c3f887e9da44",
  },
];
const email = "ahmedrazek97@gmail.com";
const skills = [
  {
    enabled: true,
    name: "C++",
    sequence: 19,
    percentage: 87,
    image: {
      public_id: "1706288734207-4rlz3m",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706288734207-4rlz3m",
      _id: "65b3e661b48589dfcae187f8",
    },
    _id: "65b3e661b48589dfcae187f7",
  },

  {
    enabled: true,
    name: "Docker",
    sequence: 18,
    percentage: 85,
    image: {
      public_id: "1706287155946-z2oybb",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706287155946-z2oybb",
      _id: "65b3e034b48589dfcae182ce",
    },
    _id: "65b3e034b48589dfcae182cd",
  },
  {
    enabled: true,
    name: "Figma",
    sequence: 17,
    percentage: 95,
    image: {
      public_id: "1706287138776-slfc3e",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706287138776-slfc3e",
      _id: "65b3e023b48589dfcae18289",
    },
    _id: "65b3e023b48589dfcae18288",
  },
  {
    enabled: true,
    name: "TypeScript",
    sequence: 2,
    percentage: 90,
    image: {
      public_id: "1706287104739-pm8en",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706287104739-pm8en",
      _id: "65b3e001b48589dfcae18246",
    },
    _id: "65b3e001b48589dfcae18245",
  },
  {
    enabled: true,
    name: "Node.js",
    sequence: 1,
    percentage: 92,
    image: {
      public_id: "1706286990341-tznh4",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286990341-tznh4",
      _id: "65b3df8fb48589dfcae18205",
    },
    _id: "65b3df8fb48589dfcae18204",
  },
  {
    enabled: true,
    name: "MongoDB",
    sequence: 3,
    percentage: 70,
    image: {
      public_id: "1706286966065-p2yrx9",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286966065-p2yrx9",
      _id: "65b3df76b48589dfcae181c6",
    },
    _id: "65b3df76b48589dfcae181c5",
  },
  {
    enabled: true,
    name: "Nest.js",
    sequence: 4,
    percentage: 70,
    image: {
      public_id: "1706286941212-chpzl",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286941212-chpzl",
      _id: "65b3df5db48589dfcae18189",
    },
    _id: "65b3df5db48589dfcae18188",
  },
  {
    enabled: true,
    name: "Redux",
    sequence: 16,
    percentage: 95,
    image: {
      public_id: "1706286913147-nwiky8",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286913147-nwiky8",
      _id: "65b3df41b48589dfcae1814e",
    },
    _id: "65b3df41b48589dfcae1814d",
  },
  {
    enabled: true,
    name: "Javascript",
    sequence: 5,
    percentage: 95,
    image: {
      public_id: "1706288679775-y4qwn3",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706288679775-y4qwn3",
      _id: "65b3e628b48589dfcae18750",
    },
    _id: "65b3df24b48589dfcae18114",
  },
  {
    enabled: true,
    name: "Git",
    sequence: 15,
    percentage: 95,
    image: {
      public_id: "1706286842731-r0eyn",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286842731-r0eyn",
      _id: "65b3defbb48589dfcae180de",
    },
    _id: "65b3defbb48589dfcae180dd",
  },
  {
    enabled: true,
    name: "Github",
    sequence: 14,
    percentage: 95,
    image: {
      public_id: "1706286821409-21cuqs",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286821409-21cuqs",
      _id: "65b3dee5b48589dfcae180a9",
    },
    _id: "65b3dee5b48589dfcae180a8",
  },
  {
    enabled: true,
    name: "Sass",
    sequence: 13,
    percentage: 95,
    image: {
      public_id: "1706286780392-39i48h",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286780392-39i48h",
      _id: "65b3debcb48589dfcae18076",
    },
    _id: "65b3debcb48589dfcae18075",
  },
  {
    enabled: true,
    name: "GraphQl",
    sequence: 12,
    percentage: 80,
    image: {
      public_id: "1706286760237-gh4idq",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286760237-gh4idq",
      _id: "65b3dea8b48589dfcae18045",
    },
    _id: "65b3dea8b48589dfcae18044",
  },
  {
    enabled: true,
    name: "AngularJs",
    sequence: 11,
    percentage: 90,
    image: {
      public_id: "1706286729467-rbblgb",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286729467-rbblgb",
      _id: "65b3de89b48589dfcae18016",
    },
    _id: "65b3de89b48589dfcae18015",
  },
  {
    enabled: true,
    name: "Next.js",
    sequence: 10,
    percentage: 90,
    image: {
      public_id: "1706286682511-rgp96r",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286682511-rgp96r",
      _id: "65b3de5bb48589dfcae17fe9",
    },
    _id: "65b3de5bb48589dfcae17fe8",
  },
  {
    enabled: true,
    name: "React",
    sequence: 6,
    percentage: 90,
    image: {
      public_id: "1706291833080-0loo09",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706291833080-0loo09",
      _id: "65b3f27aeb20546ae6d49e76",
    },
    _id: "65b3de41b48589dfcae17fbd",
  },
  {
    enabled: true,
    name: "Tailwind",
    sequence: 7,
    percentage: 99,
    image: {
      public_id: "1706286616701-2jka3q",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286616701-2jka3q",
      _id: "65b3de19b48589dfcae17f95",
    },
    _id: "65b3de19b48589dfcae17f94",
  },
  {
    enabled: true,
    name: "CSS",
    sequence: 8,
    percentage: 97,
    image: {
      public_id: "1706286273084-romle",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286273084-romle",
    },
    _id: "65b3dcc1b48589dfcae17e4d",
  },
  {
    name: "HTML",
    sequence: 9,
    percentage: 98,
    image: {
      public_id: "1706286058630-v3ax0a",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706286058630-v3ax0a",
    },
    _id: "65b3dbeba5c8d2db7b6164bc",
    enabled: true,
  },
];
const projects = [
  {
    liveurl: "https://spotify-clone-livid-delta.vercel.app/",
    githuburl: "https://github.com/ahmedrazek/Spotify-clone",
    title: "Spotify Clone",
    sequence: 1,
    image: {
      public_id: "1706284812399-jr7rqj",
      url: "/Screenshot 2024-07-20 165942.png",
    },
    description:
      "Developed a full-stack project for Spotify clone, the user can upload songs, listen to them, add to favorites, and subscribe for Spotify premium ",
    techStack: ["Reactjs ", " Nextjs ", " Supabase ", " TailwinCSS", "Stripe"],
    _id: "65b3d70d313a9b09a24a1488",
    enabled: true,
  },
  {
    liveurl: "https://airbnb-clone-iota-azure.vercel.app/",
    githuburl: "https://github.com/ahmedrazek/Airbnb-clone",
    title: "Airbnb Clone",
    sequence: 2,
    image: {
      public_id: "1706284812399-jr7rqj",
      url: "/Screenshot 2024-07-22 005908.png",
    },
    description:
      "Full-stack web application clone for Airbnb practicing technologies like React.js, Node.js, Expressjs, Mongoose ",
    techStack: ["Reactjs ", " NodJS", " MERN ", " TailwinCSS", "ExpressJS"],
    _id: "65b3d719313a9b09a24a148f",
    enabled: true,
  },
  {
    liveurl: "#",
    githuburl: "https://github.com/ahmedrazek/library-social-media-front",
    title: "BookNet Social App (ITI graduation project)",
    sequence: 3,
    image: {
      public_id: "1706284812399-jr7rqj",
      url: "/Screenshot 2024-05-28 232802.png",
    },
    description:
      " Engineered a Social media application using Node.js and Express.js for the backend and Reactjs and TailwindCSS for frontend ,\nBuilt a social community for book readers to share their reviews and thoughts about their favorite books ",
    techStack: ["Reactjs ", " MERN ", " TailwinCSS"],
    _id: "65b3d719313a9b09a24a148f",
    enabled: true,
  },
  {
    liveurl: "#",
    githuburl: "https://github.com/AngeloEsam/library-social-media",
    title: "BookNet Social API",
    sequence: 4,
    image: {
      public_id: "1706284812399-jr7rqj",
      url: "/Screenshot 2024-05-28 232802.png",
    },
    description:
      " Engineered a Social media application using Node.js and Express.js for the backend and Reactjs and TailwindCSS for frontend ,\nBuilt a social community for book readers to share their reviews and thoughts about their favorite books ",
    techStack: ["NodeJS ", " MERN ", " ExpressJS"],
    _id: "65b3d719313a9b09a24a148f",
    enabled: true,
  },
  {
    liveurl: "#",
    githuburl: "https://github.com/ahmedrazek/NodeJs-Project",
    title: "NodeJs E-commerce RESTful Api ",
    sequence: 5,
    image: {
      public_id: "1706284812399-jr7rqj",
      url: "/Screenshot 2024-07-22 012417.png",
    },
    description:
      " Engineered a comprehensive e-commerce API using Node.js and Express.js, enabling efficient product management streamlined order processing, and secure user authentication, resulting in a 40% increase in transaction efficiency and 25% reduction in processing errors",
    techStack: ["NodeJS ", " ExpressJS ", " MongoDB"],
    _id: "65b3d719313a9b09a24a148f",
    enabled: true,
  },
];
const testimonials = [
  {
    image: {
      public_id: "portfolio3/1710357534893-2s9b5d.png",
      url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/portfolio3/1710357534893-2s9b5d.png",
    },
    name: "Sarah Johnson",
    review:
      "Working with John was an absolute delight. Their professionalism and technical prowess were evident from day one. He consistently delivered top-notch code and went above and beyond to ensure the success of our project. I highly recommend him for any development endeavor",
    position: " Product Manager",
    enabled: true,
    _id: "65f1fc1f0556c3f887e9d31d",
  },
];
