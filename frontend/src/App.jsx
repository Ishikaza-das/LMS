import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Thumbnail from "./components/pages/Thumbnail"
import Tab from "./components/auth/Tab"
import Dashboard from "./components/pages/student/Dashboard"
import Profile from "./components/pages/student/Profile"
import Course from "./components/pages/student/Course"
import IDashboard from "./components/pages/instructor/IDashboard"
import ICourses from "./components/pages/instructor/ICourses"
import CreateCourse from "./components/pages/instructor/CreateCourse"

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Thumbnail/>
  },
  {
    path:"/account",
    element:<Tab/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/course",
    element:<Course/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/admin/dashboard",
    element:<IDashboard/>
  },
  {
    path:"/admin/courses",
    element:<ICourses/>
  },
  {
    path:"/admin/createcourses",
    element:<CreateCourse/>
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
