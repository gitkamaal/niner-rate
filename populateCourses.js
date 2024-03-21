// Load environment variables from .env file
require('dotenv').config();

// Import MongoClient from the mongodb package
const { MongoClient } = require('mongodb');

// Retrieve the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI_ADD_COURSES_TO_DATABASE  + '/niner-rate';

// Check if the MongoDB URI is defined
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable in your .env file.');
}

// Define MongoDB connection options with write concern
const options = {
    writeConcern: {
      w: 'majority' // Specify the write concern mode as 'majority'
    }
};
  
// Create a MongoDB client and establish connection
const client = new MongoClient(uri, options);

// Function to connect to MongoDB and insert courses
async function populateCourses() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Get the database and collection
    const database = client.db();
    const collection = database.collection('courses');

    // Define an array of courses with code and title
    const courses = [

        // ITSC Undergraduate Courses
        { code: 'ITSC 1110', title: 'Introduction to Computer Science Principles' },
        { code: 'ITSC 1200', title: 'Freshman Seminar' },
        { code: 'ITSC 1212', title: 'Introduction to Computer Science I' },
        { code: 'ITSC 1213', title: 'Introduction to Computer Science II' },
        { code: 'ITSC 1600', title: 'Computing Professionals' },
        { code: 'ITSC 2175', title: 'Logic and Algorithms' },
        { code: 'ITSC 2181', title: 'Introduction to Computer Systems' },
        { code: 'ITSC 2214', title: 'Data Structures and Algorithms' },
        { code: 'ITSC 2600', title: 'Computer Science Program, Identity, Career' },
        { code: 'ITSC 2610', title: 'STARTS Community Outreach Seminar' },
        { code: 'ITSC 2700', title: 'Honors Seminar' },
        { code: 'ITSC 3146', title: 'Introduction to Operating Systems and Networking' },
        { code: 'ITSC 3155', title: 'Software Engineering' },
        { code: 'ITSC 3181', title: 'Introduction to Computer Architecture' },
        { code: 'ITSC 3500', title: 'Computer Science Cooperative Education Experience' },
        { code: 'ITSC 3688', title: 'Computers and Their Impact on Society' },
        { code: 'ITSC 3695', title: 'Computer Science Cooperative Education Seminar' },
        { code: 'ITSC 4155', title: 'Software Development Projects' },
        { code: 'ITSC 4490', title: 'Professional Internship' },
        { code: 'ITSC 4681', title: 'Senior Design I' },
        { code: 'ITSC 4682', title: 'Senior Design II' },
        { code: 'ITSC 4750', title: 'Honors Thesis' },
        { code: 'ITSC 4850', title: 'Senior Project I' },
        { code: 'ITSC 4851', title: 'Senior Project II' },
        { code: 'ITSC 4990', title: 'Undergraduate Research' },
        { code: 'ITSC 4991', title: 'Undergraduate Thesis' },

        // ITSC Graduate Courses
        { code: 'ITSC 8110', title: 'Introduction to Computing and Information Systems Research' },
        { code: 'ITSC 8699', title: 'Graduate Research Seminar' },
        { code: 'ITSC 8880', title: 'Individual Study' },
        { code: 'ITSC 8990', title: 'Pre-dissertation Research' },
        { code: 'ITSC 8991', title: 'Doctoral Dissertation Research' },

        // ITIS Undergraduate Courses
        { code: 'ITIS 1301', title: 'Introduction to the Financial Services Industry' },
        { code: 'ITIS 1350L', title: 'eScience Laboratory' },
        { code: 'ITIS 1350', title: 'eScience' },
        { code: 'ITIS 2110L', title: 'IT Infrastructure I: Design and Practice Lab' },
        { code: 'ITIS 2110', title: 'IT Infrastructure I: Design and Practice' },
        { code: 'ITIS 3105', title: 'Server-Side Applications and Data Management' },
        { code: 'ITIS 3130', title: 'Human-Centered Design' },
        { code: 'ITIS 3135', title: 'Web-Based Application Design and Development' },
        { code: 'ITIS 3200', title: 'Introduction to Information Security and Privacy' },
        { code: 'ITIS 3216', title: 'Introduction to Cognitive Science' },
        { code: 'ITIS 3246', title: 'IT Infrastructure and Security' },
        { code: 'ITIS 3300', title: 'Software Requirements and Project Management' },
        { code: 'ITIS 3310', title: 'Software Architecture and Design' },
        { code: 'ITIS 3320', title: 'Introduction to Software Testing and Assurance' },
        { code: 'ITIS 4010', title: 'Topics in Software and Information Systems' },
        { code: 'ITIS 4166', title: 'Network-Based Application Development' },
        { code: 'ITIS 4170', title: 'Advanced Client Applications' },
        { code: 'ITIS 4180', title: 'Mobile Application Development' },
        { code: 'ITIS 4214', title: 'Usable Security and Privacy' },
        { code: 'ITIS 4221', title: 'Secure Programming and Penetration Testing' },
        { code: 'ITIS 4246', title: 'Competitive Cyber Defense' },
        { code: 'ITIS 4250', title: 'Computer Forensics' },
        { code: 'ITIS 4260', title: 'Introduction to Security Analytics' },
        { code: 'ITIS 4261', title: 'Introduction to Secured Cloud Computing' },
        { code: 'ITIS 4310', title: 'Web Mining' },
        { code: 'ITIS 4340', title: 'Interactive Systems Design and Implementation' },
        { code: 'ITIS 4350', title: 'Rapid Prototyping' },
        { code: 'ITIS 4390', title: 'Interaction Design Studio' },
        { code: 'ITIS 4990', title: 'Undergraduate Research' },

        // ITIS Graduate Courses
        { code: 'ITIS 5010', title: 'Introduction to Identity Management' },
        { code: 'ITIS 5101', title: 'Foundations of Programming' },
        { code: 'ITIS 5166', title: 'Network-Based Application Development' },
        { code: 'ITIS 5180', title: 'Mobile Application Development' },
        { code: 'ITIS 5221', title: 'Secure Programming and Penetration Testing' },
        { code: 'ITIS 5250', title: 'Computer Forensics' },
        { code: 'ITIS 5260', title: 'Introduction to Security Analytics' },
        { code: 'ITIS 5261', title: 'Introduction to Secured Cloud Computing' },
        { code: 'ITIS 5280', title: 'Advanced Mobile Application Development' },
        { code: 'ITIS 5350', title: 'Design Prototyping' },
        { code: 'ITIS 5390', title: 'Interaction Design Projects' },
        { code: 'ITIS 6010', title: 'AI for Healthcare' },
        { code: 'ITIS 6011', title: 'Cybersecurity Outreach' },
        { code: 'ITIS 6112', title: 'Software System Design & Implementation' },
        { code: 'ITIS 6120', title: 'Applied Databases' },
        { code: 'ITIS 6162', title: 'Knowledge Discovery in Databases' },
        { code: 'ITIS 6167', title: 'Network Security' },
        { code: 'ITIS 6177', title: 'System Integration' },
        { code: 'ITIS 6200', title: 'Principle of Information Security & Privacy' },
        { code: 'ITIS 6210', title: 'Access Control & Security Architecture' },
        { code: 'ITIS 6240', title: 'Applied Cryptography' },
        { code: 'ITIS 6300', title: 'Human-Centered Design' },
        { code: 'ITIS 6326', title: 'Network Science' },
        { code: 'ITIS 6342', title: 'Information Technology Project Management' },
        { code: 'ITIS 6362', title: 'Information Technology Ethics, Policy, and Security' },
        { code: 'ITIS 6498', title: 'IT Internship Project' },
        { code: 'ITIS 6880', title: 'Individual Study' },
        { code: 'ITIS 8010', title: 'Cybersecurity in AI' },
        { code: 'ITIS 8112', title: 'Software System Design & Implementation' },
        { code: 'ITIS 8120', title: 'Applied Databases' },
        { code: 'ITIS 8167', title: 'Network & Information Security' },
        { code: 'ITIS 8200', title: 'Principle of Information Security & Privacy' },
        { code: 'ITIS 8240', title: 'Applied Cryptography' },
        { code: 'ITIS 8300', title: 'Human-Centered Design' },
        { code: 'ITIS 8326', title: 'Network Science' },

        // ITCS Undergraduate Courses
        { code: 'ITCS 2116', title: 'C Programming' },
        { code: 'ITCS 3050', title: 'Topics in Computer Science' },
        { code: 'ITCS 3112', title: 'Design and Implementation of Object-Oriented Systems' },
        { code: 'ITCS 3153', title: 'Introduction to Artificial Intelligence' },
        { code: 'ITCS 3156', title: 'Introduction to Machine Learning' },
        { code: 'ITCS 3160', title: 'Database Design and Implementation' },
        { code: 'ITCS 3162', title: 'Introduction to Data Mining' },
        { code: 'ITCS 3166', title: 'Intro to Computer Networks' },
        { code: 'ITCS 3190', title: 'Introduction to Cloud Computing for Data Analysis' },
        { code: 'ITCS 3216', title: 'Intro to Cognitive Science' },
        { code: 'ITCS 3610', title: 'Computing Leaders Seminar' },
        { code: 'ITCS 4101', title: 'Introduction to Natural Language Processing' },
        { code: 'ITCS 4102', title: 'Programming Languages' },
        { code: 'ITCS 4122', title: 'Visual Analytics' },
        { code: 'ITCS 4125', title: 'Introduction to Virtual Reality and Augmented Reality' },
        { code: 'ITCS 4145', title: 'Parallel Programming' },
        { code: 'ITCS 4150', title: 'Mobile Robotics' },
        { code: 'ITCS 4180', title: 'Mobile Application Development' },
        { code: 'ITCS 4230', title: 'Intro to Game Design & Development' },
        { code: 'ITCS 4235', title: 'Game Engine Construction' },
        { code: 'ITCS 4236', title: 'Artificial Intelligence Computer Games' },

        // ITCS Graduate Courses
        { code: 'ITCS 5010', title: 'Topics in Computer Science: Bitcoin: Programming the Future of Money' },
        { code: 'ITCS 5102', title: 'Survey of Programming Languages' },
        { code: 'ITCS 5122', title: 'Visual Analytics' },
        { code: 'ITCS 5153', title: 'Applied Artificial Intelligence' },
        { code: 'ITCS 5154', title: 'Applied Machine Learning' },
        { code: 'ITCS 5180', title: 'Mobile Application Development' },
        { code: 'ITCS 5230', title: 'Introduction to Game Design & Development' },
        { code: 'ITCS 5232', title: 'Game Design & Development Studio' },
        { code: 'ITCS 5235', title: 'Game Engine Construction' },
        { code: 'ITCS 5236', title: 'Artificial Intelligence Computer Games' },
        { code: 'ITCS 6010', title: 'Topics in Computer Science: Advanced Computer Vision' },
        { code: 'ITCS 6100', title: 'Big Data Analytics for Competitive Advantage' },
        { code: 'ITCS 6112', title: 'Software System Design & Implementation' },
        { code: 'ITCS 6114', title: 'Algorithms & Data Structures' },
        { code: 'ITCS 6120', title: 'Computer Graphics' },
        { code: 'ITCS 6121', title: 'Data and Information Visualization' },
        { code: 'ITCS 6141', title: 'Computer System and Architecture: Performance and Implementation' },
        { code: 'ITCS 6145', title: 'Parallel Computing' },
        { code: 'ITCS 6150', title: 'Intelligent Systems' },
        { code: 'ITCS 6156', title: 'Machine Learning' },
        { code: 'ITCS 6160', title: 'Database Systems' },
        { code: 'ITCS 6162', title: 'Data Mining' },
        { code: 'ITCS 6166', title: 'Computer Communication & Networks' },
        { code: 'ITCS 6190', title: 'Cloud Computing for Data Analysis' },
        { code: 'ITCS 6880', title: 'Individual Study' },
        { code: 'ITCS 6881', title: 'Individual Study in AI, Robotics, and Gaming' },
        { code: 'ITCS 6882', title: 'Individual Study in Data Science' },
        { code: 'ITCS 6883', title: 'Individual Study in Software, Systems, and Networks' },
        { code: 'ITCS 6991', title: 'Computer Science Thesis' },
        { code: 'ITCS 8010', title: 'Topics in Computer Science: Advanced Computer Vision' },
        { code: 'ITCS 8112', title: 'Software System Design & Implementation' },
        { code: 'ITCS 8114', title: 'Algorithms & Data Structures' },
        { code: 'ITCS 8120', title: 'Computer Graphics' },
        { code: 'ITCS 8121', title: 'Data and Information Visualization' },
        { code: 'ITCS 8141', title: 'Computer System and Architecture: Performance and Implementation' },
        { code: 'ITCS 8145', title: 'Parallel Computing' },
        { code: 'ITCS 8150', title: 'Artificial Intelligence' },
        { code: 'ITCS 8156', title: 'Machine Learning' },
        { code: 'ITCS 8160', title: 'Database Systems' },
        { code: 'ITCS 8162', title: 'Data Mining' },
        { code: 'ITCS 8166', title: 'Computer Communication & Networks' },
        { code: 'ITCS 8190', title: 'Cloud Computing for Data Analysis' },
    ];

    // Insert courses into the collection
    const result = await collection.insertMany(courses);
    console.log(`${result.insertedCount} courses inserted successfully.`);
  } catch (error) {
    console.error('Error inserting courses:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

// Call the function to populate courses
// type 'node populateCourses.js' in terminal
populateCourses();
