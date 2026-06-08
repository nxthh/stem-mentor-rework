import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const teamMembers = [
  {
    name: "Taing Sengkim",
    role: "Leader",
    quote:
      "Every lecture is a stepping stone, every challenge a hidden opportunity.",
    profile: "/assets/members/taingsengkim.jpg",
    facebook: "https://web.facebook.com/taing.sengkim.9/",
    github: "https://github.com/tskimm3110",
    linkedin: "",
  },
  {
    name: "Bean SovannRanuth",
    role: "Sub-Leader",
    quote: "It doesn't matter if you walk slow, Just keep going.",
    profile: "/assets/members/beansovannranuth.jpg",
    facebook: "https://www.facebook.com/beansovannranuth",
    github: "https://github.com/nxthh",
    linkedin: "",
  },
  {
    name: "Sam Sreynich",
    role: "Member",
    quote: "Success is built on curiosity and consistency.",
    profile: "/assets/members/samsreynich.jpg",
    facebook: "",
    github: "",
    linkedin: "",
  },
  {
    name: "Chham Kaknika",
    role: "Member",
    quote: "Dream big, but learn even bigger.",
    profile: "/assets/members/chhamkaknika.jpg",
    facebook: "",
    github: "",
    linkedin: "",
  },
  {
    name: "Hun Kimlong",
    role: "Member",
    quote: "Small progress is still progress.",
    profile: "/assets/members/hunkimlong.jpg",
    facebook: "",
    github: "",
    linkedin: "",
  },
  {
    name: "Nget Sreyhuong",
    role: "Member",
    quote: "Passion fuels persistence.",
    profile: "/assets/members/ngetsreyhuong.jpg",
    facebook: "",
    github: "",
    linkedin: "",
  },
  {
    name: "Chhom Phearon",
    role: "Member",
    quote: "Knowledge grows when shared.",
    profile: "/assets/members/chhomphearon.jpg",
    facebook: "",
    github: "",
    linkedin: "",
  },
];
const ValueItem = ({ title, color, description, position }) => {
  const largeScreenPositionClasses = {
    "top-left": "lg:absolute lg:top-0 lg:left-0 lg:text-left",
    "top-right": "lg:absolute lg:top-0 lg:right-0 lg:text-left",
    "bottom-left": "lg:absolute lg:bottom-0 lg:left-0 lg:text-left",
    "bottom-right": "lg:absolute lg:bottom-0 lg:right-0 lg:text-left",
  };
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`w-full max-w-sm lg:w-64 p-4 lg:p-0 text-center lg:text-left ${largeScreenPositionClasses[position]}  lg:mt-0`}
    >
      <h3 className={`${color} text-2xl lg:text-3xl font-bold`}>{title}</h3>
      <p className="text-gray-600 dark:text-gray-200 text-base lg:text-lg mt-1">
        {description}
      </p>
    </div>
  );
};
const MemberCard = ({ member }) => (
  <div className="bg-white dark:bg-darksecbg rounded-2xl p-4 flex flex-col items-center text-center transition duration-200 h-full">
    <div className="w-20 h-20 rounded-full border-4 border-primary object-cover mb-2 overflow-hidden flex items-center justify-center">
      <div className="w-full h-full bg-slate-200 flex items-center justify-center">
        <img
          src={member.profile}
          alt={member.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
    <h3 className="text-base font-semibold text-primary text-[20px] dark:text-white">
      {member.name}
    </h3>
    <p className="text-secondary font-medium text-lg ">{member.role}</p>

    <p className="text-gray-600 dark:text-gray-300 mt-2 italic text-[18px] text-xs flex-grow overflow-hidden">
      "{member.quote}"
    </p>

    <div className="flex justify-center gap-2 mt-3">
      {member.facebook && (
        <a href={member.facebook} target="_blank" rel="noreferrer">
          <FaFacebook className="text-primary w-5 h-5 hover:scale-110 transition" />
        </a>
      )}
      {member.github && (
        <a href={member.github} target="_blank" rel="noreferrer">
          <BsGithub className="w-5 h-5 hover:scale-110 transition" />
        </a>
      )}
      {member.linkedin && (
        <a href={member.linkedin} target="_blank" rel="noreferrer">
          <BsLinkedin className="text-primary w-5 h-5 hover:scale-110 transition" />
        </a>
      )}
    </div>
  </div>
);
export default function About() {
  const best = <span className="text-secondary">ល្អបំផុត</span>;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
  };

  const member = teamMembers[currentIndex];
  const { t, i18n } = useTranslation();

  const isKhmer = i18n.language === "km";
  return (
    <div>
      <div
        className="
          bg-gradient-to-r from-[#253C95] to-[#0055CD] 
          font-mono text-white p-6 sm:p-10 flex flex-col items-center 
          h-auto py-16 sm:py-20 lg:py-24"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-center">
          {t("About STEM Mentor")}
        </h1>
        <p className="py-6 text-lg   text-center max-w-xl">
          {t(
            "Empowering learners and educators worldwide through high-quality online education"
          )}
        </p>
        {i18n.language === "km" ? (
          <a
            href="mailto:example@email.com"
            className="bg-secondary flex items-center gap-1 rounded-[20px] text-primary font-semibold p-2 px-6 hover:bg-white transition mt-6 sm:mt-8"
          >
            <CiMail className="w-5 h-5 stroke-[1px]" /> ទំនាក់ទំនងមកកាន់ពួកយើង
          </a>
        ) : (
          <>
            <a
              href="mailto:example@email.com"
              className="bg-secondary flex items-center gap-1 rounded-[20px] text-primary font-semibold p-2 px-6 hover:bg-white transition mt-6 sm:mt-8"
            >
              <CiMail className="w-5 h-5 stroke-[1px]" /> Contact Us
            </a>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="mt-10 sm:mt-16 lg:mt-20">
          {" "}
          <h1 className="py-5 text-gray-700 dark:text-gray-100 text-3xl sm:text-4xl lg:text-[40px] font-bold">
            {isKhmer ? (
              <>
                {t("Mission")}{" "}
                <span className="text-primary dark:text-darkprimary">
                  {t("Our")}
                </span>
              </>
            ) : (
              <>
                {t("Our")}{" "}
                <span className="text-primary dark:text-darkprimary">
                  {t("Mission")}
                </span>
              </>
            )}
          </h1>
          <div className="py-5 pt-0">
            <hr className="border-2 w-1/4 sm:w-1/3 border-gray-300" />
          </div>
          <div className="gap-8 flex flex-col pb-10 dark:text-gray-200">
            {[
              {
                title: t("Unmatched service"),
                text: t(
                  "Personalized guidance with instant feedback from virtual STEM tutors, ensuring every student’s learning needs are met."
                ),
              },
              {
                title: t("Specific"),
                text: t(
                  "Tailored lesson plans, step-by-step problem-solving guides, and targeted exercises for each STEM subject."
                ),
              },
              {
                title: t("Experience"),
                text: t(
                  "Interactive exercises and simulations that make learning engaging and practical, enhancing understanding through hands-on practice."
                ),
              },
              {
                title: t("Technology"),
                text: t(
                  "Advanced platform, real-time progress tracking, and interactive tools for an immersive STEM learning experience."
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 md:gap-8"
              >
                <span className="text-lg font-semibold md:col-span-4">
                  {item.title}
                </span>
                <span className="text-base sm:text-lg text-[#5D5F61] dark:text-stone-300 md:col-span-8 mt-1 md:mt-0">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        <div className="">
          {/* <div className="py-5 pt-0">
            <hr className="border-2 w-1/4 sm:w-1/3 border-gray-300" />
          </div> */}
          {/* <div className="gap-8 flex flex-col pb-10 dark:text-gray-200">
            {[
              {
                title: t("Ethics"),
                text: t(
                  "Committed to honest, safe, and responsible learning practices, protecting students’ data and fostering integrity."
                ),
              },
              {
                title: t("Quality"),
                text: t(
                  "High-standard content with accurate STEM knowledge, expert-designed lessons, and reliable guidance."
                ),
              },
              {
                title: t("Continuity"),
                text: t(
                  "Consistent support and progress tracking, ensuring seamless learning and ongoing improvement over time."
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 md:gap-8"
              >
                <span className="text-lg font-semibold md:col-span-4">
                  {item.title}
                </span>
                <span className="text-base sm:text-lg text-[#5D5F61] dark:text-gray-300 md:col-span-8 mt-1 md:mt-0">
                  {item.text}
                </span>
              </div>
            ))}
          </div> */}
          <div className="text-center py-5 relative">
            {" "}
            <h1 className="py-5 text-gray-700 dark:text-gray-100 text-3xl sm:text-4xl lg:text-[40px] font-bold">
              {isKhmer ? (
                <>
                  {t("Core")} {t("Values")}{" "}
                  <span className="text-primary dark:text-darkprimary">
                    {t("Our")}
                  </span>
                </>
              ) : (
                <>
                  {t("Our")}{" "}
                  <span className="text-primary dark:text-darkprimary">
                    {t("Core")} {t("Values")}
                  </span>
                </>
              )}
            </h1>
            <div className="flex flex-col items-center mt-0 lg:mt-5 lg:h-[600px] relative">
              <div className="hidden lg:flex w-[550px] h-[550px]  rounded-full items-center justify-center z-10">
                <img
                  src="/assets/stemabout.png"
                  alt="STEM Values"
                  className=""
                />
              </div>

              <div className="flex flex-col items-center lg:absolute lg:inset-0 w-full">
                <ValueItem
                  title={t("SCIENCE")}
                  color="text-green-600"
                  description={t("SCIENCE_DESC")}
                  position="top-left"
                />

                <ValueItem
                  title={t("MATHEMATICS")}
                  color="text-red-500"
                  description={t("MATHEMATICS_DESC")}
                  position="top-right"
                />

                <div className=" lg:mt-0">
                  <ValueItem
                    title={t("TECHNOLOGY")}
                    color="text-orange-500"
                    description={t("TECHNOLOGY_DESC")}
                    position="bottom-left"
                  />
                </div>

                <div className="lg:mt-0">
                  <ValueItem
                    title={t("ENGINEERING")}
                    color="text-blue-600"
                    description={t("ENGINEERING_DESC")}
                    position="bottom-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary  w-full rounded-[10px] h-auto p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-white text-center   my-10 lg:my-16">
          {[
            { value: "1.2k+", label: "Students" },
            { value: "50", label: "Instructors" },
            { value: "100", label: "Courses" },
            { value: "2", label: "Trusted Company" },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center py-4"
            >
              <p className="text-4xl sm:text-5xl lg:text-[80px] font-bold">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className=" ">
          <div className="container mx-auto relative">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] text-start font-bold text-primary dark:text-darkprimary">
              {i18n.language === "km" ? (
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] text-start font-bold text-primary dark:text-darkprimary">
                  ស្គាល់គ្រូបង្រៀន {best} របស់យើង
                </h2>
              ) : (
                <>
                  {t("Meet Our")}{" "}
                  <span className="text-secondary">{t("Best")}</span>{" "}
                  {t("Mentors")}
                </>
              )}
            </h2>
            <p className="text-gray-600 dark:text-gray-200 text-base sm:text-lg mt-6 max-w-4xl">
              {i18n.language === "km"
                ? "គ្រូបង្រៀនរបស់យើងជាគណៈបង្រៀន និងអ្នកគាំទ្រ ដែលចែករំលែកចំណេះដឹង យុទ្ធសាស្ត្រ និងបទពិសោធន៍របស់ពួកគេ ដើម្បីជួយយើងអភិវឌ្ឍ បង្កើតជំនាញមានតម្លៃ និងធ្វើឱ្យដំណើររបស់យើងកាន់តែបំផុតកម្រិតរំភើបរៀងរាល់ថ្ងៃ។"
                : "Our mentors are dedicated guides and supporters, sharing their knowledge, strategies, and experience to help us grow, build meaningful skills, and make our journey just a little more inspiring every day."}
            </p>
          </div>

          <div className=" mt-[64px] grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-darksecbg flex flex-col sm:flex-row rounded-[10px] overflow-hidden  ">
              <img
                src="/assets/turtos2.jpg"
                alt="mentor Mr. Kay Keo"
                className="w-full sm:w-1/3 h-56 sm:h-auto object-cover rounded-t-[10px] sm:rounded-l-[10px] sm:rounded-t-none"
              />
              <div className="flex flex-col justify-between p-4 flex-1">
                <p className="font-semibold text-xl dark:text-white ">
                  Mr. Kay Keo
                </p>
                <p className="text-gray-700 text-lg mt-2 flex-grow dark:text-darktext">
                  From robust backend systems to seamless integrations, Tobias
                  ensures every process runs smoothly, powering everything
                  behind the scenes.
                </p>
                <div className="flex gap-2 mt-3">
                  <a href="#" className="flex-shrink-0">
                    <FaFacebook className="text-primary dark:text-darkprimary w-6 h-6 hover:scale-110 duration-150 cursor-pointer" />
                  </a>
                  <a href="#" className="flex-shrink-0">
                    <BsGithub className=" w-6 h-6 hover:scale-110 duration-150 cursor-pointer" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white flex flex-col sm:flex-row rounded-[10px] overflow-hidden  dark:bg-darksecbg">
              <img
                src="/assets/turtos1.jpg"
                alt="mentor Ms. Eung Lyzhia"
                className="w-full sm:w-1/3 h-56 sm:h-auto object-cover rounded-t-[10px] sm:rounded-l-[10px] sm:rounded-t-none"
              />
              <div className="flex flex-col justify-between p-4 flex-1">
                <p className="font-semibold text-xl dark:text-white">
                  Ms. Eung Lyzhia
                </p>
                <p className="text-gray-700 text-lg mt-2 flex-grow dark:text-darktext">
                  A visionary with a passion for aesthetics and storytelling,
                  shaping pixel-perfect frontend experiences and defining the
                  visual language behind everything we create.
                </p>
                <div className="flex gap-2 mt-3">
                  <a href="#" className="flex-shrink-0">
                    <FaFacebook className="text-primary dark:text-darkprimary  w-6 h-6 hover:scale-110 duration-150 cursor-pointer" />
                  </a>
                  <a href="#" className="flex-shrink-0">
                    <BsGithub className=" w-6 h-6 hover:scale-110 duration-150 cursor-pointer" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" ">
          <div className="container mx-auto  text-center">
            <div className="py-10 sm:py-16 lg:py-20">
              {i18n.language === "km" ? (
                <h2 className="py-5 text-primary text-3xl pt-0 sm:text-4xl lg:text-[40px] font-bold text-start dark:text-darkprimary">
                  ជួបជាមួយ<span className="text-secondary">ក្រុម</span>​របស់យើង
                </h2>
              ) : (
                <h2 className="py-5 text-primary text-3xl pt-0 sm:text-4xl lg:text-[40px] font-bold text-start dark:text-darkprimary">
                  Meet Our <span className="text-secondary">Team</span>
                </h2>
              )}

              {i18n.language === "km" ? (
                <p className="text-gray-600 dark:text-gray-200 text-base sm:text-lg mb-12 max-w-4xl  text-start">
                  ក្រុមរបស់យើងមានសិស្ស និងមគ្គុទេសក៍ដែលមានចិត្តក្តៅ
                  និងចំណង់ចំណូលចិត្តក្នុងការរៀន និងដឹកនាំ
                  ដោយធ្វើការរួមគ្នាជាមួយការផ្តោតលើការងារ ការបង្កើតច្នៃប្រឌិត
                  និងចក្ខុវិស័យរួម ដើម្បីលើកកម្ពស់ការអប់រំ STEM។
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-200 text-base sm:text-lg mb-12 max-w-4xl  text-start">
                  Our team is made of passionate learners and leaders, working
                  together with dedication, creativity, and a shared vision to
                  inspire STEM education.
                </p>
              )}

              <div
                className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
              gap-4 max-w-7xl mx-auto lg:p-4 
            "
              >
                <div className="lg:order-1">
                  <MemberCard member={teamMembers[0]} />
                </div>

                <div className="lg:order-3">
                  <MemberCard member={teamMembers[1]} />
                </div>

                <div className="lg:order-6">
                  <MemberCard member={teamMembers[2]} />
                </div>

                <div className="lg:order-4">
                  <MemberCard member={teamMembers[3]} />
                </div>

                <div className="lg:order-8">
                  <MemberCard member={teamMembers[4]} />
                </div>

                <div className="lg:order-7">
                  <MemberCard member={teamMembers[5]} />
                </div>

                <div className="lg:order-9">
                  <MemberCard member={teamMembers[6]} />
                </div>
                <div
                  className="
                hidden 
                lg:flex lg:col-span-1 lg:row-span-2 
                items-center justify-center p-4 
                bg-white dark:bg-darksecbg rounded-2xl 
                lg:order-2
              "
                >
                  <div className="flex flex-col items-center justify-center p-4">
                    <h3 className="text-3xl dark:text-white   font-bold text-primary text-center mb-4">
                      STEM MENTOR
                    </h3>
                    <img
                      src="/assets/STEM168.png"
                      alt="STEM Mentor"
                      className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center  rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
