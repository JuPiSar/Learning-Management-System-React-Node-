import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const currency = import.meta.env.VITE_CURRENCY
  
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();

  const fetchAllCourses = async()=> {
    setAllCourses(dummyCourses)
  }

  //calculateRating
  const calculateRating = (course) => {
    if(course.courseRatings.length === 0){
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach(rating => {
       totalRating += rating.rating
    })

    return totalRating / course.courseRatings.length
  }

  //func to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lect) => time += lect.lectureDuration);

    return humanizeDuration(time *60 *1000, {units: ["h", "m"]});
  }
  
  //func to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;

    course.courseContent.map((chapter) => {
      chapter.chapterContent.map((lect) => time += lect.lectureDuration)
    })

    return humanizeDuration(time * 60 * 1000, {units: ['h', 'm']})
  }

  //func to calculate total chapter in a course
  const calculateNoOfLecture = (course) => {
    let totalLect = 0;
    course.courseContent.forEach(chapter => {
      if(Array.isArray(chapter.chapterContent)){
        totalLect += chapter.chapterContent.length;
      }
    });
    return totalLect;
  }

  //fetch user Enrolled Courses
  const fetchUserEnrolledCourses = async() => {
    setEnrolledCourses(dummyCourses)
  }


  useEffect(() => {
    fetchAllCourses()
    fetchUserEnrolledCourses()
  },[])

  const value = {
    currency,
    allCourses,
    isEducator,
    navigate,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLecture ,
    enrolledCourses,
    fetchUserEnrolledCourses,
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}