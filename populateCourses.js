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
        { code: 'ITSC 1110', title: 'Introduction to Computer Science Principles' },
        { code: 'ITSC 1200', title: 'Freshman Seminar' },
        { code: 'ITSC 1212', title: 'Introduction to Computer Science I' },
        { code: 'ITSC 1213', title: 'Introduction to Computer Science II' },
        { code: 'ITSC 1600', title: 'Computing Professionals' },
        { code: 'ITSC 2175', title: 'Logic and Algorithms' },
        { code: 'ITSC 2181', title: 'Introduction to Computer Systems' },
        { code: 'ITSC 2214', title: 'Data Structures and Algorithms' },
        { code: 'ITSC 2600', title: 'Computer Science Program, Identity, Career' },
        { code: 'ITSC 2610', title: 'Community Outreach Seminar' },
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
