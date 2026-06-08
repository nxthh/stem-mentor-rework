import React from "react";
import testImage from "../../../public/assets/book-cover/groupbook.png";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { i18n } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-center">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-opacity duration-300 dark:opacity-20"
        style={{ backgroundImage: "url('/assets/grid.png')" }}
      ></div>
      <img
        src="/assets/Cover.png"
        className="mb-5 absolute top-[-30px] m-0 right-[-60px] sm:right-[-280px] h-700px"
      />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 relative gap-10 items-center px-6">
        <div className="md:block hidden ">
          <h1 className="text-primary dark:text-darkprimary text-shadow-xs md:text-3xl lg:text-5xl font-bold leading-tight">
            {i18n.language === "km" ? (
              <h1 className=" text-primary dark:text-darkprimary  text-shadow-xs  md:text-3xl  lg:text-5xl font-bold leading-tight">
                ស្វែងរក និងពិនិត្យ{" "}
                <span className="text-yellow-500 ">សៀវភៅដែលអ្នកចូលចិត្ត</span>{" "}
                ដោយងាយស្រួល
              </h1>
            ) : (
              <h1 className=" text-primary dark:text-darkprimary  text-shadow-xs  md:text-3xl  lg:text-5xl font-bold leading-tight">
                Search & review{" "}
                <span className="text-yellow-500 ">your fav book</span>{" "}
                effortlessly
              </h1>
            )}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-darktext">
            {i18n.language === "km"
              ? "ចាប់ផ្តើមការធ្វើដំណើរផ្នែកអក្សរសាស្ត្រដូចមិនធ្លាប់មានមុននេះជាមួយកម្មវិធីបណ្ណាល័យប្រកបដោយវិបត្តិ។ ផ្តល់បទពិសោធន៍ស្រួលដែលអ្នកអាចស្វែងរកសៀវភៅដែលអ្នកចូលចិត្តបានយ៉ាងងាយស្រួល។"
              : "Embark on a literary journey like never before with our revolutionary library application. Introducing a seamless experience where you can effortlessly search your favorite books."}
          </p>
        </div>
        {/* grid grid-cols-2 gap-4 */}
        <div className="">
          <img src={testImage} alt="book" className="rounded-lg" />

          {/* <img
            src="/src/assets/book-cover/Talking to Strangers.png"
            alt="book"
            className="rounded-lg"
          />
          <img
            src="/src/assets/book-cover/The Midnight Library.png"
            alt="book"
            className="rounded-lg col-span-2"
          />
          <img
            src="/src/assets/book-cover/VisualMBA.png"
            alt="book"
            className="rounded-lg col-span-2"
          /> */}
        </div>
        <div className="md:hidden block">
          <h1 className="text-primary dark:text-darkprimary text-shadow-xs md:text-3xl lg:text-5xl font-bold leading-tight">
            {i18n.language === "km" ? (
              <h1 className="text-primary text-4xl dark:text-darkprimary text-shadow-xs md:text-3xl lg:text-5xl font-bold leading-tight">
                ស្វែងរក និងពិនិត្យ{" "}
                <span className="text-yellow-500 ">សៀវភៅដែលអ្នកចូលចិត្ត</span>{" "}
                ដោយងាយស្រួល
              </h1>
            ) : (
              <h1 className=" text-primary text-4xl dark:text-darkprimary  text-shadow-xs  md:text-3xl  lg:text-5xl font-bold leading-tight">
                Search & review{" "}
                <span className="text-yellow-500 ">your fav book</span>{" "}
                effortlessly
              </h1>
            )}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-darktext">
            {i18n.language === "km"
              ? "ចាប់ផ្តើមការធ្វើដំណើរផ្នែកអក្សរសាស្ត្រដូចមិនធ្លាប់មានមុននេះជាមួយកម្មវិធីបណ្ណាល័យប្រកបដោយវិបត្តិ។ ផ្តល់បទពិសោធន៍ស្រួលដែលអ្នកអាចស្វែងរកសៀវភៅដែលអ្នកចូលចិត្តបានយ៉ាងងាយស្រួល។"
              : "Embark on a literary journey like never before with our revolutionary library application. Introducing a seamless experience where you can effortlessly search your favorite books."}
          </p>
        </div>
      </div>
    </section>
  );
}
