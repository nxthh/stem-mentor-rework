> ## ⚠️ Project Notice
>
> This project is a refork and continuation of the original STEM Mentor Frontend project developed by [FoundationGen04 STEM Mentor Frontend Repository](https://github.com/FoundationGen04/stem-mentor-frontend.git?utm_source=chatgpt.com).
>
> The codebase has been modified and may differ significantly from the original repository. While it retains portions of the original work, new features, fixes, and changes have been introduced in this fork.
>
> Credit for the original project belongs to the original authors and contributors of the upstream repository. Please refer to the original repository for its initial implementation, documentation, and development history.

🌟 STEM-Mentor
STEM-Mentor is an educational e-learning platform where users can register, enroll in courses, read books, and post blogs for free. Teachers can create courses, lessons, blogs, and upload books for students.
====== Features ======
For Students / Users
✅ Register and log in.
✅ Enroll in courses for free.
✅ Access lessons with video (URL or uploaded) and attachments.
✅ Read books in PDF format.
✅ Post their own blogs.

For Teachers
✅ Create courses.
✅ Add lessons with videos and attachments.
✅ Upload blogs.
✅ Upload books in PDF format.

System Flow / Diagram
flowchart TD
A[User / Student] -->|Enroll| B[Courses]
B --> C[Lessons]
C -->|Watch Video / Download Attachments| A
A -->|Read / Download| D[Books]
A -->|Post Blogs| E[Blogs]

    F[Teacher] -->|Create Courses| B
    F -->|Add Lessons| C
    F -->|Upload Books| D
    F -->|Upload Blogs| E

Tech Stack
Frontend: React, Tailwind CSS, Vite
Deployment: Vercel

Getting Started

Clone this repository:
git clone https://github.com/FoundationGen04/stem-mentor-frontend.git

Install dependencies:
npm install

Start the development server:
npm run dev

Open your browser and go to http://localhost:5173

✅Future Improvements

- Add dashboard for users showing enrolled courses, saved books, and blogs.
- Add analytics for teachers (course enrollment, lesson completion, book downloads).
- Enable lesson reordering for teachers.
- Add categories/tags for courses,blogs and books.

✅ Implement dark-light modes, translation khmer-english

This is our website url : https://stem-mentor.vercel.app/
