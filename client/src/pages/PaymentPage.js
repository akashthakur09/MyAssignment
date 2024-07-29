import React, { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { ref, update } from "firebase/database";
import Header from "../components/Layout/Header";


const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  console.log(course);
  if (!course) {
    return (
      <>
        <Header />
        <div className="text-center mt-10 p-5 bg-gray-100">
          No course selected
        </div>
      </>
    );
  }

  const handlePaymentThroughPayPal = async(e) => {
  
    e.preventDefault();

    try {
      const res = await axios.get('/payment');
      console.log(res);

      if (res && res.data) {
        window.location.href = res.data.links[1].href;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePaymentThroughStripe = () => {
    setTimeout(() => {
      const courseRef = ref(db, `courses/${course.id}`);
      update(courseRef, { status: "purchased" });

      navigate("/home");
    }, 1000);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Payment Page</h1>
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col ">
          <h2 className="text-2xl font-bold mb-2">{course.courseName}</h2>
          <p className="mb-2">
            <strong>Content:</strong> {course.courseContent}
          </p>
          <p className="mb-2">
            <strong>Duration:</strong> {course.courseDuration}
          </p>
          <p className="mb-2">
            <strong>Certificate:</strong> {course.courseCertificate}
          </p>
          <p className="mb-4">
            <strong>Price:</strong> ${course.price}
          </p>
          <div>
            
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded m-2"
                onClick={handlePaymentThroughPayPal}
              >
                Pay Using PayPal
              </button>
          
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded m-2"
              onClick={handlePaymentThroughStripe}
            >
              Pay Using Stripe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
