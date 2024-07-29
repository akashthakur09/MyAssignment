import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import { db } from '../services/firebase';
import { ref, push, onValue, update, remove } from 'firebase/database';

const Admin = () => {
  const [courseName, setCourseName] = useState('');
  const [courseContent, setCourseContent] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseCertificate, setCourseCertificate] = useState('');
  const [price, setPrice] = useState('');
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const coursesRef = ref(db, 'courses');
    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      const coursesData = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setCourses(coursesData);
    });
  };

  const handleAddCourse = async () => {
    try {
      const coursesRef = ref(db, 'courses');
      const newCourseRef = push(coursesRef);
      await update(newCourseRef, {
        courseName,
        courseContent,
        courseDuration,
        courseCertificate,
        price,
      });
      fetchCourses();
      clearForm();
    } catch (error) {
      console.error('Error adding course: ', error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const courseRef = ref(db, `courses/${editingId}`);
      await update(courseRef, {
        courseName,
        courseContent,
        courseDuration,
        courseCertificate,
        price,
      });
      fetchCourses();
      clearForm();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating course: ', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const courseRef = ref(db, `courses/${id}`);
      await remove(courseRef);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course: ', error);
    }
  };

  const clearForm = () => {
    setCourseName('');
    setCourseContent('');
    setCourseDuration('');
    setCourseCertificate('');
    setPrice('');
  };

  const handleEditCourse = (course) => {
    setCourseName(course.courseName);
    setCourseContent(course.courseContent);
    setCourseDuration(course.courseDuration);
    setCourseCertificate(course.courseCertificate);
    setPrice(course.price);
    setEditingId(course.id);
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Page</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Course Content"
            value={courseContent}
            onChange={(e) => setCourseContent(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Course Duration"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Course Certificate"
            value={courseCertificate}
            onChange={(e) => setCourseCertificate(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={editingId ? handleUpdateCourse : handleAddCourse}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingId ? 'Update Course' : 'Add Course'}
          </button>
        </div>
        <h3 className="text-xl font-bold mb-5 pt-2 pt pb-2 text-center bg-blue-500 text-white">Courses</h3>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border p-2 mb-2">
              <p><strong>Name:</strong> {course.courseName}</p>
              <p><strong>Content:</strong> {course.courseContent}</p>
              <p><strong>Duration:</strong> {course.courseDuration}</p>
              <p><strong>Certificate:</strong> {course.courseCertificate}</p>
              <p><strong>Price:</strong> {course.price}</p>
              <button
                onClick={() => handleEditCourse(course)}
                className="bg-green-300 text-white px-4 py-2 rounded m-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="bg-red-500 text-white px-4 py-2 rounded m-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
