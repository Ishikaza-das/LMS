import { setAllCourses } from "@/store/courseSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

const useGetAllCourses = () => {
  const dispatch = useDispatch();

  useEffect( () => {
    const fetchAllCourse = async() => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_COURSE_API}/get`,{withCredentials:true});
            if(response.data.success){
                dispatch(setAllCourses(response.data.course))
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllCourse();
  },[dispatch])
}

export default useGetAllCourses
