import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'

const Player = () => {

  const {enrolledCourses, calculateChapterTime} = useContext(AppContext)
  const {courseId} = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

    const toggleSection = (index) => {
    setOpenSections((prev) => (
      {...prev,
      [index] : !prev[index],
      }
    ));
  };

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if(course._id == courseId) {
        setCourseData(course);
      }
    })
  }

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses])

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
      
        {/**lect column */}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            { courseData && courseData.courseContent.map((chapter, i) => (
              <div key={i} className='border border-gray-300 bg-white mb-2 rounded'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(i)}>
                  <div className='flex items-center gap-2'>
                    <img className={`transform transition-transform ${openSections[i] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="down arrow" />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>
  
                <div className={`overflow-hidden transition-all duration-300 ${openSections[i] ? "max-h-96" : "max-h-0"}`}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lect, j) => (
                      <li className='flex items-start gap-2 py-1' key={j}>
                        <img src={true ? assets.play_icon : assets.blue_tick_icon} alt="play_icon" className='w-4 h-4 mt-1'/>
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lect.lectureTitle}</p>
                          <div className='flex gap-2'>{lect.lectureUrl && 
                            <p onClick={() => setPlayerData({
                              ...lect, chapter: i + 1, lecture: j + 1
                            })} className='text-blue-500 cursor-pointer'>Watch</p>}
                            <p>{humanizeDuration(lect.lectureDuration *60 * 1000, {units: ['h', 'm']})}</p>
                          </div>
  
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2 mt-10'>
            <h1 className='text-xl font-bold'>Rate this Course:</h1>
            <Rating initialRating={0}/>
          </div>

        </div>

        {/**right column */}
        <div>
          {playerData ? (
            <div>
                <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video'/>
              <div className='flex justify-between items-center mt-1'>
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                <button className='text-blue-600'>{false? 'Completed' : 'Mark Complete'}</button>
              </div>
            </div>
          )
          : 
          (<img src={courseData ? courseData.courseThumbnail: ''} alt="" />)}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Player
