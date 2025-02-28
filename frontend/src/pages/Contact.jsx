import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
        <p className="text-gray-600 mt-2">For any inquiries, reach out to:</p>

        {/* IIIT Kottayam Contact */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Indian Institute of Information Technology (IIIT) Kottayam</h3>
          <p className="text-gray-600">Valavoor, Pala, Kerala, India</p>
          <p className="text-gray-600">Email: <a href="mailto:contact@iiitkottayam.ac.in" className="text-blue-500 hover:underline">contact@iiitkottayam.ac.in</a></p>
          <p className="text-gray-600">Website: <a href="https://www.iiitkottayam.ac.in" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">iiitkottayam.ac.in</a></p>
        </div>
        
        {/* CIFSS Contact */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Chinmaya International Foundation Shoda Sansthan(CIFSS)</h3>
          <p className="text-gray-600">Central Sanskrit University</p>
          <p className="text-gray-600">Email: <a href="mailto:contact@cifss.in" className="text-blue-500 hover:underline">contact@cifss.in</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
