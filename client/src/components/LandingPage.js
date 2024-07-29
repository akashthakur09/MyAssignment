

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import CourseCard from '../components/CourseCard';
import { db } from '../services/firebase';
import { ref, onValue } from 'firebase/database';

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesRef = ref(db, 'courses');
      onValue(coursesRef, (snapshot) => {
        const data = snapshot.val();
        const coursesData = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
        setCourses(coursesData);
      });
    };

    fetchCourses();
  }, []);

  const handlePurchase = (course) => {
    navigate('/payment', { state: { course } });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-5xl font-bold mb-6">Welcome to EdTech</h1>
        <p className="text-lg mb-8">Your pathway to learning made easy.</p>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onPurchase={() => handlePurchase(course)} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
