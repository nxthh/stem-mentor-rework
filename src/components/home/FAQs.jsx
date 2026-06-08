import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { i18n } = useTranslation();
  const faqs = [
    {
      question:
        i18n.language === "km"
          ? "តើវេទិកាបង្រៀន STEM គឺជាអ្វី?"
          : "What is the STEM tutoring platform?",
      answer:
        i18n.language === "km"
          ? "STEMMentor គឺជាវេទិកាបង្រៀនតាមអ៊ិនធឺណិត ដែលជួយសិស្សរៀនមុខវិជ្ជា STEM (វិទ្យាសាស្រ្ត, បច្ចេកវិទ្យា, វិស្វកម្ម, គណិតវិទ្យា) ដោយមានឧបករណ៍អន្តររូបភាព និងការណែនាំពីអ្នកជំនាញ។"
          : "STEMMentor is an online tutoring platform that helps students learn STEM subjects (Science, Technology, Engineering, Mathematics) with interactive tools and expert guidance.",
    },
    {
      question:
        i18n.language === "km"
          ? "STEMMentor ដំណើរការយ៉ាងដូចម្តេច?"
          : "How does STEMMentor work?",
      answer:
        i18n.language === "km"
          ? "សិស្សអាចចូលរួមសម័យបណ្ដុះបណ្ដាលផ្សាយផ្ទាល់ មើលមេរៀនដែលបានថត និងភ្ជាប់ជាមួយអ្នកណែនាំសម្រាប់ជំនួយមួយលើមួយ។"
          : "Students can join live sessions, watch recorded lessons, and connect with mentors for one-on-one help.",
    },
    {
      question:
        i18n.language === "km"
          ? "តើ STEMMentor ឥតគិតថ្លៃឬទេ?"
          : "Is STEMMentor free to use?",
      answer:
        i18n.language === "km"
          ? "យើងផ្តល់ធនធានឥតគិតថ្លៃ និងផែនការប្រកួតប្រជែងសម្រាប់ការស្ទូតតាមផ្ទាល់។"
          : "We offer both free resources and premium plans for personalized tutoring.",
    },
    {
      question:
        i18n.language === "km"
          ? "តើនរណាអាចប្រើវេទិកានេះបាន?"
          : "Who can use the platform?",
      answer:
        i18n.language === "km"
          ? "វេទិកានេះបើកចំហសម្រាប់អ្នករៀនទាំងអស់ដែលចង់បង្កើនចំណេះដឹងរបស់ពួកគេក្នុងវិទ្យាសាស្រ្ត បច្ចេកវិទ្យា វិស្វកម្ម និងគណិតវិទ្យា។"
          : "The platform is open to all learners who want to improve their knowledge in Science, Technology, Engineering, and Mathematics.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white w-full dark:bg-darksecbg h-auto my-10 pb-10 justify-center rounded-[28px] px-4">
      <h3 className="text-[#292524]  dark:text-darktext  text-2xl lg:text-[36px] font-medium text-center py-10">
        Frequently Asked Questions
      </h3>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start text-center mx-auto gap-6 lg:gap-24">
        <div className="h-[220px] lg:h-[242px]">
          <img src="/assets/FAQs-amico 1.png" className="h-full" />
        </div>
        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="flex flex-col border-l-3 rounded-[5px] w-full lg:w-[490px] border-y-[0.1px] border-r-[0.1px] border-[#84befb] p-5 mb-3"
            >
              <div className="flex justify-between w-full items-center">
                <p className="text-base lg:text-lg dark:text-darktext ">
                  {faq.question}
                </p>
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`cursor-pointer hover:bg-gray-200 p-2 rounded-full ${
                    activeIndex === index ? "bg-primary hover:bg-primary" : ""
                  }`}
                >
                  <FaChevronDown
                    className={`text-gray-800 dark:text-white  transform transition-transform duration-200 ${
                      activeIndex === index ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm lg:text-base text-start dark:text-darktext  text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
