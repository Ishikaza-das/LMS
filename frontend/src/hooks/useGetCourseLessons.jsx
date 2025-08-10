import { setCourseLessons } from "@/store/lessonSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useGetCourseLessons = (courseId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchLessons = async () =>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_LESSON_API}/get/${courseId}`,{withCredentials: true})
            if(response.data.success){
                dispatch(setCourseLessons(response.data.lessons));
                console.log(response.data);
            }
            } catch (error) {
             console.error(error);   
            }
        }
        fetchLessons();
    },[courseId, dispatch])
}

export default useGetCourseLessons
