import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Thumbnail from "./components/pages/Thumbnail"
import Tab from "./components/auth/Tab"
import Dashboard from "./components/pages/student/Dashboard"
import Profile from "./components/pages/student/Profile"
import Course from "./components/pages/student/Course"

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
