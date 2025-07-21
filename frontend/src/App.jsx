import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Thumbnail from "./components/pages/Thumbnail"
import Tab from "./components/auth/Tab"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Thumbnail/>
  },
  {
    path:"/account",
    element:<Tab/>
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
