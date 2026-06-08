import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import RootLayout from "./layout/RootLayout";
import Courses from "./pages/course/Courses";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Blog from "./pages/blog/Blog";
import About from "./pages/About";
import Library from "./pages/Library";
import ProtectedRoute from "./ProtectedRoute";
import BookDetails from "./pages/book/BookDetails";
import CreateCourse from "./pages/course/CreateCourse";
import CreateQuiz from "./pages/course/CreateQuiz";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import Lessons from "./pages/course/Lessons";
import CreateBlog from "./pages/blog/CreateBlog";
import TeacherDetails from "./components/teacher/TeacherDetails";
import CoursesDetailsEnrolled from "./pages/course/CoursesDetailsEnrolled";
import CoursesDetails from "./pages/course/CoursesDetails";
import BlogDetails from "./pages/blog/BlogDetails";
import AllBooks from "./pages/AllBooks";
import CreateBook from "./pages/book/CreateBook";
import BookDetailsPdf from "./pages/book/BookDetailsPdf";
import AllBlogs from "./pages/blog/AllBlogs";
import ExploreBooks from "./pages/book/ExploreBooks";
const TeacherDashboard = React.lazy(() =>
  import("./pages/teacher/TeacherDashboard")
);
import AllCourse from "./pages/teacher/AllCourse";
import StudentDashboard from "./pages/student/StudentDashboard";
import ScrollToTopButton from "./components/other/ScrollToTopButton";
import NotFound from "./components/other/NotFound";
export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "km") {
      document.body.classList.add("font-kantumruy");
    } else {
      document.body.classList.remove("font-kantumruy");
    }
  }, [i18n.language]);
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          {/*  Teacher Protected Section */}
          <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/create-courses" element={<CreateCourse />} />
            <Route path="/all-courses" element={<AllCourse />} />
            {/* <Route path="/lessons" element={<Lessons />} /> */}
            <Route path="/courses/:id/add-lesson" element={<CreateQuiz />} />
            <Route path="/edit-course/:id" element={<CreateCourse />} />
            <Route path="/all-blogs" element={<AllBlogs />} />
            <Route path="/all-books" element={<AllBooks />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/my-learning" element={<StudentDashboard />} />
            <Route
              path="/enrolled-courses/:courseId/:enrollmentId"
              element={<CoursesDetailsEnrolled />}
            />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["teacher", "student"]} />}
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-blog" element={<CreateBlog />} />
          </Route>
          <Route path="/courses" element={<Courses />} />

          {/* <Route path="/about" element={<About />} /> */}

          <Route path="/courses/:id" element={<CoursesDetails />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/all-books" element={<ExploreBooks />} />

          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog-details" element={<BlogDetails />} />

          <Route path="/edit-blog/:id" element={<CreateBlog />} />

          {/* <Route path="/pdf-test" element={<PdfPreview />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<CreateBook />} />
          <Route path="/edit-book/:id" element={<CreateBook />} />

          {/* Teacher Section */}
          <Route path="/teacher-details" element={<TeacherDetails />} />
          {/* <Route path="/create-courses" element={<CreateCourse />} /> */}
          {/* <Route path="/create-blog" element={<CreateBlog />} /> */}
          {/* <Route path="/create-quiz" element={<CreateQuiz />} /> */}
          {/* <Route path="/all-courses" element={<AllCourse />} /> */}
          {/* <Route path="/lessons" element={<Lessons />} /> */}
          {/* <Route path="/add-lesson" element={<CreateQuiz />} /> */}
          {/* Student Section */}
          {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ScrollToTopButton />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
