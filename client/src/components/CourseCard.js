
import React from 'react';

const CourseCard = ({ course, onPurchase }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">{course.courseName}</h2>
      <p className="mb-2"><strong>Content:</strong> {course.courseContent}</p>
      <p className="mb-2"><strong>Duration:</strong> {course.courseDuration}</p>
      <p className="mb-2"><strong>Certificate:</strong> {course.courseCertificate}</p>
      <p className="mb-4"><strong>Price:</strong> ${course.price}</p>
      <button
        onClick={() => onPurchase(course.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Purchase
      </button>
    </div>
  );
};

export default CourseCard;
