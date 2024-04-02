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
      { 
        code: 'ITSC 1110', 
        title: 'Introduction to Computer Science Principles', 
        courseDescription: 'A broad-based introduction to key concepts and principles of computer science. Exploration of seven big ideas of computing: creativity, abstraction, data, algorithms, programming, the Internet, and impact of computing.',
        unccCatalogID: '36',
        unccCourseID: '124792'
      },

      { 
        code: 'ITSC 1200', 
        title: 'Freshman Seminar',
        courseDescription: 'An introductory course designed to engage students in the process of learning about the University, as well as the College of Computing and Informatics in order to prepare each individual to be a successful student, leader, and individual throughout their collegiate experience.  The course lays a foundation of awareness, strategies and processes for successful transition into college.  The development of learning skills, time management skills, leadership skills and other life skills necessary for college success are emphasized.',
        unccCatalogID: '36',
        unccCourseID: '123036'
      },

      {
        code: 'ITSC 1212',
        title: 'Introduction to Computer Science I',
        courseDescription: 'Introduction to basic computer literacy, computational thinking and problem-solving using a high level programming language. Programming concepts will be introduced and applied, including: operators; data types; variables, constants, and literals; expressions; control structures and program flow; basic data structures such as arrays, lists, and maps; defining and using functions; file input/output. This is an introductory programming course for non-CS majors and the first course for students interested in pursuing a computer science major or related minor.',
        unccCatalogID: '36',
        unccCourseID: '123018'
      },

      {
        code: 'ITSC 1213',
        title: 'Introduction to Computer Science II',
        courseDescription: 'Reinforcement of computational thinking and problem-solving skills. Application of object-oriented programming principles including class design, encapsulation, inheritance, polymorphism, interfaces, abstract classes, aggregation and association. Additional topics include version control, use of debuggers and exception handling. This is the second course for students interested in pursuing a computer science major or related minor.',
        unccCatalogID: '36',
        unccCourseID: '123019'
      },

      { 
        code: 'ITSC 1600', 
        title: 'Computing Professionals' ,
        courseDescription: 'An introduction to becoming a computing professional. Students learn about setting goals, defining their dream career, becoming a part of the University, planning coursework, building network, managing time, and working in a team.  Additionally, guest speakers and industry panels discuss and explain aspects of a professional career in IT-related fields.  Throughout the course, students build a professional profile including their goals, values, dream career, student organizations, coding skills, communication skills, curriculum plan, professional network, a team TED talk, resume, and a 30-second elevator pitch.',
        unccCatalogID: '37', 
        unccCourseID: '123021'  
      },
    
      {
        code: 'ITSC 2175',
        title: 'Logic and Algorithms',
        courseDescription: 'A study of discrete mathematical concepts. Introduction to propositional calculus, predicate calculus, algorithms, logic functions, finite-state machines; and logic design.',
        unccCatalogID: '36',
        unccCourseID: '123027'
      },

      {
        code: 'ITSC 2181',
        title: 'Introduction to Computer Systems',
        courseDescription: 'Introduction to computer system abstractions reflected in programming languages, operating systems, architectures, and networks. Topics include: overview of computer and processor architecture, instruction set architecture and introduction to assembly language, C programming, system calls, processes and process memory layout, interfaces for memory allocation and file systems, file and directory management via the command line, network architecture and protocols (such as HTTP, MAC, IP, DNS).',
        unccCatalogID: '36',
        unccCourseID: '125266'
      },

      {
        code: 'ITSC 2214',
        title: 'Data Structures and Algorithms',
        courseDescription: 'A study of the theory and implementation of abstract data types (ADTs) including stacks, queues, and both general purpose and specialized trees and graphs. Includes the implementation and analysis of algorithms related to the various data structures studied, including creation, searching, and traversal of ADTs.',
        unccCatalogID: '36',
        unccCourseID: '123029'
      },

      {
        code: 'ITSC 2600',
        title: 'Computer Science Program, Identity, Career',
        courseDescription: 'Introduces the computer science program and develops a student’s identity and career preparedness. Students learn about the program’s progression and graduation requirements, discuss concentration choices, and make curriculum plans. The course stimulates professional identity building emphasizing ethical uses of technology, diversity, career paths, and research. Course outcomes emphasize an inclusive culture dedicated to student success and equity in the field of computing. This course is designed for internal and external transfer students, and is equivalent to the ITSC 3600 requirement for entering freshmen.',
        unccCatalogID: '36',
        unccCourseID: '124623'
      },

      {
        code: 'ITSC 2610',
        title: 'STARTS Community Outreach Seminar',
        courseDescription: 'Students learn professional skills through active community outreach. They develop knowledge and skills in team-building; creating and applying technology-based solutions; oral and written communications; and team-based project participation and management. This course expects students to engage in off-campus community outreach activities.',
        unccCatalogID: '36',
        unccCourseID: '125152'
      },

      {
        code: 'ITSC 2700',
        title: 'Honors Seminar',
        courseDescription: 'Incorporates presentations from College of Computing and Informatics faculty, industry partners, and local entrepreneurs. Topics and course content varies each semester but will focus on helping students identify and refine their professional goals by providing a survey of modern computing professions.',
        unccCatalogID: '36',
        unccCourseID: '124658'
      },

      { 
        code: 'ITSC 3146', 
        title: 'Introduction to Operating Systems and Networking', 
        courseDescription: 'Introduces the fundamentals of operating systems together with the basics of networking and communications.  Topics include: processes, thread, scheduling, cache, memory management, file systems, interprocess communication, network architecture and protocols, HTTP, MAC, IP, TCP/UPD, and Internet routing.', unccCatalogID: '36', 
        unccCourseID: '123039'
      },

      { 
        code: 'ITSC 3155', 
        title: 'Software Engineering', 
        courseDescription: 'An introduction to software engineering, which advances the study and application of engineering principles, methods, and techniques that can help us to improve the process of creating software as well as the resulting software products.  The course covers fundamentals of software engineering, including: modern software process models; eliciting, specifying, and evaluating software system requirements; designing software systems to embody required quality attributes, including usability and security; an introduction to reusable software design solutions in the form of software architectural styles and design patterns; software system modeling, implementation, and deployment; and software quality assurance (measurement, inspection, testing).  Project planning, working in teams, and using modern software development tools are also explored.', 
        unccCatalogID: '36', 
        unccCourseID: '123042' 
      },

      { 
        code: 'ITSC 3181', 
        title: 'Introduction to Computer Architecture', 
        courseDescription: 'Introduction to the fundamentals of computer architectures and their programmability using assembly and system programming.  Topics include: logic design, processor architecture, memory hierarchies, assembly programming, C programming, process and thread parallelism.', 
        unccCatalogID: '36', 
        unccCourseID: '123046' 
      },

      {
        code: 'ITSC 3500', 
        title: 'Computer Science Cooperative Education Experience', 
        courseDescription: 'This course is required of Co-op students during the semester they are working.  Participating students pay a course registration fee for transcript notation.  Assignments must be arranged and approved in advance.  The Cooperative Education Program is only open to undergraduate students; graduate level students are encouraged to contact their academic departments to inquire about academic or industrial internship options for credit.  For more information, contact the University Career Center.', 
        unccCatalogID: '36', 
        unccCourseID: '123053' 
      },

      {
        code: 'ITSC 3600',
        title: 'Computing Professionals',
        courseDescription: 'An introduction to becoming a computing professional. Students learn about setting goals, defining their dream career, becoming a part of the University, planning coursework, building network, managing time, and working in a team. Additionally, guest speakers and industry panels discuss and explain aspects of a professional career in IT-related fields. Throughout the course, students build a professional profile including their goals, values, dream career, student organizations, coding skills, communication skills, curriculum plan, professional network, a team TED talk, resume, and a 30-second elevator pitch.',
        unccCatalogID: '36',
        unccCourseID: '123021'
      },

      { 
        code: 'ITSC 3688', 
        title: 'Computers and Their Impact on Society', 
        courseDescription: 'A study of current topics (software piracy, hacking, professional conduct) in computer science and the impact of computers on various subsets (home, government, and education) of society.', 
        unccCatalogID: '36', 
        unccCourseID: '123055' 
      },

      { 
        code: 'ITSC 3695', 
        title: 'Computer Science Cooperative Education Seminar', 
        courseDescription: 'Required of Co-op students immediately following each work assignment for presentation of reports on work done the prior semester.', 
        unccCatalogID: '36', 
        unccCourseID: '123058' 
      },

      { 
        code: 'ITSC 4155', 
        title: 'Software Development Projects', 
        courseDescription: 'Advanced software engineering concepts. Explores the entire software development process, emphasizing requirements engineering, design, implementation, test, deployment, and evolution. Advanced topics in software engineering, such as object-oriented modeling, software architecture, architectural styles, design patterns, middleware frameworks, and programming paradigms. Students apply these concepts, along with concepts from introductory programming courses, data structures and algorithms courses, and introductory software engineering courses, to a team software development project that results in an executable software system prototype.', 
        unccCatalogID: '36', 
        unccCourseID: '123075' 
      },

      { 
        code: 'ITSC 4490', 
        title: 'Professional Internship', 
        courseDescription: 'Full- or part-time academic year internship in areas complementary to the concentration area of studies and designed to allow theoretical and course-based practical learning to be applied in a supervised industrial experience. Each student’s internship program must be approved by the supervising faculty. A mid-term report and a final report to be evaluated by the supervising faculty are required. Grading by the supervising faculty in consultation with off-campus supervisor at the internship organization.', 
        unccCatalogID: '36', 
        unccCourseID: '123086' 
      },

      { 
        code: 'ITSC 4681', 
        title: 'Senior Design I', 
        courseDescription: 'A group project in the teaching, theory, or application of computer science under the direction of a faculty member.  A group of no more than 5 students is formed by the supervising faculty member, to meet the needs of the project.  Projects must be approved by the department before they can be initiated.', 
        unccCatalogID: '36', 
        unccCourseID: '123091' 
      },

      { 
        code: 'ITSC 4682', 
        title: 'Senior Design II', 
        courseDescription: 'A continuation of ITSC 4681.', 
        unccCatalogID: '36', 
        unccCourseID: '123092' 
      },

      { 
        code: 'ITSC 4750', 
        title: 'Honors Thesis', 
        courseDescription: 'The Honors Thesis is an individualized experience that is developed by each student under the supervision of a faculty member (the honors project advisor).  An independent thesis project combines a research agenda with appropriate exploratory practices.  In keeping with the nature of the disciplines of the College of Computing and Informatics, the final product of these theses may vary to include (but not be limited to) a written document, an app, or a system.  In all cases, written documentation of the research performed and, if applicable, the development process leading to a prototype system, is required for the purposes of evaluation.', 
        unccCatalogID: '36', 
        unccCourseID: '125146' 
      },

      { 
        code: 'ITSC 4850', 
        title: 'Senior Project I', 
        courseDescription: 'An individual project in the teaching, theory, or application of computer science under the direction of a faculty member. Projects must be approved by the department before they can be initiated.', 
        unccCatalogID: '36', 
        unccCourseID: '123089' 
      },

      { 
        code: 'ITSC 4851', 
        title: 'Senior Project II', 
        courseDescription: 'A continuation of ITSC 4850.', 
        unccCatalogID: '36', 
        unccCourseID: '123090' 
      },

      { 
        code: 'ITSC 4990', 
        title: 'Undergraduate Research', 
        courseDescription: 'Undergraduate research as part of a joint undergraduate/graduate research project using existing research laboratory facilities and materials.', 
        unccCatalogID: '36', 
        unccCourseID: '123093' 
      },

      { 
        code: 'ITSC 4991', 
        title: 'Undergraduate Thesis', 
        courseDescription: 'Students explore a subject in computer science chosen for thesis research and present a written thesis to their thesis committee consisting of the thesis advisor and at least two other faculty members.', 
        unccCatalogID: '36', 
        unccCourseID: '123094' 
      },



      // ITSC Graduate Courses
      { 
        code: 'ITSC 8110', 
        title: 'Introduction to Computing and Information Systems Research', 
        courseDescription: 'Computing and Information Systems has a wide range of research areas encompassing the fields of Business Information Systems, Bioinformatics, Computer Science, and Software and Information Systems. This seminar is intended to give Ph.D. in Computing and Information Systems students a sound understanding of the different research areas in Information Technology. The seminar is to be taken during the first year of studies and is intended to be the gateway to the fields within Information Technology and will enable students to select the fields matching their interests early in their studies. Through attending weekly indepth research presentations from faculty in all participating units in the Ph.D. in Computing and Information Systems program and conducting literature surveys in areas of interest, students are expected to gain the knowledge they need to identify the areas of interest for themselves.', 
        unccCatalogID: '37', 
        unccCourseID: '126120'
      },

      { 
        code: 'ITSC 8665', 
        title: 'Graduate Teaching Seminar', 
        courseDescription: 'Preparation for an academic teaching career, by examining communication and teaching techniques in the field of Computer Science.  Aims to help students develop pedagogical skills, learn about relevant research in computer science education, and practice teaching strategies in a supportive environment while benefitting from peer feedback.', 
        unccCatalogID: '37', 
        unccCourseID: '128884'
      },

      { 
        code: 'ITSC 8699', 
        title: 'Graduate Research Seminar', 
        courseDescription: 'Exposes students to current research in Computing and Information Systems through attending weekly research presentations by other students, CIS faculty, and invited speakers.  Each student is expected to give at least one presentation for the Graduate Research Seminar before graduation.  Students must sign up for and receive credit for the Graduate Research Seminar every semester that they are in the Ph.D. in Computing and Information Systems program until they are admitted to Ph.D. candidacy (i.e., after the students have successfully defended the dissertation proposal). ', 
        unccCatalogID: '37', 
        unccCourseID: '126121' 
      },

      { 
        code: 'ITSC 8880', 
        title: 'Individual Study', 
        courseDescription: 'With the direction of a faculty member, students plan and implement appropriate objectives and learning activities to develop specific areas of expertise through research, reading, and individual projects.', 
        unccCatalogID: '37', 
        unccCourseID: '126122' 
      },

      { 
        code: 'ITSC 8990', 
        title: 'Pre-dissertation Research', 
        courseDescription: 'Students conduct research in information technology under the direction of one or more CIS faculty. A major goal of this course is to prepare the student for the Qualifying Examination.', 
        unccCatalogID: '37', 
        unccCourseID: '126123' 
      },

      { 
        code: 'ITSC 8991', 
        title: 'Doctoral Dissertation Research', 
        courseDescription: 'Individual investigation culminating in the preparation and presentation of a doctoral dissertation.', 
        unccCatalogID: '37', 
        unccCourseID: '126124' 
      },



      // ITIS Undergraduate Courses
      { 
        code: 'ITIS 1301', 
        title: 'Introduction to the Financial Services Industry', 
        courseDescription: 'An overview of the financial services industry, including such areas as the industry components; regulatory considerations and their impact; and relations with other institutions.', 
        unccCatalogID: '36', 
        unccCourseID: '123098' 
      },

      { 
        code: 'ITIS 1350L', 
        title: 'eScience Laboratory', 
        courseDescription: 'Laboratory exercises that introduce computational tools and techniques that support scientific exploration and discovery in the natural sciences No programming experience is required. Performance in ITIS 1350L will be counted as a portion of the ITIS 1350 grade. Must be taken concurrently with ITIS 1350.', 
        unccCatalogID: '36', 
        unccCourseID: '123100' 
      },

      { 
        code: 'ITIS 1350', 
        title: 'eScience', 
        courseDescription: 'This course introduces the application of computational methods to scientific exploration and discovery in the natural sciences. Examples include modeling the spread of viruses, predator-prey relationship, the carbon cycle, and fish schooling. Both theory and practice of computational simulation and modeling techniques are examined as tools to support the scientific method. No computer programming knowledge is required. The course grade includes the student’s performance in ITIS 1350L. Must be taken concurrently with ITIS 1350L.', 
        unccCatalogID: '36', 
        unccCourseID: '123099' 
      },

      { 
        code: 'ITIS 2110L', 
        title: 'IT Infrastructure I: Design and Practice Lab', 
        courseDescription: 'Guided laboratory exercises dealing with IT Infrastructure concepts and equipment. Performance in ITIS 2110L will be counted as portion of the ITIS 2110 grade.', 
        unccCatalogID: '36', 
        unccCourseID: '123102' 
      },

      { 
        code: 'ITIS 2110', 
        title: 'IT Infrastructure I: Design and Practice', 
        courseDescription: 'This course covers basics concepts for IT infrastructure systems administration such as networking administration (e.g., DNS configuration, router configuration, firewall setup, and web server configurations), operating system administration (e.g., account and privilege management, and service management). The course grade includes the student’s performance in ITIS 2110L.', 
        unccCatalogID: '36', 
        unccCourseID: '123101'
      },

      { 
        code: 'ITIS 3105', 
        title: 'Server-Side Applications and Data Management', 
        courseDescription: 'This course covers principles that are important for implementing advanced Web-based applications. Emphasis is placed on industrial and business applications which require robust and secure implementations. Server-side scripting and processing techniques are exercised in course projects.',
        unccCatalogID: '36', 
        unccCourseID: '123106' 
      },

      { 
        code: 'ITIS 3130', 
        title: 'Human-Centered Design', 
        courseDescription: 'An introduction to methods and practice of human-centered design for interactive systems.  Topics include: design principles, need finding, design prototypes, and evaluation of interaction designs so that interactive systems are compatible with human capabilities and expectations.  Students learn to work in design teams and write project reports.', 
        unccCatalogID: '36', 
        unccCourseID: '123109' 
      },

      { 
        code: 'ITIS 3135', 
        title: 'Web-Based Application Design and Development', 
        courseDescription: 'Design and programming concepts for developing interactive web based applications: HTML, CSS, the Document Object Model (DOM), event-driven programming, client side scripting, and web security considerations.', 
        unccCatalogID: '36', 
        unccCourseID: '123103' 
      },

      { 
        code: 'ITIS 3200', 
        title: 'Introduction to Information Security and Privacy', 
        courseDescription: 'An introductory overview of key issues and solutions for information security and privacy.  Topics include: security concepts and mechanisms; security technologies; authentication mechanisms; mandatory and discretionary controls; basic cryptography and its applications; intrusion detection and prevention; information systems assurance; anonymity and privacy issues for information systems.', 
        unccCatalogID: '36', 
        unccCourseID: '123113' 
      },

      { 
        code: 'ITIS 3236', 
        title: 'Introduction to Cognitive Science', 
        courseDescription: 'Interdisciplinary introduction to the science of the mind. Broad coverage of such topics as philosophy of mind; human memory processes; reasoning and problem-solving; artificial intelligence; language processing (human and machine); neural structures and processes; and vision.', 
        unccCatalogID: '36', 
        unccCourseID: '124947' 
      },

      { 
        code: 'ITIS 3246', 
        title: 'IT Infrastructure and Security', 
        courseDescription: 'The concepts for the design and implementation of robust IT infrastructures. Topics include: system hardening, secured access, file storage services, as well as advanced topics in design and configuration of network based services.', 
        unccCatalogID: '36', 
        unccCourseID: '123108' 
      },

      { 
         code: 'ITIS 3300', 
        title: 'Software Requirements and Project Management', 
        courseDescription: 'Introduction to requirement engineering and project management methodologies. Topics include: requirements elicitation, specification, and validation; structural, informational, behavioral, security, privacy, and computer user interface requirements; scenario analysis; application of object-oriented methodologies in requirements gathering; spiral development model; risk management models; software engineering maturity model; project planning and milestones; cost estimation; team organizations and behavior. Case studies will be used.', 
        unccCatalogID: '36', 
        unccCourseID: '123114' 
      },

      { 
        code: 'ITIS 3310', 
        title: 'Software Architecture and Design', 
        courseDescription: 'Introduction to software design with emphasis on architectural design and design patterns. Models of software architecture. Architecture styles and patterns, including explicit, event-driven, client-server, and middleware architectures. Decomposition and composition of architectural components and interactions. Use of non-functional requirements for tradeoff analysis. Component based software development, deployment and management. A system design language, such as UML, are introduced and used throughout the course.', 
        unccCatalogID: '36', 
        unccCourseID: '123136' 
      },

      { 
        code: 'ITIS 3320', 
        title: 'Introduction to Software Testing and Assurance', 
        courseDescription: 'Methods of evaluating software for correctness, and reliability including code inspections, program proofs and testing methodologies. Formal and informal proofs of correctness. Code inspections and their role in software verification. Unit and system testing techniques, testing tools and limitations of testing. Statistical resting, reliability models.', 
        unccCatalogID: '36', 
        unccCourseID: '123117' 
      },

      { 
        code: 'ITIS 4010', 
        title: 'Topics in Software and Information Systems', 
        courseDescription: 'Topics in software and information systems selected to supplement the regular course offerings.', 
        unccCatalogID: '36', 
        unccCourseID: '124903' 
      },

      { 
        code: 'ITIS 4366', 
        title: 'Network-Based Application Development', 
        courseDescription: 'Examines the issues related to network based application development. Topics include: introduction to computer networks, web technologies and standards, network based programming methodologies, languages, tools and standards.', 
        unccCatalogID: '36', 
        unccCourseID: '123118' 
      },

      { 
        code: 'ITIS 4170', 
        title: 'Advanced Client Applications', 
        courseDescription: 'The theory and practice of techniques to develop Web applications that have the features and functionality of traditional desktop applications, dealing with the browser as graphical user interface and the Internet as platform, with attention to interactivity, speed, functionality, and usability. Technologies covered include: X/D/HTML, DOM, CSS, and client-side scripting for layout and formatting, data interaction formats such as XML and JSON, and asynchronous server interaction with clientside scripting and XML (AJAX). The course will examine emerging frameworks for development support, as well as typical applications such as mapping “mashups,” folksonomies, and social networking.', 
        unccCatalogID: '36', 
        unccCourseID: '123119' 
      },

      { 
        code: 'ITIS 4180', 
        title: 'Mobile Application Development', 
        courseDescription: 'Mobile platforms are at the center of attention of users and organizations nowadays. Most organizations and businesses are rapidly migrating toward the cloud and need to provide a fast and easy mechanism for users to stay connected to their services. Mobile applications are the top trend nowadays given the high variety of new mobile devices and platforms such as Apple’s iOS and Google’s Android. In this course, students are introduced to the foundations of mobile development and its unique requirements and constraints. Students design and build a variety of mobile applications with a hands-on and project-based approach', 
        unccCatalogID: '36', 
        unccCourseID: '123120' 
      },

      { 
        code: 'ITIS 4214', 
        title: 'Usable Security and Privacy', 
        courseDescription: 'Much of the work into security and privacy solutions ignore a critical element - the human who must interact with those solutions.  In this course, privacy and security from a user-centered point of view is investigated.  How do people think about privacy and security?  How do they interact with current applications and solutions?  What should be considered in designing user-friendly security systems?  A variety of usability and user-interface issues related to privacy and security, as well as an examination of potential designs and solutions, are introduced. ', 
        unccCatalogID: '36', 
        unccCourseID: '124669' 
      },

      { 
        code: 'ITIS 4221', 
        title: 'Secure Programming and Penetration Testing', 
        courseDescription: 'Techniques for web application penetration testing, secure software development techniques for network based applications. Automated approaches such as static code analysis and application scanning are also discussed.', 
        unccCatalogID: '36', 
        unccCourseID: '123122' 
      },

      { 
        code: 'ITIS 4246', 
        title: 'Competitive Cyber Defense', 
        courseDescription: 'Hands-on experience with designing, deploying, securing, and defending enterprise network services.  Topics include: securing network communication, single sign-on services, firewall and IDS deployment, security policy design and development, log analysis, securing critical network infrastructure, and network access control policies.  Students are expected to demonstrate their ability to defend these services against adversary attacks.', 
        unccCatalogID: '36', 
        unccCourseID: '125020' 
      },

      { 
        code: 'ITIS 4250', 
        title: 'Computer Forensics', 
        courseDescription: 'The identification, extraction, documentation, interpretation, and preservation of computer media for evidentiary purposes and/or root cause analysis. Topics include: techniques for discovering digital evidence; responding to electronic incidents; tracking communications through networks; understanding electronic media, crypto-literacy, data hiding, hostile code and Windows™ and UNIX™ system forensics; and the role of forensics in the digital environment.', 
        unccCatalogID: '36', 
        unccCourseID: '123123' 
      },

      { 
        code: 'ITIS 4260', 
        title: 'Introduction to Security Analytics', 
        courseDescription: 'Focuses on security related sense-making and decision-making based on data analytics techniques. Topics include:  data cleaning and storage techniques, introduction to R, clustering analysis and statistical inference for security; log analysis; event correlation, anomaly detection, cyber threat intelligence, and use of public cybersecurity information resources.',
        unccCatalogID: '36', 
        unccCourseID: '124676' 
      },

      { 
        code: 'ITIS 4261', 
        title: 'Introduction to Secured Cloud Computing', 
        courseDescription: 'Design and deployment of secure and robust cloud computing solutions. Instructions will rely on hands-on labs. It focuses on selecting appropriate components in the cloud and securely configuring them to support a specific application.', 
        unccCatalogID: '36', 
        unccCourseID: '129842' 
      },

      { 
        code: 'ITIS 4310', 
        title: 'Web Mining', 
        courseDescription: 'Topics include: measuring and modeling the Web; crawling, Web search and information retrieval; unsupervised learning, supervised learning, semi-supervised learning in Web context; social network analysis and hyperlink analysis; text parsing and knowledge representation.', 
        unccCatalogID: '36', 
        unccCourseID: '123124' 
      },

      { 
        code: 'ITIS 4340', 
        title: 'Interactive Systems Design and Implementation', 
        courseDescription: 'An introduction to the fundamentals of implementing interactive systems, with a focus on human-centered design.  Topics include: architecture of interaction applications, event handling, direct vs. indirect GUI programming, 2D graphics programming, layout, design patterns, and design critique.  Students learn the fundamental theory of the Model-View Controller Architecture and apply it to building a complete standalone application.  Outcomes include the creation of a full application with multiple different views that communicate with a single model, as well as experience working with GUI programming and implementing common interaction design patterns such as direct manipulation and drag and drop. ', 
        unccCatalogID: '36', 
        unccCourseID: '124668' 
      },

      { 
        code: 'ITIS 4350', 
        title: 'Rapid Prototyping', 
        courseDescription: 'Introduction to theory and approaches for rapid prototyping in interface design. Explores theoretical constructs behind rapid prototyping and how it relates to Human-Computer Interaction.  Students study evolutionary prototyping. This begins with low fidelity prototyping techniques such sketching and paper prototyping, and progressively iterate through higher fidelity prototyping techniques using digital tools.  In addition to software prototyping, the course also provides an introduction to physical prototyping.', 
        unccCatalogID: '36', 
        unccCourseID: '123112' 
      },
      
      { 
        code: 'ITIS 4390', 
        title: 'Interaction Design Studio', 
        courseDescription: 'Aspects of interaction design taught in a studio setting.  Topics include: gesture-based interaction, tangible interaction, large public display interaction, tabletop interaction, multi-touch tablet interaction, and human-robot interaction.  Students learn how to apply a theoretical understanding of some aspect of interaction design to the study of existing designs and the development of a new design.  Outcomes include writing a literature review about interaction design, executing user studies and critiques of existing designs, and developing and implementing a new interaction design for a specific purpose. ', 
        unccCatalogID: '36', 
        unccCourseID: '124534' 
      },

      { 
        code: 'ITIS 4990', 
        title: 'Undergraduate Research', 
        courseDescription: 'Undergraduate research under the supervision and direction of a faculty member.', 
        unccCatalogID: '36', 
        unccCourseID: '123127' 
      },



      // ITIS Graduate Courses
      //TODO: need unccCatalogID and unccCourseID
      { 
        code: 'ITIS 5010', 
        title: 'Introduction to Identity Management', 
        courseDescription: 'The course will examine the fundamentals of Identity Management, which is central to the security and user experience of digital systems. The course will be a balance of learning concepts, standards, and taxonomies in digital identity, as well as hands-on labs applying these by building and integrating systems and will cover: topics of identity in global experiences, directory systems, entitlement management and provisioning, privileged identities, standards in digital identity, verification and proofing, federation, and certification.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5101', 
        title: 'Foundations of Programming', 
        courseDescription: 'Takes students from no experience in programming to having an understanding of how to produce software that is relevant to their domain knowledge. Students learn to think about problem solutions that are systematic and repeatable (algorithms), and translatable to code. Topics include: Algorithmic thinking; Programming with primitive data types; Introduction to Object-Oriented programming; Recovering gracefully from errors and exceptions; Unit testing; Recursion; ADTs (Stacks and Queues, Linked Nodes, Lists, Trees, Hash Functions); Introduction to Big O Analysis and ADTs; Sorting and Searching.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5166', 
        title: 'Network-Based Application Development', 
        courseDescription: 'Mobile platforms are at the center of attention of users and organizations nowadays. Most organizations and businesses are rapidly migrating toward the cloud and need to provide a fast and easy mechanism for users to stay connected to their services. Mobile applications are the top trend nowadays given the high variety of new mobile devices and platforms such as Apple’s iOS and Google’s Android. In this course, students are introduced to the foundations of mobile development and its unique requirements and constraints. Students design and build a variety of mobile applications with a hands-on and projectbased approach.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5180', 
        title: 'Mobile Application Development', 
        courseDescription: 'Examines the issues related to network based application development. Topics include: introduction to computer networks, web technologies and standards, network based programming methodologies, languages, tools and standards', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5366', 
        title: 'Network-Based Application Development', 
        courseDescription: 'Examines the issues related to network based application development. Topics include: introduction to computer networks, web technologies and standards, network based programming methodologies, languages, tools and standards', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5180', 
        title: 'Mobile Application Development', 
        courseDescription: "Mobile platforms are at the center of attention of users and organizations nowadays. Most organizations and businesses are rapidly migrating toward the cloud and need to provide a fast and easy mechanism for users to stay connected to their services. Mobile applications are the top trend nowadays given the high variety of new mobile devices and platforms such as Apple's iOS and Google's Android. In this course, students are introduced to the foundations of mobile development and its unique requirements and constraints. Students design and build a variety of mobile applications with a hands-on and projectbased approach.", 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5221', 
        title: 'Secure Programming and Penetration Testing', 
        courseDescription: 'Techniques for web application penetration testing, secure software development techniques for network based applications. Automated approaches such as static code analysis and application scanning are also discussed.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5246', 
        title: 'Competitive Cyber Defense', 
        courseDescription: 'Hands-on experience with designing, deploying, securing, and defending enterprise network services.  Topics include: securing network communication, single-sign-on services, firewall and IDS deployment, security policy design and development, log analysis, securing critical network infrastructure, network access control policies, penetration testing tools, secure information flow, and secrets management.  Students are expected to demonstrate their ability to defend these services against adversary attacks.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5250', 
        title: 'Computer Forensics', 
        courseDescription: 'Digital evidence; responding to electronic incidents; tracking communications through networks; understanding electronic media, crypto-literacy, data hiding, hostile code, and Windows™ and UNIX™ system forensics; and the role of forensics in the digital environment.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5260', 
        title: 'Introduction to Security Analytics', 
        courseDescription: 'Focuses on security-related sense-making and decision-making based on data analytics techniques.  Topics include: data cleaning and storage techniques, introduction to R, clustering analysis and statistical inference for security; log analysis; event correlation, anomaly detection, cyber threat intelligence, and use of public cybersecurity information resources.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5261', 
        title: 'Introduction to Secured Cloud Computing', 
        courseDescription: 'Design and deployment of secure and robust cloud computing solutions. Instructions will rely on hands-on labs. It focuses on selecting appropriate components in the cloud and securely configuring them to support a specific application.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5280', 
        title: 'Advanced Mobile Application Development', 
        courseDescription: 'Exploration of a wide range of mobile application development concepts, frameworks, and patterns.  Introduction to real world mobile application projects in partnership with university and industrial partners, as well as Agile Development concepts and up-to-date Agile and team management tools.  The course is project-based; students are paired with a subject matter expert and work on a single project throughout the semester, which is expected to result in a functioning mobile app prototype.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5331', 
        title: 'Web-Based Mobile and IoT Firmware Security', 
        courseDescription: 'An introduction to recent security topics in web-based mobile and Internet of Things (IoT) software security.  Explores vulnerability types, development of vulnerable app testbeds, exploit creation, and software defenses.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5350', 
        title: 'Rapid Prototyping', 
        courseDescription: 'Introduction to theory and approaches for rapid prototyping in interface design. Explores theoretical constructs behind rapid prototyping and how it relates to Human-Computer Interaction.  Students study evolutionary prototyping. This begins with low fidelity prototyping techniques such sketching and paper prototyping, and progressively iterate through higher fidelity prototyping techniques using digital tools.  In addition to software prototyping, the course also provides an introduction to physical prototyping.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5358', 
        title: 'Physical Computing', 
        courseDescription: 'If you have an interest in creativity and making things with 3D Printing, Digital Fabrication, Arduino and small computing / electronics, consider the Fall course on Physical Computing. Physical Computing - Making Interactive Things With 3D Printing, Digital Design and Fabrication, and Small Compute Platforms 3D printing, digital design, and fabrication are increasingly used for everything from household replacement parts and objects to accessibility devices, food, transplant tissue and organs, and fully 3D printed houses. Experience with digital design and fabrication is about how computing connects to the physical world. Computing is increasingly integrated into everyday life, and a big part of that is in the design of physical objects that we interact with on a daily basis. If you want to develop new internet-of-things devices, you need to be able to create the things - alongside the hardware and software. If you want to design smart clothes, toys, prosthetics, instruments, longboards, robots and much more, then you need to prototype both the physical components and tangible interactions. This course covers principles and practice for developing systems with tangible, embedded, and embodied interaction. The course provides foundations in digital design and digital fabrication, small computing systems and programming, tangible prototyping with sensors and effectors, and user experience design for tangible computing. Make something, make a difference.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5390', 
        title: 'Interaction Design Projects', 
        courseDescription: 'A studio approach to teaching topics in interaction design. Aspects of interaction design taught in the studio include: gesture-based interaction, tangible interaction, large public display interaction, tabletop interaction, multi-touch tablet interaction, and human-robot interaction. Students learn to apply a theoretical understanding of some aspect of interaction design to the study of existing designs and the development of a new design. Outcomes include writing a literature review about interaction design, executing users studies and critiques of existing designs, and developing and implementing a new interaction design for a specific purpose.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 5510', 
        title: 'Web Mining', 
        courseDescription: 'Topics include: measuring and modeling the Web; crawling, Web search and information retrieval; unsupervised learning, supervised learning,semi-supervised learning in Web context; social network analysis and hyperlink analysis; text parsing and knowledge representation.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6010', 
        title: 'AI for Healthcare', 
        courseDescription: 'Artificial Intelligence (AI) has played an important role in improving the quality and efficiency of healthcare. Especially in recent years, with the dramatic increase of the volume and richness of healthcare data and the advent of machine learning and deep learning methods, numerous AI models and applications have been reported to achieve near-expert-level performance or even surpass expert performance in some scenarios. However, successful deployment of AI applications in real-world clinical practice is still rare, and broad acceptance of these new technologies is even more challenging. In this course, we will first quickly review major AI models and methods that have been developed in the healthcare domain and then spend significant time examining the many critical aspects of investigation and development that are necessary to translate AI models and methods that have been successfully tested in the laboratory settings into real-world healthcare settings and then continue to maintain and update the AI models and methods in operations. (Data Science Elective)', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6112', 
        title: 'Software System Design and Implementation', 
        courseDescription: 'Introduction to the techniques involved in the planning and implementation of large software systems. Emphasis on human interface aspects of systems. Planning software projects; software design process; top-down design; modular and structured design; management of software projects; testing of software; software documentation; choosing a language for software system.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6120', 
        title: 'Applied Databases', 
        courseDescription: 'Identification of business database needs; requirements specification; relational database model; SQL; E-R modeling; database design, implementation, and verification; distributed databases; databases replication; object-oriented databases; data warehouses; OLAP; data mining; security of databases; vendor selection; DBMS product comparison; database project management; tools for database development, integration, and transaction control.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6150', 
        title: 'Software Assurance', 
        courseDescription: 'An introduction to software assurance education and research. Topics include: the security of software across the development life cycle that addresses trustworthiness, predictable execution and conformance. Various aspects of secure software requirements, design, construction, verification, and validation, process and engineering management are focused on as they relate to secure software development. Students gain hands-on experience in various techniques and tools as part of a semesterlong project in addition to other assignments.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6162', 
        title: 'Knowledge Discovery in Databases', 
        courseDescription: 'Exploration of the entire knowledge discovery process.  Topics include: setting up a problem, data preprocessing and warehousing, data mining in search for knowledge, knowledge evaluation, visualization and application in decision making.  A broad range of systems, such as OLAP, LERS, DatalogicR+, C4.5, AQ15, Forty-Niner, CN2, QRAS, and discretization algorithms are also covered.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6163', 
        title: 'Data Warehousing', 
        courseDescription: 'Topics include: use of data in discovery of knowledge and decision making; the limitations of relational databases and SQL queries; the warehouse data models: multidimensional, star, snowflake; architecture of data warehouse and the process of warehouse construction; data consolidation from various sources; optimization; techniques for data transformation and knowledge extraction; relations with enterprise modeling.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6167', 
        title: 'Network Security', 
        courseDescription: 'Examines the issues related to network security. Topics include: network security background and motivation, network centric threats, network authentication and identification, network security protocols, firewall, IDS, security in wireless environments, email security, instant message security, network application security, and network based storage security. There are heavy lab based components in this course.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6177', 
        title: 'System Integration', 
        courseDescription: 'Examines the issues related to system integration. Topics include: data integration, business process integration, integration architecture, middleware, system security, and system management.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6198', 
        title: 'IT Internship Project', 
        courseDescription: 'Complete a team-based project that is originated from an IT organization and approved by the department.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6200', 
        title: 'Principle of Information Security and Privacy', 
        courseDescription: 'Topics include: security concepts and mechanisms; security technologies; authentication mechanisms; mandatory and discretionary controls; basic cryptography and its applications; database security, intrusion detection and prevention; assurance requirement, assurance class, evaluation methods and assurance maintenance; anonymity and privacy issues for information systems.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6210', 
        title: 'Access Control and Security Architecture', 
        courseDescription: 'Discusses objectives, formal models, and mechanisms for access control; and access control on commercial off-the-shelf (COTS) systems. Examines the issues related to security architectures and technologies for authorization. Topics include: cryptographic infrastructure, distributed systems security architectures, database systems security architectures, Internet security architectures, network security architectures and e-commerce security architectures.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6220', 
        title: 'Data Privacy', 
        courseDescription: 'Topics include: privacy concepts, policies, and mechanisms; identity, anonymity, and confidentiality; private data analysis and database sanitization; privacy-preserving data mining techniques including k-anonymity, randomization, and secure function evaluation; privacy issues in social networks, RFID, and healthcare applications.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6230', 
        title: 'Enterprise and Infrastructure Protection', 
        courseDescription: 'Methodologies, tools, and technologies that are important for protecting data and network security in both enterprises and critical infrastructures. Topics include: the prevent-detect-response strategy for enterprise security, policies, techniques, processes and methodologies for risk assessment and management, infrastructure reconnaissance and vulnerability analysis, basics of forensics, methodologies for continuous operation and recovery from disasters.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6240', 
        title: 'Applied Cryptography', 
        courseDescription: 'Provides students with an understanding of modern cryptographic techniques, algorithms and protocols that are of fundamental importance to the design and implementation of security critical applications. Covers not only standard cryptographic techniques, but also exposes students to the latest advances in applied cryptography. Topics include: secret and public key ciphers, stream ciphers, one-way hashing algorithms, authentication and identification, digital signatures, key establishment and management, secret sharing and data recovery, public key infrastructures, and efficient implementation.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6260', 
        title: 'Quantum Computing', 
        courseDescription: 'The fundamental concepts and algorithms of quantum mechanics, quantum computation, quantum information theory, and post quantum cryptography.  Topics include: quantum mechanics, quantum states, quantum entanglement, quantum measurement, qubits, quantum computation, universal quantum gates, reversible computation, quantum algorithms, quantum Fourier transform, quantum search, quantum computers, quantum noise and quantum operations, quantum error-correction, and post-quantum cryptography.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6268', 
        title: 'Wireless Network Security', 
        courseDescription: 'Introduction to the state-of-art techniques in wireless security.  Topics include: Secure and resilient data aggregation, Key pre-distribution and management, Security in group communication, Trust establishment and management, Denial-of-service attacks, Secure routing, Secure localization and information privacy, and more.  The application environments cover mobile ad hoc networks, sensor networks, Internet of Things, Cyber Physical Systems, and Cellular Networks. ', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6270', 
        title: 'BlockChain, Cryptocurrency, and Distributed Ledger Technologies', 
        courseDescription: 'Provides an understanding of the fundamental concepts and technologies of distributed ledger technologies (DLT), blockchains, consensus techniques, cryptocurrency, and smart contracts. Topics include: blockchains, cryptocurrency, distributed ledger technologies, smart contract programming languages, and their applications.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6320', 
        title: 'Cloud Data Storage', 
        courseDescription: 'The design and implementation of cloud storage and big data systems and the architecture and characteristics of components on which cloud storage systems are built. Topics include: storage device hardware, file systems, mirroring and RAID, array coding techniques, storage area networks (SAN), network-attached storage (NAS), cloud storage and big data, DB in clouds, relational storage models, key value stores and other No-SQL mechanisms, data consistency and availability in the cloud, cloud data privacy and security.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6330', 
        title: 'CMalware Analysis', 
        courseDescription: 'Introduction to the most important topics in malware analysis, including system security basics, malware concept/classification, attacks, static analysis, dynamic analysis, sandboxes, emulators, and virtual machine introspection. Students finish a series of hands-on labs in order to learn how to use common analysis tools to dissect real-world malware in a prebuilt environment. Students are also exposed to the challenges imposed by malware attempt to evade or thwart analysis.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6342', 
        title: 'Information Technology Project Management', 
        courseDescription: 'Introduction to problems associated with managing information technology projects involving, particularly, integration of systems, development of client-specific solutions, and project justification. Moves beyond the classic techniques of project management and integrate communication software/systems, multi-site, multiclient facilities projects, cultural issues involved with managing interdisciplinary teams, and the effect of rapid technological obsolescence on project justification, funding and continuance.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6362', 
        title: 'Information Technology Ethics, Policy, and Security', 
        courseDescription: 'Management of Information technology involves understanding the broader issues of ethics, policy and security. The growth in Internet usage and E-commerce require IT professionals to consider issues pertaining to data protection, regulation, and appropriate use and dissemination of information. The course is designed to be team-taught by professionals in the field.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6367', 
        title: 'Network Security', 
        courseDescription: 'Examines the issues related to network security. Topics include: network security background and motivation, network centric threats, network authentication and identification, network security protocols, firewall, IDS, security in wireless environments, email security, instant message security, network application security, and network based storage security. There are heavy lab based components in this course.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6370', 
        title: 'Interactive Systems Design and Implementation', 
        courseDescription: 'The implementation of interactive software systems through standard IDE programming environments, with a focus on ensuring that the systems adhere to standard usability principles and are built following scalable programming models, such as the model-view-controller.  The assignments in this course focus on desktop/laptop implementations, as opposed to mobile or web application, though the theory is useful across all platforms.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },
      
      { 
        code: 'ITIS 6400', 
        title: 'Human-Centered Design', 
        courseDescription: 'Introduces and provides experience in concepts and methods for human-computer interaction, with an emphasis on methods for human-centered design and evaluation of user experiences with IT.  Topics include: design principles, need finding, design prototypes, and evaluation of interaction designs to make them compatible with human capabilities and expectation.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6410', 
        title: 'Personalization and Recommender Systems', 
        courseDescription: 'An introduction to the application of personalization and recommender systems techniques in information systems. Topics include: historical, individual and commercial perspectives; underlying approaches to content-based and collaborative recommendation techniques for building user models; acceptance issues; and casestudies drawn from research prototypes and commercially deployed systems.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6420', 
        title: 'Usable Security and Privacy', 
        courseDescription: 'Much of the work into security and privacy solutions ignore a critical element: the human who must interact with those solutions. In this course, we investigate privacy and security from a user-centered point of view. How do people think about privacy and security? How do they interact with current applications and solutions? What should be considered in designing user-friendly security systems? This course introduces students to a variety of usability and user interface issues related to privacy and security as well as examine potential designs and solutions.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6520', 
        title: 'Network Science', 
        courseDescription: 'Network Science helps students design faster, more resilient communication networks; revise infrastructure systems such as electrical power grids, telecommunications networks, and airline routes; model market dynamics; understand synchronization in biological systems; and analyze social interactions among people. It examines the various kinds of networks (regular, random, small-world, influence, scale-free, and social) and applies network processes and behaviors to emergence, epidemics, synchrony, and risk. This course integrates concepts across computer science, biology, physics, social network analysis, economics, and marketing.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },     

      { 
        code: 'ITIS 6880', 
        title: 'Individual Study', 
        courseDescription: 'With the direction of a faculty member, students plan and implement appropriate objectives and learning activities to develop specific areas of expertise through research, reading, and individual projects.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6991', 
        title: 'Information Technology Thesis', 
        courseDescription: 'Graduate thesis research. A detailed exploration of an area of information technology chosen for thesis research.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 6999', 
        title: 'SFS Research', 
        courseDescription: 'Research for CyberCorps Scholarship for Service (SFS) program. .', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 8010', 
        title: 'Cybersecurity in AI', 
        courseDescription: ' The rapid development of artificial intelligence (AI) technologies urges the adoption of AI in numerous domains. It is critical to address the cybersecurity issues in AI and to protect AI systems from malicious adversaries. This course will discuss AI cybersecurity risks, explore adversarial machine learning techniques, and implement secure AI systems. This course requires prior proficiency in statistics, machine learning fundamentals, and Python programming.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 8112', 
        title: 'Software System Design and Implementation', 
        courseDescription: 'Introduction to the techniques involved in the planning and implementation of large software systems. Emphasis on human interface aspects of systems. Planning software projects; software design process; top-down design; modular and structured design; management of software projects; testing of software; software documentation; choosing a language for software system.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 8120', 
        title: 'Applied Databases', 
        courseDescription: 'Identification of business database needs; requirements specification; relational database model; SQL; E-R modeling; database design, implementation, and verification; distributed databases; databases replication; object-oriented databases; data warehouses; OLAP; data mining; security of databases; vendor selection; DBMS product comparison; database project management; tools for database development, integration, and transaction control.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 8180', 
        title: 'Foundations of Health Informatics', 
        courseDescription: 'An overview of foundational concepts and methods in healthcare systems, technologies, and policies that are critical for successful research in health informatics.  Students explore recurring themes, issues, and applications most frequently encountered in the field.  The course is both technical and rigorous, and will involve both theoretical analysis and substantial projects.  Topic include:  an overview of issues, systems and technologies in health informatics and in-depth discussion of data standards, data integration, data analytics, and evaluation methods.  Students who take this course gain the skills and knowledge necessary to conduct research in health informatics.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 8200', 
        title: 'Principles of Information Security and Privacy', 
        courseDescription: 'Topics include: security concepts and mechanisms; security technologies; authentication mechanisms; mandatory and discretionary controls; basic cryptography and its applications; intrusion detection and prevention; information systems assurance; anonymity and privacy issues for information systems.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 8240', 
        title: 'Applied Cryptography', 
        courseDescription: 'Provides students with an understanding of modern cryptographic techniques, algorithms and protocols that are of fundamental importance to the design and implementation of security critical applications. The course not only covers standard cryptographic techniques, but also exposes students to the latest advances in applied cryptography. Topics include: secret and public key ciphers, stream ciphers, oneway hashing algorithms, authentication and identification, digital signatures, key establishment and management, secret sharing and data recovery, public key infrastructures, and efficient implementation.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 8367', 
        title: 'Network and Information Security', 
        courseDescription: 'Examines the issues related network and information security. Topics include: concepts, security attacks and risks, security architectures, security policy management, security mechanisms, cryptographic algorithms, security standards, security system interoperation and case studies of the current major security systems.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },  

      { 
        code: 'ITIS 8400', 
        title: 'Human-Centered Design', 
        courseDescription: 'Introduces and provides experience in concepts and methods for human-computer interaction, with an emphasis on methods for human-centered design and evaluation of user experiences with IT.  Topics include: design principles, need finding, design prototypes, and evaluation of interaction designs to make them compatible with human capabilities and expectation.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ITIS 8520', 
        title: 'Network Science', 
        courseDescription: 'Network Science helps students design faster, more resilient communication networks; revise infrastructure systems such as electrical power grids, telecommunications networks, and airline routes; model market dynamics; understand synchronization in biological systems; and analyze social interactions among people. It examines the various kinds of networks (regular, random, small-world, influence, scale-free, and social) and applies network processes and behaviors to emergence, epidemics, synchrony, and risk. This course integrates concepts across computer science, biology, physics, social network analysis, economics, and marketing.', 
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      // ITCS Undergraduate Courses
      { 
        code: 'ITCS 1101', 
        title: 'Introduction to Computer Concepts',
        courseDescription: 'Introductory course that gives an overview of computer hardware and software. Primary emphasis is on productivity software (word processing, spreadsheet, and graphical presentation). These applications are taught through a series of projects/assignments. Aspects of Internet research are also covered.',
        unccCatalogID: '36', 
        unccCourseID: '123014'  
      },

      { 
        code: 'ITCS 1102', 
        title: 'Advanced Internet Concepts',
        courseDescription: 'An advanced study of the Internet environment designed for any student who is familiar with office productivity tools and a user of Internet technologies; it addresses advanced concepts of computer literacy.  Topics include: concepts of website design and how to evaluate websites; proper use of synchronous and asynchronous communication tools (e.g., chat, email, IM); issues of copyright and cyber-ethics; using the Internet to do research; and publishing via the Internet.  Other topics may be added to keep the content current and relevant.  Students complete extensive Internet-oriented projects to demonstrate mastery of the skills discussed in class. ',
        unccCatalogID: '36', 
        unccCourseID: '123015'  
      },

      { 
        code: 'ITCS 1301', 
        title: 'Introduction to the Financial Services Industry',
        courseDescription: 'An overview of the financial services industry, including such areas as the industry components; regulatory considerations and their impact; and relations with other institutions.',
        unccCatalogID: '36', 
        unccCourseID: '123020'  
      },

      { 
        code: 'ITCS 3610', 
        title: 'Computing Applications Seminar',
        courseDescription: 'A service-learning seminar course designed to emphasize the social relevance of computing. The course aims to inform non-computing specialists of computing technologies, research, and career opportunities. Seminar topics are intended to enhance disciplinary knowledge and to develop leadership skills related to using computing knowledge and skills in service to society. Emphasis placed on the basic concepts of leadership theory and its application within the computing discipline on an individual, group, and societal level. Students participate in team-based computing service-learning projects in the community, in conjunction with computing majors taking ITCS 3610. Student performance evaluation considers individual homework assignments, participation in team projects, and class participation.',
        unccCatalogID: '36', 
        unccCourseID: '123022'  
      },

      { 
        code: 'ITCS 1712', 
        title: 'Introduction to Computer Science (Honors)',
        courseDescription: 'Introduction to algorithmic problem solving using high level programming languages. Basic programming concepts (decision making, iteration, subroutines) and data types (atomic and aggregates) will be taught in C++ and Java. Advanced concepts such as pointers, references, and polymorphism will be explored.',
        unccCatalogID: '36', 
        unccCourseID: '123023'  
      },

      { 
        code: 'ITCS 2050', 
        title: 'Topics in Computer Science',
        courseDescription: 'Topics in computer science selected to supplement the regular course offerings at the 2000 level. ',
        unccCatalogID: '36', 
        unccCourseID: '123024'  
      },

      { 
        code: 'ITCS 2116', 
        title: 'C Programming',
        courseDescription: 'A study of the programming language C. Data types, operators, functions, program structure, file I/O, storage classes, exceptions, concurrent programming, and the preprocessor.',
        unccCatalogID: '36', 
        unccCourseID: '123025'  
      },

      { 
        code: 'ITCS 2215', 
        title: 'Design and Analysis of Algorithms',
        courseDescription: 'Introduction to the design and analysis of algorithms. Design techniques: divide-and-conquer, greedy approach, dynamic programming. Algorithm analysis: asymptotic notation, recurrence relation, time space complexity and tradeoffs. Study of sorting, searching, hashing, and graph algorithms.',
        unccCatalogID: '36', 
        unccCourseID: '123030'  
      },

      { 
        code: 'ITCS 2231', 
        title: 'Introduction to Business Programming',
        courseDescription: 'The examination of business problems, the extraction of the logic and business rules, and the relationship between business logic, programming constructs and technologies for decision support.',
        unccCatalogID: '36', 
        unccCourseID: '123031'  
      },

      { 
        code: 'ITCS 2301', 
        title: 'Financial Services Computing Environment',
        courseDescription: 'The objective is for the student to gain insights on several key components in financial computing environments and the enabling technologies..',
        unccCatalogID: '36', 
        unccCourseID: '123032'  
      },
      
      { 
        code: 'ITCS 3050', 
        title: 'Topics in Computer Science',
        courseDescription: 'Topics in computer science selected to supplement the regular course offerings at the 3000 level.',
        unccCatalogID: '36', 
        unccCourseID: '123033'  
      },

      { 
        code: 'ITCS 3112', 
        title: 'Design and Implementation of Object-Oriented Systems',
        courseDescription: 'In-depth exploration of object-oriented programming and system development. Topics include: evolution of object-oriented methodology; concept of the object-oriented approach; object-oriented programming languages; object-oriented analysis and design; the design of software for reuse; and incremental software development.',
        unccCatalogID: '36', 
        unccCourseID: '123035'  
      },

      { 
        code: 'ITCS 3120', 
        title: 'Introduction to Interactive Computer Graphics',
        courseDescription: 'Introduction to graphics hardware; raster algorithms; event-based programming; shader programming; anti-aliasing methods; matrix algebra for change of coordinates and 2D geometric transformations; 2D viewing transformation and clipping; 2D curves and 2D splines.',
        unccCatalogID: '36', 
        unccCourseID: '123063'  
      },

      { 
        code: 'ITCS 3134', 
        title: 'Digital Image Processing',
        courseDescription: 'Overview of fundamentals of image acquisition, representation, enhancement, segmentation, reconstruction, analysis and recognition. Image generation, viewing and perception; image transformations using the Fourier transform; spatial operations and filtering (spatial and frequency domain); image coding; lossless and lossy compression; boundary and region based segmentation; thresholding and classification; boundary and regional image descriptors; matching and neural networks; shape numbers.',
        unccCatalogID: '36', 
        unccCourseID: '123037'  
      },

      { 
        code: 'ITCS 3143', 
        title: 'Operating Systems',
        courseDescription: 'Introduction to multiprogramming operating systems. Process synchronization and management of memory, devices, and files; performance evaluation.',
        unccCatalogID: '36', 
        unccCourseID: '123038'  
      },

      { 
        code: 'ITCS 3145', 
        title: 'Parallel and Distributed Computing',
        courseDescription: 'Parallel and distributed computing is the use of multiple processors or computers to achieve greater performance.  All computers today have multiple processor cores.  Topics include: classification of parallel systems, programming parallel shared-memory systems, programming distributed-memory systems, patterns for parallel programming, foundation of parallel algorithms, and languages and tools for parallel programming.',
        unccCatalogID: '36', 
        unccCourseID: '124652'  
      },

      { 
        code: 'ITCS 3152', 
        title: 'Symbolic Programming',
        courseDescription: 'Basic concepts of symbolic programming including selected topics in artificial intelligence, heuristic searching, symbolic algebra, language parsing, and theorem proving.',
        unccCatalogID: '36', 
        unccCourseID: '123040'  
      },

      { 
        code: 'ITCS 3153', 
        title: 'Introduction to Artificial Intelligence',
        courseDescription: 'Basic concepts of artificial intelligence. Topics include: defining the problem as a state space search, production systems; heuristic search; basic problem-solving methods; game playing; knowledge representation using predicate logic, semantic nets, frames, and scripts; non-monotonic reasoning, statistical and probabilistic reasoning.',
        unccCatalogID: '36', 
        unccCourseID: '123041'  
      },

      { 
        code: 'ITCS 3182', 
        title: 'Computer Organization and Architecture',
        courseDescription: 'Machine level representation of data; von Neumann architecture; instruction sets and types; addressing types; assembly and machine language programming; control unit and microprogramming; alternate architectures.',
        unccCatalogID: '36', 
        unccCourseID: '123047'  
      },

      {
        code: 'ITCS 3190', 
        title: 'Introduction to Cloud Computing for Data Analysis',
        courseDescription: 'Introduction to the principles of cloud computing for data science applications.  Focuses on distributed computing, and algorithms for scalable data processing.  Topics include:  parallel processing, information retrieval, knowledge discovery in databases, web search, computational advertising, and scientific data analysis.  Students are expected to bring their laptops to class.',
        unccCatalogID: '36', 
        unccCourseID: '124653'  
      },

      { 
        code: 'ITCS 3211', 
        title: 'Computing Leaders Team Projects',
        courseDescription: 'A service-learning course that builds upon the leadership concepts from ITCS 3610 through focused hands-on experience with service-learning projects. Students work in teams to apply computing technologies, knowledge and skills to serve community needs.',
        unccCatalogID: '36', 
        unccCourseID: '123049'  
      },

      { 
        code: 'ITCS 3212', 
        title: 'Computing Leaders Team Leaders',
        courseDescription: 'A service-learning course that builds upon the leadership concepts from ITCS 3610 through focused hands-on experience with service-learning projects. Companion course to ITCS 3211; students in this course serve as team leaders for the team projects undertaken by students in ITCS 3211. Students lead teams to apply computing technologies, knowledge, and skills to serve community needs.',
        unccCatalogID: '36', 
        unccCourseID: '123050'  
      },

      { 
        code: 'ITCS 3216', 
        title: 'Introduction to Cognitive Science',
        courseDescription: 'Interdisciplinary introduction to the science of the mind. Broad coverage of such topics as philosophy of mind, human memory processes, reasoning and problem solving, artificial intelligence, language processing (human and machine), neural structures and processes, and vision.',
        unccCatalogID: '36', 
        unccCourseID: '123051'  
      },

      { 
        code: 'ITCS 3360', 
        title: 'Database Design and Implementation',
        courseDescription: 'Logical and physical database organization, data models, design issues, and secondary storage considerations. Emphasis on actual participation in the design and implementation of databases.',
        unccCatalogID: '36', 
        unccCourseID: '123043'  
      },

      { 
        code: 'ITCS 3362', 
        title: 'Introduction to Data Mining',
        courseDescription: 'The key objectives of this course are two-fold: (1) to teach the basic concepts of data mining and (2) to provide extensive hands-on experience in applying the concepts to real-world business applications.  Topics include: Data Collection, Data Preprocessing, Data Exploration, Feature Engineering, Prediction Model, Clustering, Association Analysis, Graph/Network Analysis, Text Mining and Social Media Analysis, and Anomaly Detection.',
        unccCatalogID: '36', 
        unccCourseID: '124624'  
      },

      { 
        code: 'ITCS 3366', 
        title: 'Intro to Computer Networks',
        courseDescription: 'Internet architecture and protocols. Distributed vs. centralized processing. Data communications; speed; capacity; media, protocols. Network architectures. Evaluation of alternatives. Case studies.',
        unccCatalogID: '36', 
        unccCourseID: '123044'  
      },

      { 
        code: 'ITCS 3610', 
        title: 'Computing Leaders Seminar',
        courseDescription: 'A service-learning seminar course. Seminar topics are intended to enhance disciplinary knowledge and skills (computing technologies, research, careers) and to develop leadership skills by using computing knowledge and skills in service to society (service and civic engagement). Emphasis placed on the basic concepts of leadership theory and its application within the computing discipline on an individual, group, and societal level. Students participate in team-based computing service-learning projects in the community. Student performance evaluation considers individual homework assignments, participation in team projects, class participation, and feedback from those served.',
        unccCatalogID: '36', 
        unccCourseID: '123054'  
      },
      
      { 
        code: 'ITCS 4010', 
        title: 'Topics in Computer Science',
        courseDescription: 'Topics in computer science selected to supplement the regular course offerings at the 4000 level.',
        unccCatalogID: '36', 
        unccCourseID: '123060'  
      },

      { 
        code: 'ITCS 4102', 
        title: 'Programming Languages',
        courseDescription: 'Formal definition of programming languages, including specification of syntax and semantics. Evolution of programming languages and language design principles. Structural organization, control structures, data structures and types, name visibility, binding times, parameter passing modes, subroutines, co-routines, and tasks. Functional programming, list processing, logic programming, object-oriented programming systems.',
        unccCatalogID: '36', 
        unccCourseID: '123061'  
      },

      { 
        code: 'ITCS 4111', 
        title: 'Introduction to Natural Language Processing',
        courseDescription: 'The practical methods and techniques of natural language processing and text mining.  These techniques, mainly the techniques of syntactic and semantic processing, are illustrated with specific tasks (such as: Information Extraction, Dialogue Systems, Information Retrieval, etc.).  Most programming assignments are for the laptop.  Selected ones could be done in the cloud (e.g., using AlchemyAPI and/or IBM Bluemix).  Students are expected to bring their laptops to each class.',
        unccCatalogID: '36', 
        unccCourseID: '124655'  
      },

      { 
        code: 'ITCS 4114', 
        title: 'Real World Algorithms',
        courseDescription: 'Basic and advanced algorithms foundational to computer science. In particular, the course will tie each algorithm with a real-world problem or application, thereby illustrating its relevance and importance in solving complex and challenging problems. Algorithms will span the topics of sorting, searching, geometric  and graph algorithms. Algorithm implementation and testing will involve datasets from a variety of application domains.',
        unccCatalogID: '36', 
        unccCourseID: '129740'  
      },

      { 
        code: 'ITCS 4121', 
        title: 'Information Visualization',
        courseDescription: 'Information visualization concepts, theories, design principles, popular techniques, evaluation methods, and information visualization applications.',
        unccCatalogID: '36', 
        unccCourseID: '123064'  
      },

      { 
        code: 'ITCS 4122', 
        title: 'Visual Analytics',
        courseDescription: 'Introduces the new field of visual analytics, which provides tools for the interactive visual analysis of large and complex data sets in many application areas. Topics include: visual representation, perception, the analysis process, critical thinking, data transformations, color, interaction, and applications.',
        unccCatalogID: '36', 
        unccCourseID: '123065'  
      },

      { 
        code: 'ITCS 4123', 
        title: 'Visualization and Visual Communication',
        courseDescription: 'Understanding the relatively technical field of visualization from the point of view of visual communication; this course draws connections with photography, design, illustration, aesthetics, and art. Both technical and theoretical aspects of the various fields are covered, and the connections between them are investigated.',
        unccCatalogID: '36', 
        unccCourseID: '123066'  
      },

      { 
        code: 'ITCS 4124', 
        title: 'Advanced 3D Computer Graphics',
        courseDescription: 'Introduction to 3D transforms, 3D viewing and visibility algorithms; local illumination models; texture mapping; 3D surfaces; advanced lighting models; geometric modeling techniques and procedural geometry methods.',
        unccCatalogID: '36', 
        unccCourseID: '124654'  
      },

      { 
        code: 'ITCS 4125', 
        title: 'Introduction to Virtual Reality and Augmented Reality',
        courseDescription: 'Introduces the basic technologies of virtual and augmented reality (VR/AR). Students learn the diverse topics of VR/AR, learn and practice core skills to develop basic VR/AR programs, and learn example VR/AR applications.',
        unccCatalogID: '36', 
        unccCourseID: '125252'  
      },

      { 
        code: 'ITCS 4128', 
        title: 'Programming Languages and Compilers',
        courseDescription: 'Introduction to the concepts and techniques used in describing, defining, and implementing programming languages and their compilers. Introduction to parsing and parser construction; LL and LR grammars; syntax directed translation; data object representations; run time structures; intermediate languages; code optimization.',
        unccCatalogID: '36', 
        unccCourseID: '123067'  
      },

      { 
        code: 'ITCS 4141', 
        title: 'PComputer Organization and Architecture',
        courseDescription: 'Fundamentals of computer design; instruction set design, basic processor implementation techniques; pipelining; memory hierarchy; Input/Output. Cost/performance and hardware/software trade-offs.',
        unccCatalogID: '36', 
        unccCourseID: '123070'  
      },

      { 
        code: 'ITCS 4145', 
        title: 'Parallel Programming',
        courseDescription: 'Types of parallel computers, programming techniques for multiprocessor and multicomputer systems, parallel strategies, algorithms, and languages.',
        unccCatalogID: '36', 
        unccCourseID: '123071'  
      },

      { 
        code: 'ITCS 4150', 
        title: 'Mobile Robotics',
        courseDescription: 'An introduction to basic concepts and techniques used in mobile robotics.  Topics include: mobile robot hardware, sensors and sensor data processing, planning and control, robot architectures, localization and mapping, path planning, and mobile robot applications.',
        unccCatalogID: '36', 
        unccCourseID: '124656'  
      },

      { 
        code: 'ITCS 4151', 
        title: 'Intelligent Robotics',
        courseDescription: 'General introduction to spatial descriptions and transformations, and manipulator position and motion. More study on robot planning, programming, sensing, vision, and CAD/CAM.',
        unccCatalogID: '36', 
        unccCourseID: '123073'  
      },

      { 
        code: 'ITCS 4152', 
        title: 'Computer Vision',
        courseDescription: 'General introduction to computer vision and its application. Topics include: low level vision, 2D and 3D segmentation, 2D description, 2D recognition, 3D description and model-based recognition, and interpretation.',
        unccCatalogID: '36', 
        unccCourseID: '123074'  
      },

      { 
        code: 'ITCS 4156', 
        title: 'Introduction to Machine Learning',
        courseDescription: 'Introduction to the machine learning pipeline of data collection, feature creation, algorithms, and evaluation for classification and regression, with an emphasis on practical applications.  Covers fundamental concepts, such as training, validation, overfitting, and error rates in addition to commonly used machine learning algorithms, such as decision trees, Naive Bayes, and random forests.',
        unccCatalogID: '36', 
        unccCourseID: '124666'  
      },

      { 
        code: 'ITCS 4158', 
        title: 'Blockchain System Architecture',
        courseDescription: 'Introduces students to Blockchain technology, which can be used to record and transfer digital assets, and the trustless system architecture underlying this technology. Employs a hands-on learning approach, using open-source platforms such as Hyperledger or Ethereum.',
        unccCatalogID: '36', 
        unccCourseID: '125042'  
      },

      { 
        code: 'ITCS 4161', 
        title: 'Intellectual Property Aspects of Computing',
        courseDescription: 'This course explores the broad field of intellectual property and the many aspects related to computing. Topics covered include software copyrights, software patents, trademarks and service marks, employment contracts, non-compete agreements, software licenses, software development contracts, preservation of digital evidence, protection of trade secrets, cyberspace law and the use of mediation in IP disputes.',
        unccCatalogID: '36', 
        unccCourseID: '123077'  
      },

      { 
        code: 'ITCS 4165', 
        title: 'Computing Entrepreneurship',
        courseDescription: 'Introduction to entrepreneurship and the specificities of creating a computing and technology driven small business.  An overview of how successful entrepreneurs learn about the marketplace, conduct financial analyses, and utilize management skills to develop entrepreneurial opportunities.  Other topics include: intellectual property protection, funding options, technology business planning, and start-up structure. ',
        unccCatalogID: '36', 
        unccCourseID: '124743'  
      },

      { 
        code: 'ITCS 4180', 
        title: 'Mobile Application Development',
        courseDescription: 'Mobile platforms are at the center of attention of users and organizations nowadays. Most organizations and businesses are rapidly migrating toward the cloud and need to provide a fast and easy mechanism for users to stay connected to their services. Mobile applications are the top trend nowadays given the high variety of new mobile devices and platforms such as Apple’s iOS and Google’s Android. In this course, students are introduced to the foundations of mobile development and its unique requirements and constraints. Students design and build a variety of mobile applications with a hands-on and project-based approach.',
        unccCatalogID: '36', 
        unccCourseID: '123078'  
      },

      { 
        code: 'ITCS 4182', 
        title: 'Introduction to High-Performance Computing',
        courseDescription: 'Fundamentals of parallel computer systems; throughput computing; memory hierarchies; computation/communication overlapping; mapping high level programs to low level components; leveraging accelerators; performance optimization; performance evaluation.',
        unccCatalogID: '36', 
        unccCourseID: '124657'  
      },

      { 
        code: 'ITCS 4230', 
        title: 'Introduction to Game Design and Development',
        courseDescription: 'Basic concepts and techniques for electronic game design and development. Topics include: game history and genres, game design teams and processes, what makes a game fun, level and model design, game scripting and programming including computer graphics and animation, artificial intelligence, industry issues, and gender and games.',
        unccCatalogID: '36', 
        unccCourseID: '123080'  
      },

      { 
        code: 'ITCS 4231', 
        title: 'Advanced Game Design and Development',
        courseDescription: 'Advanced concepts and techniques for electronic game design and development. A project-centered course where students explore complex gameplay and interactivity. Explores topics from the introductory course in more depth, such as: applying software engineering techniques to developing games, advanced game programming and scripting, networking, graphics, physics, audio, game data structures and algorithms, and artificial intelligence.',
        unccCatalogID: '36', 
        unccCourseID: '123081'  
      },

      { 
        code: 'ITCS 4232', 
        title: 'Game Design and Development Studio',
        courseDescription: 'Application of advanced concepts and techniques for electronic game design and development. Teams use engineering techniques to incorporate game programming and scripting, networking, graphics, physics, audio, game data structures and algorithms, and artificial intelligence into an electronic game. Individuals develop a complete portfolio of prior work and the course project.',
        unccCatalogID: '36', 
        unccCourseID: '123082'  
      },

      { 
        code: 'ITCS 4235', 
        title: 'Game Engine Construction',
        courseDescription: 'Introduction to principles and techniques behind modern computer and console game engines. Graphics Rendering Pipeline (transformations, lighting, shading); 2D/3D Texture Mapping; Image Based Rendering; Spatial Structures and Acceleration Algorithms; Level of Detail; Collision Detection, Culling and Intersection Methods; Vertex/Pixel Shaders; Pipeline Optimization; Rendering Hardware.',
        unccCatalogID: '36', 
        unccCourseID: '123083'  
      },
      
      { 
        code: 'ITCS 4236', 
        title: 'Artificial Intelligence for Computer Games',
        courseDescription: 'Application of advanced concepts and techniques in artificial intelligence for electronic game design and development. An investigation of the artificial intelligence techniques necessary for an agent to act, or appear to act, intelligently in interactive virtual worlds. Topics include: uncertainty reasoning, machine learning, perception, knowledge representation, search, and planning. Emphasis is on implementation and experimentation with the goal of building robust intelligent agents in interactive entertainment domains. Elements of multi-agent collaboration and the use of cognitive architectures in interactive computer games are also discussed.',
        unccCatalogID: '36', 
        unccCourseID: '123084'  
      },

      { 
        code: 'ITCS 4237', 
        title: 'Audio Processing for Entertainment Computing',
        courseDescription: 'Introduction to the principles and applications of audio (digital signal) processing focusing on entertainment domains. Topics include: analysis of signals, transforms, digital filter design techniques, audio engine development, file encoding/decoding, spatial sound rendering, optimization, and advanced audio techniques.',
        unccCatalogID: '36', 
        unccCourseID: '123085'  
      },

      { 
        code: 'ITCS 4238', 
        title: 'Intelligent and Interactive System Studio',
        courseDescription: 'A project-oriented course that introduces algorithms and systems related to robotic vision, perception, navigation planning and control, mapping, localization, and human-robot interaction.  Students work in small groups to develop and implement algorithms in real mobile robots and using real sensors, which can lead to their senior design projects.',
        unccCatalogID: '36', 
        unccCourseID: '124667'  
      },


      // ITCS Graduate Courses
      { 
        code: 'ITCS 5010', 
        title: 'Topics in Computer Science: Bitcoin: Programming the Future of Money',
        courseDescription: 'Topics in computer science selected to supplement the regular course offerings. A student may register for multiple sections of the course with different topics in the same semester or in different semesters.',
        unccCatalogID: '37', 
        unccCourseID: '125977'  
      },

      { 
        code: 'ITCS 5102', 
        title: 'Survey of Programming Languages',
        courseDescription: 'Study of the concepts underlying various computer languages, and comparing and evaluating various language features. History and development of various languages, such as FORTRAN, ALGOL, PASCAL, MODULA-2, C, C++, Ada, Lisp, Smalltalk, Prolog.; evaluation and comparison of various algorithms and language suitability. Selection of languages for problems/environments. Overview of various languages.',
        unccCatalogID: '37', 
        unccCourseID: '125978'  
      },

      { 
        code: 'ITCS 5111', 
        title: 'Introduction to Natural Language Processing',
        courseDescription: 'The practical methods and techniques of natural language processing and text mining.  These techniques, mainly the techniques of syntactic and semantic processing, are illustrated with specific tasks (such as: Information Extraction, Dialogue Systems, Information Retrieval, etc.).  Most programming assignments are for the laptop.  Selected ones could be done in the cloud (e.g., using AlchemyAPI and/or IBM Bluemix).  Students are expected to bring their laptops to each class.',
        unccCatalogID: '37', 
        unccCourseID: '128387'  
      },

      { 
        code: 'ITCS 5121', 
        title: 'Information Visualization',
        courseDescription: 'Information visualization concepts, theories, design principles, popular techniques, evaluation methods, and information visualization applications.',
        unccCatalogID: '37', 
        unccCourseID: '125979'  
      },
    
      { 
        code: 'ITCS 5122', 
        title: 'Visual Analytics',
        courseDescription: 'Introduces the new field of visual analytics, which integrates interactive analytical methods and visualization. Topics include: critical thinking, visual reasoning, perception/cognition, statistical and other analysis techniques, principles of interaction, and applications.',
        unccCatalogID: '37', 
        unccCourseID: '125980'  
      },

      { 
        code: 'ITCS 5123', 
        title: 'Visualization and Visual Communication',
        courseDescription: 'Understanding the relatively technical field of visualization from the point of view of visual communication, this course draws connections with photography, design, illustration, aesthetics, and art. Both technical and theoretical aspects of the various fields are covered, and the connections between them are investigated.',
        unccCatalogID: '37', 
        unccCourseID: '125981'  
      },

      { 
        code: 'ITCS 5128', 
        title: 'Programming Languages and Compilers',
        courseDescription: 'Introduction to the concepts and techniques used in describing, defining, and implementing programming languages and their compilers. Introduction to parsing and parser construction; LL and LR grammars; syntax directed translation; data object representations; run time structures; intermediate languages; code optimization',
        unccCatalogID: '37', 
        unccCourseID: '125982'  
      },

      { 
        code: 'ITCS 5141', 
        title: 'Computer Organization and Architecture',
        courseDescription: 'Fundamentals of computer design; instruction set design, basic processor implementation techniques; pipelining; memory hierarchy; input/output. Cost/performance and hardware/software trade-offs.',
        unccCatalogID: '37', 
        unccCourseID: '125984'  
      },

      { 
        code: 'ITCS 5145', 
        title: 'Parallel Computing',
        courseDescription: 'Types of parallel computers, programming techniques for multiprocessor and multicomputer systems, parallel strategies, algorithms, and languages.',
        unccCatalogID: '37', 
        unccCourseID: '125985'  
      },

      { 
        code: 'ITCS 5152', 
        title: 'Computer Vision',
        courseDescription: 'General introduction to Computer Vision and its application. Topics include: low-level vision, 2D and 3D segmentation, 2D description, 2D recognition, 3D description and model-based recognition, and interpretation.',
        unccCatalogID: '37', 
        unccCourseID: '125987'  
      },

      { 
        code: 'ITCS 5153', 
        title: 'Applied Artificial Intelligence',
        courseDescription: 'Introduction to fundamental concepts of Artificial Intelligence (AI), while focusing on the practical application of AI algorithms and technologies to the solution of real-world problems.  Students work with state-of-the-art libraries and frameworks, such as OpenAI, TensorFlow, PyTorch, Azure AI, and OpenCV.  Topics include: pathfinding, adversarial search, deep reinforcement learning, using neural networks to solve classification problems, speech recognition, language translation, object identification, and image manipulation.',
        unccCatalogID: '37', 
        unccCourseID: '128872'  
      },

      { 
        code: 'ITCS 5156', 
        title: 'Applied Machine Learning',
        courseDescription: 'Explores the components of machine learning prediction functions for classification and regression with an emphasis on practical applications.  Topics include: fundamental concepts, such as training, validation, overfitting, and error rates.  Also introduces commonly-used machine learning algorithms, such as decision trees, naive Bayes, neural networks and random forests.  Covers the complete machine learning pipeline, including data collection, feature creation, algorithms, and evaluation.',
        unccCatalogID: '37', 
        unccCourseID: '128675'  
      },

      { 
        code: 'ITCS 5161', 
        title: 'Intellectual Property Aspects of Computing',
        courseDescription: 'Explores the broad field of intellectual property and the many aspects related to computing. Topics include: software copyrights, software patents, trademarks and service marks, employment contracts, non-compete agreements, software licenses, software development contracts, preservation of digital evidence, protection of trade secrets, cyberspace law and the use of mediation in IP disputes',
        unccCatalogID: '37', 
        unccCourseID: '125989'  
      },

      { 
        code: 'ITCS 5180', 
        title: 'Mobile Application Development',
        courseDescription: 'Mobile platforms are at the center of attention of users and organizations nowadays. Most organizations and businesses are rapidly migrating toward the cloud and need to provide a fast and easy mechanism for users to stay connected to their services. Mobile applications are the top trend nowadays given the high variety of new mobile devices and platforms such as Apple’s iOS and Google’s Android. In this course, students are introduced to the foundations of mobile development and its unique requirements and constraints. Students design and build a variety of mobile applications with a hands-on and projectbased approach.',
        unccCatalogID: '37', 
        unccCourseID: '125990'  
      },

      { 
        code: 'ITCS 5182', 
        title: 'Introduction to High Performance Computing',
        courseDescription: 'Fundamentals of parallel computer systems; throughput computing; memory hierarchies; computation/communication overlapping; mapping high level programs to low level components; leveraging accelerators; performance optimization; performance evaluation.',
        unccCatalogID: '37', 
        unccCourseID: '128676'  
      },

      { 
        code: 'ITCS 5230', 
        title: 'Introduction to Game Design and Development',
        courseDescription: 'Basic concepts and techniques for electronic game design and development. Topics include: game history and genres, game design teams and processes, what makes a game fun, level and model design, game scripting and programming including computer graphics and animation, artificial intelligence, industry issues, and gender and games.',
        unccCatalogID: '37', 
        unccCourseID: '125992'  
      },

      { 
        code: 'ITCS 5231', 
        title: 'Advanced Game Design and Development',
        courseDescription: 'Advanced concepts and techniques for electronic game design and development. A project-centered course where students explore complex gameplay and interactivity. Explores topics from the introductory course in more depth, such as: applying software engineering techniques to developing games, advanced game programming and scripting, networking, graphics, physics, audio, game data structures and algorithms, and artificial intelligence.',
        unccCatalogID: '37', 
        unccCourseID: '125993'  
      },

      { 
        code: 'ITCS 5232', 
        title: 'Game Design and Development Studio',
        courseDescription: 'Application of advanced concepts and techniques for electronic game design and development. Teams will use engineering techniques to incorporate game programming and scripting, networking, graphics, physics, audio, game data structures and algorithms, and artificial intelligence into an electronic game. Individuals will develop a complete portfolio of prior work and the course project.',
        unccCatalogID: '37', 
        unccCourseID: '128835'  
      },

      { 
        code: 'ITCS 5235', 
        title: 'Game Engine Construction',
        courseDescription: 'Introduction to principles and techniques behind modern computer and console game engines. Graphics Rendering Pipeline (transformations, lighting ,shading); 2D/3D Texture Mapping; Image Based Rendering; Spatial Data Structures and Acceleration Algorithms; Level of Detail; Collision Detection, Culling and Intersection Methods; Vertex/Pixel Shaders; Pipeline Optimization; Rendering Hardware.',
        unccCatalogID: '37', 
        unccCourseID: '125994'  
      },

      { 
        code: 'ITCS 5236', 
        title: 'Artificial Intelligence for Computer Games',
        courseDescription: 'Application of advanced concepts and techniques in artificial intelligence for electronic game design and development. An investigation of the artificial intelligence techniques necessary for an agent to act, or appear to act, intelligently in interactive virtual worlds. Topics include: uncertainty reasoning, machine learning, perception, knowledge representation, search, and planning. Emphasis will be on implementation and experimentation with the goal of building robust intelligent agents in interactive entertainment domains. Elements of multi-agent collaboration and the use of cognitive architectures in interactive computer games will also be discussed.',
        unccCatalogID: '37', 
        unccCourseID: '125995'  
      },

      { 
        code: 'ITCS 6010', 
        title: 'Topics in Computer Science: Advanced Computer Vision',
        courseDescription: 'Topics in computer science selected to supplement the regular course offerings. Students may register for multiple sections of the course with different topics in the same semester or in different semesters.',
        unccCatalogID: '37', 
        unccCourseID: '125997'  
      },

      { 
        code: 'ITCS 6040', 
        title: 'Topics in Data Science',
        courseDescription: 'Topics in data science selected to supplement the regular course offerings. Students may register for multiple sections of the course with different topics in the same semester or in different semesters.',
        unccCatalogID: '37', 
        unccCourseID: '128565'  
      },

      { 
        code: 'ITCS 6050', 
        title: 'Topics in Intelligent Systems',
        courseDescription: 'Topics in intelligent systems selected to supplement the regular course offerings.',
        unccCatalogID: '37', 
        unccCourseID: '125998'  
      },

      { 
        code: 'ITCS 6100', 
        title: 'Big Data Analytics for Competitive Advantage',
        courseDescription: 'An introduction to the use of big data as a strategic resource. A focus is placed on integrating the knowledge of analytics tools with an understanding of how companies leverage data analytics to gain strategic advantage. A case approach is used to emphasize hands-on learning and a real-world view of big data analytics.',
        unccCatalogID: '37', 
        unccCourseID: '126000'  
      },

      { 
        code: 'ITCS 6112', 
        title: 'Software System Design and Implementation',
        courseDescription: 'Introduction to the techniques involved in the planning and implementation of large software systems. Emphasis on human interface aspects of systems. Planning software projects; software design process; top-down design; modular and structured design; management of software projects; testing of software; software documentation; choosing a language for a software system.',
        unccCatalogID: '37', 
        unccCourseID: '126004'  
      },

      { 
        code: 'ITCS 6114', 
        title: 'Algorithms and Data Structures',
        courseDescription: 'Analyzing algorithms and problems; data abstraction and data structures; recursion and induction; time and space complexities; searching and sorting; search trees and tries; hashing; heaps; dynamic programming; graph algorithms; string matching; NP-complete problems.',
        unccCatalogID: '37', 
        unccCourseID: '126005'  
      },

      { 
        code: 'ITCS 6115', 
        title: 'Advanced Algorithms',
        courseDescription: 'Randomized Algorithms; Parallel/Distributed algorithms; Approximation Algorithms; Combinatorial Optimization and Graph Algorithms; Algorithms in Non-Classical Models.',
        unccCatalogID: '37', 
        unccCourseID: '126006'  
      },

      { 
        code: 'ITCS 6120', 
        title: 'Computer Graphics',
        courseDescription: 'Introduction to the design and implementation of interactive graphics systems. Raster and vector display systems, I/O devices; graphics primitives and their attributes; raster algorithms and clipping; 2D/3D geometric transformations; 3D viewing and projections; hierarchical and procedural models; surface representation; color and lighting models; rendering algorithms; global illumination and texture mapping.',
        unccCatalogID: '37', 
        unccCourseID: '126007'  
      },

      { 
        code: 'ITCS 6121', 
        title: 'Data and Information Visualization',
        courseDescription: 'Topics in scientific and information visualization, including data and visualization foundations;  human vision and cognition; categorical, quantitative and time varying data; spatial visualization; graph/tree visualization; visualization evaluation and design; visualization case studies.',
        unccCatalogID: '37', 
        unccCourseID: '129869'  
      },

      { 
        code: 'ITCS 6124', 
        title: 'Illustrative Visualization',
        courseDescription: 'The state-of-the-art of illustrative visualization techniques, which transform large-scale, complex datasets to succinct, nonphotorealistic visualization styles and at the same time preserve important data features. Topics include: 2D/3D stippling, interactive line drawings, animated visualization, non-photorealisitc rendering, design, and evaluation of illustrative visualization approaches.',
        unccCatalogID: '37', 
        unccCourseID: '126008'  
      },

      { 
        code: 'ITCS 6125', 
        title: 'Virtual and Augmented Reality',
        courseDescription: 'The design and implementation of Virtual and Augmented Reality systems and applications.  Topics include: position tracking, design of head-tracked and head-mounted displays, stereoscopic display, 3D user interface design, presence measurement, and applications.',
        unccCatalogID: '37', 
        unccCourseID: '126009'  
      },

      { 
        code: 'ITCS 6132', 
        title: 'Modeling and Analysis of Communication Networks',
        courseDescription: 'The objective is to develop an understanding of modeling and analysis techniques for communication systems and networks. Enable the student to understand how to comparatively analyze the cost and performance impact of network architecture and protocol design decisions. Modeling techniques for analytical analysis, simulation based analysis, and measurement based analysis will be presented. Topics include: validation/verification of models, workload characterization, metric selection, presentation and interpretation of results. A semester long analysis project will be undertaken.',
        unccCatalogID: '37', 
        unccCourseID: '126013'  
      },

      { 
        code: 'ITCS 6134', 
        title: 'Digital Image Processing',
        courseDescription: 'Image perception; image types/applications; image restoration and enhancement; edge/boundary detection; image transformation; image segmentation; statistical and syntactical pattern recognition; image information measures and compression.',
        unccCatalogID: '37', 
        unccCourseID: '126014'  
      },

      { 
        code: 'ITCS 6144', 
        title: 'Operating Systems Design',
        courseDescription: 'Introduction to features of a large-scale operating system with emphasis on resource-sharing environments. Computer system organization; resource management; multiprogramming; multiprocessing; file systems; virtual machine concepts; protection and efficiency.',
        unccCatalogID: '37', 
        unccCourseID: '126016'  
      },

      { 
        code: 'ITCS 6150', 
        title: 'Intelligent Systems',
        courseDescription: 'Introduces core ideas in Artificial Intelligence (AI). Heuristic versus algorithmic methods; problem solving; game playing and decision making; automatic theorem proving; pattern recognition; adaptive learning; projects to illustrate theoretical concepts.',
        unccCatalogID: '37', 
        unccCourseID: '126018'  
      },

      { 
        code: 'ITCS 6151', 
        title: 'Intelligent Robotics',
        courseDescription: 'General introduction to spatial descriptions and transformations, and manipulator position and motion. More study on robot planning, programming, sensing, vision, and CAD/CAM.',
        unccCatalogID: '37', 
        unccCourseID: '126019'  
      },

      { 
        code: 'ITCS 6152', 
        title: 'Robot Motion Planning',
        courseDescription: 'Introduction to algorithmic techniques for robot motion planning. Topics include: configuration space representations, roadmap methods, cell decomposition methods, potential field techniques, randomized path planning, collision detection, nonholonomic motion planning, multiple robot coordination, and manipulation planning. These techniques are motivated by applications of motion planning to mobile robots and robot manipulators, assembly planning, computer aided design, computer graphics, and bioinformatics.',
        unccCatalogID: '37', 
        unccCourseID: '126020'  
      },

      { 
        code: 'ITCS 6153', 
        title: 'Neural Networks',
        courseDescription: 'Topics include: basic notions and models of artificial neural nets; single layer neural classifiers; multilayer one-way neural nets; single layer feedback networks; neural models of associative memory; selforganizing neural nets; translation between neural networks and knowledge bases; applications of neural networks.',
        unccCatalogID: '37', 
        unccCourseID: '126021'  
      },

      { 
        code: 'ITCS 6155', 
        title: 'Knowledge-Based Systems',
        courseDescription: 'Knowledge systems; knowledge discovery; association rules; action rules, hierarchical classifiers, cascade classifiers, query languages and their semantics; cooperative and collaborative systems; ontology and metadata; flexible query answering; chase algorithms and data sanitization methods; decision support systems in medicine; and automatic indexing of music.',
        unccCatalogID: '37', 
        unccCourseID: '126023'  
      },

      { 
        code: 'ITCS 6156', 
        title: 'Machine Learning',
        courseDescription: 'Machine learning has been successfully applied to many different areas such as autonomous control of cars and robots, natural language processing, image recognition, health science, biology, and data mining.  This course introduces fundamental concepts and methods to learn from data for computational data analysis, including pattern recognition, prediction, and visualization.  For this, supervised learning, unsupervised learning, and reinforcement learning, as well as techniques including clustering, classification, support vector machines, and neural networks are covered.',
        unccCatalogID: '37', 
        unccCourseID: '126024'  
      },

      { 
        code: 'ITCS 6157', 
        title: 'Visual Databases',
        courseDescription: 'Topics include: representation of visual content, querying visual databases, content-based interactive browsing and navigation, system architecture, similarity models, indexing visual databases, data models and knowledge structures, image retrieval by similarity, and video retrieval by content.',
        unccCatalogID: '37', 
        unccCourseID: '126025'  
      },

      { 
        code: 'ITCS 6158', 
        title: 'Natural Language Processing',
        courseDescription: 'Principles, methodologies, and programming methods of natural language processing including foundations of natural language understanding, namely: lexical, syntactic, and semantic analysis, discourse integration, and pragmatic and morphological analysis.',
        unccCatalogID: '37', 
        unccCourseID: '126026'  
      },

      { 
        code: 'ITCS 6160', 
        title: 'Database Systems',
        courseDescription: 'The modeling, programming, and implementation of database systems. Focuses on relational database systems, but may also address non-relational databases or other advanced topics. Topics include: (1) modeling: conceptual data modeling, ER diagram, relational data model, schema design and refinement; (2) programming: relational algebra and calculus, SQL, constraints, triggers, views; (3) implementation: data storage, indexing, query execution, query optimization, and transaction management; and (4) advanced: semi-structured data model, XML, and other emerging topics.',
        unccCatalogID: '37', 
        unccCourseID: '126028'  
      },

      { 
        code: 'ITCS 6161', 
        title: 'Advanced Topics in Database Systems',
        courseDescription: 'Continuation of ITCS 6160.  Topics include: deductive databases; semantic query processing; intelligent and cooperative query languages; distributed databases; active databases; heterogeneous databases, multimedia databases; data and knowledge interchange; multidatabase systems; very large databases. ',
        unccCatalogID: '37', 
        unccCourseID: '126029'  
      },

      { 
        code: 'ITCS 6162', 
        title: 'Knowledge Discovery in Databases',
        courseDescription: 'Exploration of the entire knowledge discovery process.  Topics include: setting up a problem, data preprocessing and warehousing, data mining in search for knowledge, knowledge evaluation, visualization and application in decision making.  A broad range of systems, such as OLAP, LERS, DatalogicR+, C4.5, AQ15, Forty-Niner, CN2, QRAS, and discretization algorithms are also covered.',
        unccCatalogID: '37', 
        unccCourseID: '126030'  
      },

      { 
        code: 'ITCS 6163', 
        title: 'Data Warehousing',
        courseDescription: 'Topics include: use of data in discovery of knowledge and decision making; the limitations of relational databases and SQL queries; the warehouse data models: multidimensional, star, snowflake; architecture of a data warehouse and the process of warehouse construction; data consolidation from various sources; optimization; techniques for data transformation and knowledge extraction; relations with enterprise modeling.',
        unccCatalogID: '37', 
        unccCourseID: '126031'  
      },

      { 
        code: 'ITCS 6165', 
        title: 'Coding and Information Theory',
        courseDescription: 'Information theory; coding theory; Shannon’s theorem; Markov process; channel capacity; data transmission codes; error correcting codes; data compression; data encryption.',
        unccCatalogID: '37', 
        unccCourseID: '126033'  
      },

      { 
        code: 'ITCS 6166', 
        title: 'Computer Communications and Networks',
        courseDescription: 'Introduction to the concepts of communication networks; types of networks; wired and wireless media; communication architectures; network protocols; coding and modulation; multiplexing and multiple access; error and flow control; routing; Internet protocols; transport protocols; assignments include implementation and analysis of network protocols',
        unccCatalogID: '37', 
        unccCourseID: '126034'  
      },

      { 
        code: 'ITCS 6167', 
        title: 'Advanced Networking Protocols',
        courseDescription: 'Advanced networking concepts and protocols related to the design, implementation, integration, and management of networking and communication systems. Topics include: topology control protocols, ad hoc routing protocols, power management protocols, distributed data processing protocols for various networking systems (Internet, wireless mesh networks, ad hoc networks, sensor networks, peer-to-peer networks).',
        unccCatalogID: '37', 
        unccCourseID: '126035'  
      },

      { 
        code: 'ITCS 6168', 
        title: 'Wireless Communication Networks',
        courseDescription: 'An overview of mobile systems and wireless networking technologies. Emphasis on resource management, routing and quality of service at the MAC and networking layers for mobile systems. Students undertake a semester long research project to survey the research literature and identify specific challenges for cellular telecommunications, wireless LANS, ad hoc networks, mesh networks or sensor networks',
        unccCatalogID: '37', 
        unccCourseID: '126036'  
      },

      { 
        code: 'ITCS 6182', 
        title: 'Computer System Architecture',
        courseDescription: 'Survey of existing and proposed architectures; pipelined, dataflow, multi-bus and parallel system architecture, and interconnection network architectures. This course is project-based and requires written and verbal presentation of projects.',
        unccCatalogID: '37', 
        unccCourseID: '126041'  
      },

      { 
        code: 'ITCS 6190', 
        title: 'Cloud Computing for Data Analysis',
        courseDescription: 'Introduction to the basic principles of cloud computing for dataintensive applications. Focuses on parallel computing using Google’s MapReduce paradigm on Linux clusters, and algorithms for large-scale data analysis applications in web search, information retrieval, computational advertising, and business and scientific data analysis. Students read and present research papers on these topics, and implement programming projects using Hadoop, an open source implementation of Google’s MapReduce technology, and related NoSQL technologies for analyzing unstructured data.',
        unccCatalogID: '37', 
        unccCourseID: '126045'  
      },

      { 
        code: 'ITCS 6216', 
        title: 'Introduction to Cognitive Science',
        courseDescription: 'Multiple perspectives on the study of intelligent systems. Broad coverage of such topics as philosophy of mind; human memory processes; reasoning and problem solving; artificial intelligence; language processing (human and machine); neural structures and processes; and vision. Also included is participation in the cognitive science seminar.',
        unccCatalogID: '37', 
        unccCourseID: '126048'  
      },

      { 
        code: 'ITCS 6265', 
        title: 'Advanced Topics in Knowledge Discovery in Databases',
        courseDescription: 'Continuation and extension of ITCS 6162. Information visualization in data mining and knowledge discovery, predictive data mining, mining of multimedia sources, mining of unstructured data, distributed data mining, mining of Web data/information, mining complex types of data, mining of biotechnology data, applications, and trends in data mining.',
        unccCatalogID: '37', 
        unccCourseID: '126054'  
      },

      { 
        code: 'ITCS 6322', 
        title: 'Complex Adaptive Systems',
        courseDescription: 'Complex adaptive systems (CAS) are networked (agents/part interact with their neighbors and, occasionally, distant agents), nonlinear (the whole is greater than the sum of its parts), adaptive (the system learns to change with its environment), open (new resources are being introduced into the environment), dynamic (the change is a norm), emergent (new, unplanned features of the system get introduced through the interaction of its parts/agents), and selforganizing (the parts organize themselves into a hierarchy of subsystems of various complexity). Ant colonies, networks of neurons, the immune system, the Internet, social institutions, organization of cities, and the global economy are a few examples where the behavior of the whole is much more complex than the behavior of the parts. Examples of current research efforts are provided. Topics include: Selforganization; emergent properties; learning; agents; localization affect; adaptive systems; nonlinear behavior; chaos; complexity.',
        unccCatalogID: '37', 
        unccCourseID: '126057'  
      },

      { 
        code: 'ITCS 6345', 
        title: 'Modern Data Science Systems',
        courseDescription: 'Advanced and recent techniques in data science, and their applications to business problems. Topics include: enterprise search and question answering, machine learning with neural networks, probabilistic and graph algorithms, and topological data analysis.  Most assignments are done “in the cloud.”  The course assumes basic knowledge of data science exemplified by a graduate, undergraduate, or online machine learning course; a natural language processing course; as well as knowledge of elementary linear algebra, calculus, and statistics.  Some experience with cloud computing is also expected.',
        unccCatalogID: '37', 
        unccCourseID: '128618'  
      },

      { 
        code: 'ITCS 6490', 
        title: 'Industrial Internship',
        courseDescription: 'Full- or part-time academic year internship in computer science areas complementary to the concentration area of studies and designed to allow theoretical and course-based practical learning to be applied in a supervised industrial experience. Each student’s internship program must be approved by the supervising faculty, the academic advisor, and the graduate program director. A mid-term report and a final report to be evaluated by the supervising faculty are required. Grading is on a Pass/Unsatisfactory basis by the supervising faculty in consultation with off-campus supervisor at the internship organization. The credit hours may not be part of the minimum 30 credit hours for graduation.',
        unccCatalogID: '37', 
        unccCourseID: '126056'  
      },

      { 
        code: 'ITCS 6617', 
        title: 'Computational Human Behavior Modeling',
        courseDescription: 'Computational human behavior modeling is a research area at the intersection of computer science and social science, including psychology, sociology, communication, and linguistics.  Its objective is to advance both fields by combining the power of data analytics and artificial intelligence with the scientific method for studying human data and human behavior.  This course is a research seminar in which students engage with research through a series of readings, understanding concepts in the social sciences about human language, attitudes, and behaviors and understand how these concepts can be formalized into computational models or algorithms.',
        unccCatalogID: '37', 
        unccCourseID: '128837'  
      },

      { 
        code: 'ITCS 6880', 
        title: 'Individual Study',
        courseDescription: 'With the direction of a faculty member, students plan and implement appropriate objectives and learning activities to develop specific areas of expertise through research, reading, and individual projects.',
        unccCatalogID: '37', 
        unccCourseID: '126059'  
      },

      { 
        code: 'ITCS 6881', 
        title: 'Individual Study in AI, Robotics, and Gaming',
        courseDescription: 'With the direction of a faculty member, students plan and implement appropriate objectives and learning activities to develop specific areas of expertise through research, reading, and individual projects in AI, Robotics, and Gaming.',
        unccCatalogID: '37', 
        unccCourseID: '128670'  
      },

      { 
        code: 'ITCS 6882', 
        title: 'Individual Study in Data Science',
        courseDescription: 'With the direction of a faculty member, students plan and implement appropriate objectives and learning activities to develop specific areas of expertise through research, reading, and individual projects in Data Science.',
        unccCatalogID: '37', 
        unccCourseID: '128671'  
      },

      { 
        code: 'ITCS 6883', 
        title: 'Individual Study in Software, Systems, and Networks',
        courseDescription: 'With the direction of a faculty member, students plan and implement appropriate objectives and learning activities to develop specific areas of expertise through research, reading, and individual projects in Software, Systems, and Networks. ',
        unccCatalogID: '37', 
        unccCourseID: '128672'  
      },

      { 
        code: 'ITCS 6991', 
        title: 'Computer Science Thesis',
        courseDescription: 'Graduate thesis research. Detailed exploration of an area of computer science chosen for thesis research',
        unccCatalogID: '37', 
        unccCourseID: '126060'  
      },

      { 
        code: 'ITCS 8010', 
        title: 'Topics in Computer Science: Advanced Computer Vision',
        courseDescription: 'Topics in computer science selected to supplement the regular course offerings. A student may register for multiple sections of the course with different topics in the same semester or in different semesters.',
        unccCatalogID: '37', 
        unccCourseID: '126061'  
      },

      { 
        code: 'ITCS 8050', 
        title: 'Topics in Intelligent Systems',
        courseDescription: 'Topics in intelligent systems selected to supplement the regular course offerings.',
        unccCatalogID: '37', 
        unccCourseID: '126062'  
      },

      { 
        code: 'ITCS 8112', 
        title: 'Software System Design and Implementation',
        courseDescription: 'Introduction to the techniques involved in the planning and implementation of large software systems. Emphasis on human interface aspects of systems. Planning software projects; software design process; top-down design; modular and structured design; management of software projects; testing of software; software documentation; choosing a language for software system.',
        unccCatalogID: '37', 
        unccCourseID: '126067'  
      },

      { 
        code: 'ITCS 8114', 
        title: 'Algorithms and Data Structures',
        courseDescription: 'Analyzing algorithms and problems; data abstraction and data structures; recursion and induction; time and space complexities; searching and sorting; search trees and tries; hashing; heaps; dynamic programming; graph algorithms; string matching; NP-complete problems.',
        unccCatalogID: '37', 
        unccCourseID: '126068'  
      },

      { 
        code: 'ITCS 8115', 
        title: 'Advanced Algorithms',
        courseDescription: 'Topics include: Randomized Algorithms; Parallel/Distributed Algorithms; Approximation Algorithms; Combinatorial Optimization and Graph Algorithms; and Algorithms in Non-Classical Models.',
        unccCatalogID: '37', 
        unccCourseID: '126069'  
      },

      { 
        code: 'ITCS 8120', 
        title: 'Computer Graphics',
        courseDescription: 'Introduction to the design and implementation of interactive graphics systems. Raster and vector display systems, I/O devices; graphics primitives and their attributes; raster algorithms and clipping; 2D/3D geometric transformations; 3D viewing and projections; hierarchical and procedural models; surface representation; color and lighting models; rendering algorithms; global illumination and texture mapping.',
        unccCatalogID: '37', 
        unccCourseID: '126070'  
      },

      { 
        code: 'ITCS 8121', 
        title: 'Data and Information Visualization',
        courseDescription: 'Topics in scientific and information visualization, including data and visualization foundations;  human vision and cognition; categorical, quantitative and time varying data; spatial visualization; graph/tree visualization; visualization evaluation and design; visualization case studies.',
        unccCatalogID: '37', 
        unccCourseID: '129870'  
      },

      { 
        code: 'ITCS 8124', 
        title: 'Illustrative Visualization',
        courseDescription: 'The state-of-the-art of illustrative visualization techniques, which transform large-scale, complex datasets to succinct, nonphotorealistic visualization styles and at the same time preserve important data features. Topics include: 2D/3D stippling, interactive line drawings, animated visualization, non-photorealisitc rendering, design, and evaluation of illustrative visualization approaches.',
        unccCatalogID: '37', 
        unccCourseID: '126071'  
      },

      { 
        code: 'ITCS 8125', 
        title: 'Virtual and Augmented Reality',
        courseDescription: 'The design and implementation of Virtual and Augmented Reality systems and applications.  Topics include: position tracking, design of head-tracked and head-mounted displays, stereoscopic display, 3D user interface design, presence measurement, and applications.',
        unccCatalogID: '37', 
        unccCourseID: '126072'  
      },

      { 
        code: 'ITCS 8132', 
        title: 'Modeling and Analysis of Communication Networks',
        courseDescription: 'Students develop an understanding of modeling and analysis techniques for communication systems and networks. Comparatively analyze the cost and performance impact of network architecture and protocol design decisions. Modeling techniques for analytical analysis, simulation based analysis, and measurement based analysis. Topics include: validation/verification of models, workload characterization, metric selection, presentation and interpretation of results. A semester long analysis project is undertaken.',
        unccCatalogID: '37', 
        unccCourseID: '126076'  
      },

      { 
        code: 'ITCS 8134', 
        title: 'Digital Image Processing',
        courseDescription: 'Image perception; image types/applications; image restoration and enhancement; edge/boundary detection; image transformation; image segmentation; statistical and syntactical pattern recognition; image information measures and compression.',
        unccCatalogID: '37', 
        unccCourseID: '126077'  
      },

      { 
        code: 'ITCS 8144', 
        title: 'Operating Systems Design',
        courseDescription: 'Introduction to features of a large-scale operating system with emphasis on resource-sharing environments. Computer system organization; resource management; multiprogramming; multiprocessing; file systems; virtual machine concepts; protection and efficiency.',
        unccCatalogID: '37', 
        unccCourseID: '126079'  
      },

      { 
        code: 'ITCS 8150', 
        title: 'Intelligent Systems',
        courseDescription: 'Introduction to core ideas in AI. Heuristic versus algorithmic methods; problem solving; game playing and decision making; automatic theorem proving; pattern recognition; adaptive learning; projects to illustrate theoretical concepts.',
        unccCatalogID: '37', 
        unccCourseID: '126081'  
      },
      
      { 
        code: 'ITCS 8151', 
        title: 'Intelligent Robotics',
        courseDescription: 'General introduction to spatial descriptions and transformations, and manipulator position and motion. More study on robot planning, programming, sensing, vision, and CAD/CAM.',
        unccCatalogID: '37', 
        unccCourseID: '126082'  
      },

      { 
        code: 'ITCS 8152', 
        title: 'Robot Motion Planning',
        courseDescription: 'Introduction to algorithmic techniques for robot motion planning. Topics include: configuration space representations, roadmap methods, cell decomposition methods, potential field techniques, randomized path planning, collision detection, nonholonomic motion planning, multiple robot coordination, and manipulation planning. These techniques are motivated by applications of motion planning to mobile robots and robot manipulators, assembly planning, computer aided design, computer graphics, and bioinformatics.',
        unccCatalogID: '37', 
        unccCourseID: '126083'  
      },

      { 
        code: 'ITCS 8153', 
        title: 'Neural Networks',
        courseDescription: 'Topics include: Basic notions and models of artificial neural nets; single layer neural classifiers; multilayer one-way neural nets; single layer feedback networks; neural models of associative memory; self-organizing neural nets; translation between neural networks and knowledge bases; applications of neural networks.',
        unccCatalogID: '37', 
        unccCourseID: '126084'  
      },

      { 
        code: 'ITCS 8155', 
        title: 'Knowledge-Based Systems',
        courseDescription: 'Knowledge systems; knowledge discovery; association rules; action rules, hierarchical classifiers, cascade classifiers, query languages and their semantics; cooperative and collaborative systems; ontology and metadata; flexible query answering; chase algorithms and data sanitization methods; decision support systems in medicine; and automatic indexing of music.',
        unccCatalogID: '37', 
        unccCourseID: '126086'  
      },

      { 
        code: 'ITCS 8156', 
        title: 'Machine Learning',
        courseDescription: 'Machine learning methods and techniques including: acquisition of declarative knowledge; organization of knowledge into new, more effective representations; development of new skills through instruction and practice; and discovery of new facts and theories through observation and experimentation.',
        unccCatalogID: '37', 
        unccCourseID: '126087'  
      },

      { 
        code: 'ITCS 8157', 
        title: 'Visual Databases',
        courseDescription: 'Topics include: Representation of visual content, querying visual databases, content-based interactive browsing and navigation, system architecture, similarity models, indexing visual databases, data models and knowledge structures, image retrieval by similarity, and video retrieval by content.',
        unccCatalogID: '37', 
        unccCourseID: '126088'  
      },

      { 
        code: 'ITCS 8158', 
        title: 'Natural Language Processing',
        courseDescription: 'Principles, methodologies, and programming methods of natural language processing including foundations of natural language understanding, namely: lexical, syntactic, and semantic analysis, discourse integration, and pragmatic and morphological analysis.',
        unccCatalogID: '37', 
        unccCourseID: '126089'  
      },

      { 
        code: 'ITCS 8160', 
        title: 'Database Systems',
        courseDescription: 'The modeling, programming, and implementation of database systems. Focuses on relational database systems, but may also address non-relational databases or other advanced topics. Topics include: (1) modeling: conceptual data modeling, ER diagram, relational data model, schema design and refinement; (2) programming: relational algebra and calculus, SQL, constraints, triggers, views; (3) implementation: data storage, indexing, query execution, query optimization, and transaction management; and (4) advanced: semi-structured data model, XML, and other emerging topics.',
        unccCatalogID: '37', 
        unccCourseID: '126091'  
      },

      { 
        code: 'ITCS 8161', 
        title: 'Advanced Topics in Database Systems',
        courseDescription: 'Continuation of ITCS 8160. Topics include: deductive databases; semantic query processing; intelligent and cooperative query languages; distributed databases; active databases; heterogeneous databases, multimedia databases; data and knowledge interchange; multidatabase systems; very large databases.',
        unccCatalogID: '37', 
        unccCourseID: '126092'  
      },

      { 
        code: 'ITCS 8162', 
        title: 'Knowledge Discovery in Databases',
        courseDescription: 'The entire knowledge discovery process is covered. Topics include: setting up a problem, data preprocessing and warehousing, data mining in search for knowledge, knowledge evaluation, visualization and application in decision making. A broad range of systems, such as OLAP, LERS, DatalogicR+, C4.5, AQ15, Forty-Niner, CN2, QRAS, and discretization algorithms are covered.',
        unccCatalogID: '37', 
        unccCourseID: '126093'  
      },

      { 
        code: 'ITCS 8163', 
        title: 'Data Warehousing',
        courseDescription: 'Topics include: use of data in discovery of knowledge and decision making; the limitations of relational databases and SQL queries; the warehouse data models: multidimensional, star, snowflake; architecture of data warehouse and the process of warehouse construction; data consolidation from various sources; optimization; techniques for data transformation and knowledge extraction; relations with enterprise modeling.',
        unccCatalogID: '37', 
        unccCourseID: '126094'  
      },

      { 
        code: 'ITCS 8165', 
        title: 'Coding and Information Theory',
        courseDescription: 'Information theory; coding theory; Shannon’s theorem; Markov process; channel capacity; data transmission codes; error correcting codes; data compression; data encryption.',
        unccCatalogID: '37', 
        unccCourseID: '126096'  
      },

      { 
        code: 'ITCS 8166', 
        title: 'Computer Communications and Networks',
        courseDescription: 'Introduction to the concepts of communication networks; types of networks; wired and wireless media; communication architectures; network protocols; coding and modulation; multiplexing and multiple access; error and flow control; routing; Internet Protocols; transport protocols. Assignments include implementation and analysis of network protocols.',
        unccCatalogID: '37', 
        unccCourseID: '126097'  
      },

      { 
        code: 'ITCS 8167', 
        title: 'Advanced Networking Protocols',
        courseDescription: 'Focuses on advanced networking concepts and protocols related to the design, implementation, integration, and management of networking and communication systems. Topics include: topology control protocols, ad hoc routing protocols, power management protocols, distributed data processing protocols for various networking systems (Internet, wireless mesh networks, ad hoc networks, sensor networks, peer-to-peer networks).',
        unccCatalogID: '37', 
        unccCourseID: '126098'  
      },

      { 
        code: 'ITCS 8168', 
        title: 'Wireless Communication Networks',
        courseDescription: 'An overview of mobile systems and wireless networking technologies. Emphasis on resource management, routing and quality of service at the MAC and networking layers for mobile systems. Students undertake a semester long research project to survey the research literature and identify specific challenges for cellular telecommunications, wireless LANS, ad hoc networks, mesh networks or sensor networks.',
        unccCatalogID: '37', 
        unccCourseID: '126099'  
      },

      { 
        code: 'ITCS 8182', 
        title: 'Computer System Architecture',
        courseDescription: 'Survey of existing and proposed architectures; pipelined, dataflow, multi-bus and parallel system architecture, and interconnection network architectures. Project-based and requires written and verbal presentation of projects.',
        unccCatalogID: '37', 
        unccCourseID: '126104'  
      },

      {
        code: 'ITCS 8190', 
        title: 'Cloud Computing for Data Analysis',
        courseDescription: 'Introduction to the basic principles of cloud computing for dataintensive applications. Focuses on parallel computing using Google’s MapReduce paradigm on Linux clusters, and algorithms for large-scale data analysis applications in web search, information retrieval, computational advertising, and business and scientific data analysis. Students read and present research papers on these topics, and implement programming projects using Hadoop, an open source implementation of Google’s MapReduce technology, and related NoSQL technologies for analyzing unstructured data.',
        unccCatalogID: '37', 
        unccCourseID: '126107'  
      },

      { 
        code: 'ITCS 8224', 
        title: 'Biomedical Image Processing',
        courseDescription: 'Topics include: Review of image processing and pattern recognition (2-D Fourier transforms, 2-D Wavelet transform, denoising of medical images); origin and processing of X-ray images; CT images; MRI images; ultrasonic images; PET images; thermal images; electrical impedance images; cross-registration between images of different source; stereotactic neurosurgery; stereotactic radiosurgery/radiotherapy; robot-assisted surgery.',
        unccCatalogID: '37', 
        unccCourseID: '126110'  
      },

      { 
        code: 'ITCS 8322', 
        title: 'Complex Adaptive Systems' ,
        courseDescription: 'Complex adaptive systems (CAS) are networked (agents/part interact with their neighbors and, occasionally, distant agents), nonlinear (the whole is greater than the sum of its parts), adaptive (the system learns to change with its environment), open (new resources are being introduced into the environment), dynamic (the change is a norm), emergent (new, unplanned features of the system get introduced through the interaction of its parts/agents), and selforganizing (the parts organize themselves into a hierarchy of subsystems of various complexity). Ant colonies, networks of neurons, the immune system, the Internet, social institutions, organization of cities, and the global economy are a few examples where the behavior of the whole is much more complex than the behavior of the parts. Covers these and similar topics in an interactive manner. Examples of our current research effort are provided. Topics include: Self-organization; emergent properties; learning; agents; localization affect; adaptive systems; nonlinear behavior; chaos; complexity.',
        unccCatalogID: '37', 
        unccCourseID: '126115'  
      },

      // BINF Undergraduate Courses
      { 
        code: 'BINF 1101', 
        title: 'Introduction to Bioinformatics and Genomics' ,
        courseDescription: 'Introduction to the genomics perspective in the life sciences, combining a general introduction to genomic technologies and the bioinformatics methods used to analyze genome-scale data with a presentation of real world scientific problems where these technologies are having an impact.  The lab component provides hands-on experience with biological sequence and structure databases, using small-scale projects to introduce students to the world of bioinformatics research. ',
        unccCatalogID: '36', 
        unccCourseID: '121734'  
      },

      { 
        code: 'BINF 2111', 
        title: 'Introduction to Bioinformatics Computing' ,
        courseDescription: 'Introduction of fundamentals of programming for bioinformatics (sometimes called “scripting”) using current programming languages and paradigms.  Introduces both the language and the use of the language within a Unix environment, demonstrating how interpreted languages serve both as a useful tool for writing and testing programs interactively and as a powerful data analysis and processing tool for bioinformatics.  Hands-on computing labs in which students learn bioinformatics computing and programming are also included.',
        unccCatalogID: '36', 
        unccCourseID: '121736'  
      },

      { 
        code: 'BINF 3101', 
        title: 'Sequence Analysis' ,
        courseDescription: 'The purpose, application, and biological significance of bioinformatics methods that identify sequence similarity, methods that rely on sequence similarity to produce models of biological processes and systems, as well as methods that use sequence characteristics to predict functional features in genomic sequence data.',
        unccCatalogID: '36', 
        unccCourseID: '121738'  
      },

      { 
        code: 'BINF 3121', 
        title: 'Statistics for Bioinformatics' ,
        courseDescription: 'Concepts from probability, stochastic processes, information theory, and other statistical methods are introduced and illustrated by examples from molecular biology, genomics and population genetics while exploring the use of the R and Bioconductor software for biostatistical analysis.',
        unccCatalogID: '36', 
        unccCourseID: '121737'  
      },

      { 
        code: 'BINF 3131', 
        title: 'Bioinformatics Algorithms' ,
        courseDescription: 'Introduction to common algorithms and data structures for bioinformatics problems.  Focuses on teaching students how to formulate a biological problem as a computational problem, and then solving it using efficient algorithms.  Intended for students who have programming skills and basic molecular biology knowledge.',
        unccCatalogID: '36', 
        unccCourseID: '121739'  
      },

      { 
        code: 'BINF 3201', 
        title: 'Genomic Methods' ,
        courseDescription: 'Lecture topics introduce students to core concepts in genomics that allow bench scientists to acquire large datasets in a high-throughput manner as well as address the computational methods used to analyze these data resources.  Labs are intended to give students hands-on experience in setting up and performing experiments with an emphasis on nucleic acid and protein profiling, understanding and troubleshooting published protocols, and interpreting the data using computational tools.',
        unccCatalogID: '36', 
        unccCourseID: '121735'  
      },

      { 
        code: 'BINF 3900', 
        title: 'Undergraduate Research' ,
        courseDescription: 'Enables students in the Bioinformatics and Genomics program to initiate research projects in their respective fields of interest and to interact with faculty in pursuing research experience.',
        unccCatalogID: '36', 
        unccCourseID: '121741'  
      },

      { 
        code: 'BINF 4010', 
        title: 'Topics in Bioinformatics and Genomics' ,
        courseDescription: 'Exploration of specific topics from the areas of bioinformatics and genomics.  ',
        unccCatalogID: '36', 
        unccCourseID: '121742'  
      },

      { 
        code: 'BINF 4171', 
        title: 'Business of Biotechnology' ,
        courseDescription: 'Introduces students to the field of biotechnology and how biotech businesses are created and managed. The students should be able to define biotechnology and understand the difference between a biotech company and a pharmaceutical company. Additional concepts covered will include platform technology, biotechnology’s history, biotechnology products and development processes, current technologies used by biotech companies today, biotechnology business fundamentals, research and development within biotech companies, exit strategies, and careers in the biotech field.',
        unccCatalogID: '36', 
        unccCourseID: '121745'  
      },

      { 
        code: 'BINF 4191', 
        title: 'Life Sciences and the Law' ,
        courseDescription: 'Law and regulations permeate our daily lives, and nowhere is this truer than in areas of life sciences.  This course explores what the law is, how our current laws developed, and factors currently affecting the evolution of the law.  It provides a general overview of U.S. law, including constitutional law, criminal law, contract law, tort law, property law (especially intellectual property law), business law (especially legal aspects of forming a new company), and administrative law.  It then focuses on specific aspects of the law affecting the life sciences, such as ownership of tissues and organisms, regulation of drugs and medical devices, regulation of research in the life sciences, the history and regulation of medicine, the economics and various types of health care delivery, and food production.',
        unccCatalogID: '36', 
        unccCourseID: '121746'  
      },

      { 
        code: 'BINF 4211', 
        title: 'Applied Data Mining for Bioinformatics' ,
        courseDescription: 'Concepts and techniques of evaluating bioinformatics data. The objective of this course is to provide students with a working knowledge of data sources, current tools and methodologies used for bioinformatics research though a variety of hands-on data analysis activities.',
        unccCatalogID: '36', 
        unccCourseID: '121747'  
      },

      { 
        code: 'BINF 4600', 
        title: 'Bioinformatics and Genomics Seminar' ,
        courseDescription: 'A senior level seminar course designed to introduce students to the research being conducted in both the Department of Bioinformatics and Genomics at UNC Charlotte, as well as through invited speakers from other universities.',
        unccCatalogID: '36', 
        unccCourseID: '121749'  
      },

      { 
        code: 'BINF 4650', 
        title: 'Senior Project' ,
        courseDescription: 'An individual or group project in the teaching, theory, or application of bioinformatics, genomics, or computational biology under the direction of a faculty member. Projects must be approved by the department before they can be initiated.',
        unccCatalogID: '36', 
        unccCourseID: '121748'  
      },

      { 
        code: 'BINF 4900', 
        title: 'Principles of Team Science' ,
        courseDescription: 'Introduction of appropriate project design, implementation, and management skills needed to function as a small team solving typical problems in bioinformatics and genomics.  Students are given realistic problems and are required to develop specifications, deliverables, timelines, and costs.  Under faculty supervision, the group assigns roles, responsibilities, and deadlines in order to complete the project and then execute the project.  At the end of the course, the group produces a written document with deliverables and makes a formal presentation of the project.',
        unccCatalogID: '36', 
        unccCourseID: '124913'  
      },

      // BINF Graduate Courses
      { 
        code: 'BINF 5171', 
        title: 'Business of Biotechnology' ,
        courseDescription: 'Introduces students to the field of biotechnology and how biotech businesses are created and managed. Students should be able to define biotechnology and understand the difference between a biotech company and a pharmaceutical company. Additional concepts covered will include platform technology, biotechnology’s history, biotechnology products and development processes, current technologies used by biotech companies today, biotechnology business fundamentals, research and development within biotech companies, exit strategies, and careers in the biotech field.',
        unccCatalogID: '37', 
        unccCourseID: '125610'  
      },

      { 
        code: 'BINF 5191', 
        title: 'Life Sciences and the Law' ,
        courseDescription: 'Law and regulations permeate our daily lives, and nowhere is this truer than in areas of life sciences.  This course explores what the law is, how our current laws developed, and factors currently affecting the evolution of the law.  It provides a general overview of U.S. law, including constitutional law, criminal law, contract law, tort law, property law (especially intellectual property law), business law (especially legal aspects of forming a new company), and administrative law.  It then focuses on specific aspects of the law affecting the life sciences, such as ownership of tissues and organisms, regulation of drugs and medical devices, regulation of research in the life sciences, the history and regulation of medicine, the economics and various types of health care delivery, and food production.',
        unccCatalogID: '37', 
        unccCourseID: '125611'  
      },

      { 
        code: 'BINF 6010', 
        title: 'Topics in Bioinformatics' ,
        courseDescription: 'Topics in bioinformatics and genomics selected to supplement the regular course offerings. A student may register for multiple sections of the course with different topics in the same semester or in different semesters.',
        unccCatalogID: '37', 
        unccCourseID: '125612'  
      },

      { 
        code: 'BINF 6100', 
        title: 'Biological Basis of Bioinformatics' ,
        courseDescription: 'This course provides a foundation in molecular genetics and cell biology focusing on foundation topics for graduate training in bioinformatics and genomics.',
        unccCatalogID: '37', 
        unccCourseID: '125613'  
      },

      { 
        code: 'BINF 6101', 
        title: 'Energy and Interaction in Biological Modeling' ,
        courseDescription: 'This course covers: (a) the major organic and inorganic chemical features of biological macromolecules; (b) the physical forces that shape biological molecules, assemblies and cells; (c) the chemical driving forces that govern living systems; (d) the molecular roles of biological macromolecules and common metabolites; (e) and the pathways of energy generation and storage. Each section of the course builds upon the relevant principles in biology and chemistry to explain the most common mathematical and physical abstractions used in modeling in the relevant context.',
        unccCatalogID: '37', 
        unccCourseID: '125614'  
      },

      { 
        code: 'BINF 6111', 
        title: 'Bioinformatics Programming I' ,
        courseDescription: 'Introduces fundamentals of programming for bioinformatics using a high-level object-oriented language such as Java or Python. Introduces object-oriented programming, analysis of algorithms, and fundamental sequence alignment methods. Students learn productive use of the Unix environment, focusing on Unix utilities that are particularly useful in bioinformatics.',
        unccCatalogID: '37', 
        unccCourseID: '125615'  
      },

      { 
        code: 'BINF 6112', 
        title: 'Bioinformatics Programming II' ,
        courseDescription: 'Continuation of BINF 6111. In this second semester, students practice and refine skills learned in the first semester. New topics include: (a) programming as part of a team, using sequence analysis algorithms in realistic settings; (b) writing maintainable and re-usable code; and (c) graphical user interface development.',
        unccCatalogID: '37', 
        unccCourseID: '125616'  
      },

      { 
        code: 'BINF 6151', 
        title: 'Professional Communication' ,
        courseDescription: 'Principles and useful techniques for effective oral presentations, poster presentations, scientific writing, use of references and avoiding plagiarism. Students in the course critique and help revise each other’s presentations and learn how to avoid common pitfalls. In addition, students learn how to properly organize and run a meeting.',
        unccCatalogID: '37', 
        unccCourseID: '125617'  
      },

      { 
        code: 'BINF 6152', 
        title: 'Program and Professional Orientation' ,
        courseDescription: 'Students learn to identify key Bioinformatics skill sets and where they are applied in research and industry settings, join appropriate professional networks, use the major professional and research journals in the field, identify key organizations and companies driving intellectual and technology development in bioinformatics, and achieve beginner level proficiency with key molecular data repositories.',
        unccCatalogID: '37', 
        unccCourseID: '125618'  
      },

      { 
        code: 'BINF 6153', 
        title: 'Career Development in Bioinformatics' ,
        courseDescription: 'Students prepare intensively for the job search, from developing a resume, to identifying appropriate opportunities, to preparing for the interview. Students are expected to complete a final interview practicum with faculty and members of the PSM Executive Board.',
        unccCatalogID: '37', 
        unccCourseID: '125619'  
      },

      { 
        code: 'BINF 6200', 
        title: 'Statistics for Bioinformatics' ,
        courseDescription: 'Introduces students to statistical methods commonly used in bioinformatics. Basic concepts from probability, stochastic processes, information theory, and other statistical methods are introduced and illustrated by examples from molecular biology, genomics and population genetics with an outline of algorithms and software. R is introduced as the programming language for homework.',
        unccCatalogID: '37', 
        unccCourseID: '125620'  
      },

      { 
        code: 'BINF 6201', 
        title: 'Molecular Sequence Analysis' ,
        courseDescription: 'Introduction of the basic computational methods and open sources software commonly used in molecular sequence analysis. Topics include: biological sequence data formats and major public databases, concepts of computer algorithms and complexity, introductions to principle components analysis and data clustering methods, dynamics of genes in populations, evolutionary models of DNA and protein sequences, derivation of amino acid substitution matrices, algorithms for pairwise sequence alignments and multiple sequence alignments, algorithms for fast sequence database search, methods for molecular phylogenetic analysis, hidden Markov models and neural networks for sequence pattern and family recognition, and introductions to genome evolution and comics data analysis.',
        unccCatalogID: '37', 
        unccCourseID: '125621'  
      },

      { 
        code: 'BINF 6202', 
        title: 'Computational Structural Biology' ,
        courseDescription: 'Topics include: (a) the fundamental concepts of structural biology (chemical building blocks, structure, superstructure, folding, etc.); (b) structural databases and software for structure visualization; (c) Structure determination and quality assessment; (d) protein structure comparison and the hierarchical nature of biomacromolecular structure classification; (e) protein structure prediction and assessment; and (f) sequence and structure-based functional site prediction.',
        unccCatalogID: '37', 
        unccCourseID: '125622'  
      },

      { 
        code: 'BINF 6203', 
        title: 'Genomics' ,
        courseDescription: 'Surveys the application of high-throughput molecular biology and analytical biochemistry methods and data interpretation for those kinds of high volume biological data most commonly encountered by bioinformaticians. The relationship between significant biological questions, modern genomics technology methods, and the bioinformatics solutions that enable interpretation of complex data is emphasized. Topics include: genome sequencing and assembly, annotation, and comparison; genome evolution and individual variation; function prediction; gene ontologies; transcription assay design, data acquisition, and data analysis; and metabolic pathways and databases and their role in genome analysis.',
        unccCatalogID: '37', 
        unccCourseID: '125623'  
      },

      { 
        code: 'BINF 6204', 
        title: 'Mathematical Systems Biology' ,
        courseDescription: 'Introduces basic concepts, principles and common methods used in systems biology. Emphasizes molecular networks, models and applications, and covers the following topics: (a) the structure of molecular networks; (b) network motifs, their system properties and the roles they play in biological processes; complexity and robustness of molecular networks; (c) hierarchy and modularity of molecular interaction networks; kinetic proofreading; (d) optimal gene circuit design; and (e) the rules for gene regulation.',
        unccCatalogID: '37', 
        unccCourseID: '125624'  
      },

      { 
        code: 'BINF 6205', 
        title: 'Computational Molecular Evolution' ,
        courseDescription: 'Covers major aspects of molecular evolution and phylogenetics with an emphasis on the modeling and computational aspects of the fields. Topics will include: models of nucleotide substitution, models of amino acid and codon substitution, phylogenetic reconstruction, maximum likelihood methods, Bayesian methods, comparison of phylogenetic methods and tests on trees, neutral and adaptive evolution and simulating molecular evolution. Students will obtain an in-depth knowledge of the various models of evolutionary processes, a conceptual understanding of the methods associated with phylogenetic reconstruction and testing of those methods and develop an ability to take a data-set and address fundamental questions with respect to genome evolution.',
        unccCatalogID: '37', 
        unccCourseID: '125625'  
      },

      { 
        code: 'BINF 6210', 
        title: 'Machine Learning for Bioinformatics' ,
        courseDescription: 'Introduction of commonly used machine learning methods in the field of bioinformatics. Topics include: dimension reduction using principal component analysis, singular value decomposition, and linear discriminant analysis, clustering using kmeans, hierarchical, expectation maximization approaches, classification using k-nearest neighbor and support vector machines. To help understand these methods, basic concepts from linear algebra, optimization, and information theory are explained. Application of these machine learning methods to solving bioinformatics problems are illustrated using examples from the literature.',
        unccCatalogID: '37', 
        unccCourseID: '125626'  
      },

      { 
        code: 'BINF 6211', 
        title: 'Design and Implementation of Bioinformatics Databases' ,
        courseDescription: 'The fundamentals of database modeling as used in bioinformatics. By the end of the course, students should be able to: understand different types of data models, know how hierarchical and relational models work and give examples that are widely used for biological databases, understand the capabilities of a standard, open source RDBMS, understand the tasks required for data integration and how to use SQL as a research tool. Introduction to ML, XML Schema, and BioOntologies as widely used data exchange and organization tools in bioinformatics databases.',
        unccCatalogID: '37', 
        unccCourseID: '125627'  
      },

      { 
        code: 'BINF 6215', 
        title: 'Bioinformatics Pipeline Programming' ,
        courseDescription: 'The concept of pipelines assemblies of basic bioinformatics tools and data sources to solve complex data processing problems. The pipeline concept is introduced with simple UNIX command line methods, and then extended to the use of preconfigured commercial and extensible open-source workflow management systems. Reproducibility of analysis, collection of analytic provenance information, and database integration is also covered.',
        unccCatalogID: '37', 
        unccCourseID: '125628'  
      },

      { 
        code: 'BINF 6310', 
        title: 'Advanced Statistics for Genomics' ,
        courseDescription: 'Canonical linear statistics (t-test, ANOVA, PCA) and their non-parametric equivalents. Examines application of Bayesian statistics, Hidden Markov Models and machine learning algorithms to problems in bioinformatics. Students should have fluency in a high-level programming language (PERL, Java, C#, Python or equivalent) and are expected, in assignments, to manipulate and analyze large public data sets. Utilizes the R statistical package with the bioconductor extension.',
        unccCatalogID: '37', 
        unccCourseID: '125629'  
      },

      { 
        code: 'BINF 6318', 
        title: 'Computational Proteomics and Metabolomics' ,
        courseDescription: 'Introduces commonly used computational algorithms, software tools, and databases for analyzing mass spectrometry-based proteomics and metabolomics data. Students learn how to: 1) implement algorithms for processing raw mass spectrometry data and extracting qualitative and quantitative information about proteins and metabolites; 2) align multiple datasets; 3) perform differential analysis of proteomics and metabolomics datasets; and 4) use commonly used protein and metabolite databases. Introduction of chromatography, mass spectrometry, and isotopic patterns of proteins and metabolites to provide background information for students to understand the nature of mass spectrometry data.',
        unccCatalogID: '37', 
        unccCourseID: '125633'  
      },

      { 
        code: 'BINF 6350', 
        title: 'Biotechnology and Genomics Laboratory' ,
        courseDescription: 'Introduction of the molecular biological methods by which samples are converted to a state from which sequence information can be produced. When sequence data is produced in a highly parallel fashion across a large fraction of a genome it is the basis of genomics. For historical reasons, the sample put on a sequencer is called a library, and the art of genomics lies in library construction. The experimental design and the technical details of library construction significantly affect the analyses that are appropriate and the conclusions that can be made. Lectures cover the design of experiments, how to critically read the literature to select an appropriate protocol for a variety of experimental purposes, and follow it to transform a sample into high quality sequence data. Quality control and library validation methods are explained. Topics include: selecting applications tuned to the experiment design to ensure proper data analysis and interpretation.',
        unccCatalogID: '37', 
        unccCourseID: '125634'  
      },

      { 
        code: 'BINF 6380', 
        title: 'Advanced Bioinformatics Programming' ,
        courseDescription: 'Advanced algorithms in bioinformatics with an emphasis placed on the implementation of bioinformatics algorithms in the context of parallel processing. Topics covered depend on instructor expertise and student interest, but may include assembly of short read fragments from next-generation sequencing platforms, clustering algorithms, machine learning, development of multi-threaded applications, developing for multi-core processors and utilization of large clusters and “cloud” supercomputers. Students are expected to complete a significant independent project. Course includes hands-on experience with multi-threaded programming.',
        unccCatalogID: '37', 
        unccCourseID: '125635'  
      },

      { 
        code: 'BINF 6400', 
        title: 'Internship Project' ,
        courseDescription: 'Project is chosen and completed under the guidance of an industry partner, and results in an acceptable technical report.',
        unccCatalogID: '37', 
        unccCourseID: '125638'  
      },

      { 
        code: 'BINF 6600', 
        title: 'Bioinformatics Seminar' ,
        courseDescription: 'Weekly seminars are given by bioinformatics researchers from within the University and across the world.',
        unccCatalogID: '37', 
        unccCourseID: '125639'  
      },

      { 
        code: 'BINF 6601', 
        title: 'Bioinformatics Journal Club' ,
        courseDescription: 'Each week, a student in the course is assigned to choose and present a paper from the primary bioinformatics literature.',
        unccCatalogID: '37', 
        unccCourseID: '125640'  
      },

      { 
        code: 'BINF 6880', 
        title: 'Independent Study' ,
        courseDescription: 'Faculty supervised research experience to supplement regular course offerings.',
        unccCatalogID: '37', 
        unccCourseID: '125641'  
      },

      { 
        code: 'BINF 6900', 
        title: 'Master’s Thesis' ,
        courseDescription: 'Project is chosen and completed under the guidance of a graduate faculty member, and will result in an acceptable master’s thesis and oral defense.',
        unccCatalogID: '37', 
        unccCourseID: '125642'  
      },

      { 
        code: 'BINF 8010', 
        title: 'Topics in Bioinformatics' ,
        courseDescription: 'Topics in bioinformatics and genomics selected to supplement the regular course offerings. A student may register for multiple sections of the course with different topics in the same semester or in different semesters.',
        unccCatalogID: '37', 
        unccCourseID: '125643'  
      },

      { 
        code: 'BINF 8100', 
        title: 'Biological Basis of Bioinformatics' ,
        courseDescription: 'Provides a foundation in molecular genetics and cell biology focusing on foundation topics for graduate training in bioinformatics and genomics.',
        unccCatalogID: '37', 
        unccCourseID: '125644'  
      },

      { 
        code: 'BINF 8101', 
        title: 'Energy and Interaction in Biological Modeling' ,
        courseDescription: 'Topics include: the major organic and inorganic chemical features of biological macromolecules; the physical forces that shape biological molecules, assemblies and cells; the chemical driving forces that govern living systems; the molecular roles of biological macromolecules and common metabolites; and the pathways of energy generation and storage. Each section of the course builds upon the relevant principles in biology and chemistry to explain the most common mathematical and physical abstractions used in modeling in the relevant context.',
        unccCatalogID: '37', 
        unccCourseID: '125645'  
      },

      { 
        code: 'BINF 8111', 
        title: 'Bioinformatics Programming I' ,
        courseDescription: 'Introduces fundamentals of programming for bioinformatics using a high-level object-oriented language such as Java or Python. Also introduces object-oriented programming, analysis of algorithms and fundamental sequence alignment methods. Students learn productive use of the Unix environment, focusing on Unix utilities that are particularly useful in bioinformatics.',
        unccCatalogID: '37', 
        unccCourseID: '125646'  
      },

      { 
        code: 'BINF 8112', 
        title: 'Bioinformatics Programming II' ,
        courseDescription: 'Continuation of BINF 8111. In this second semester, students practice and refine skills learned in the first semester. New topics include: programming as part of a team, using sequence analysis algorithms in realistic settings; writing maintainable and re-usable code; and graphical user interface development.',
        unccCatalogID: '37', 
        unccCourseID: '125647'  
      },

      { 
        code: 'BINF 8151', 
        title: 'Professional Communications' ,
        courseDescription: 'Principles and useful techniques for effective oral presentations, poster presentations, scientific writing, use of references and avoiding plagiarism. Students critique and help revise each other’s presentations and learn how to avoid common pitfalls. In addition, students learn how to properly organize and run a meeting. Students prepare a CV, job application letter, and job talk.',
        unccCatalogID: '37', 
        unccCourseID: '125648'  
      },

      { 
        code: 'BINF 8200', 
        title: 'Statistics for Bioinformatics' ,
        courseDescription: 'Introduction of statistical methods commonly used in bioinformatics. Basic concepts from probability, stochastic processes, information theory, and other statistical methods are introduced and illustrated by examples from molecular biology, genomics and population genetics with an outline of algorithms and software. R is introduced as the programming language for homework.',
        unccCatalogID: '37', 
        unccCourseID: '125649'  
      },

      { 
        code: 'BINF 8201', 
        title: 'Molecular Sequence Analysis' ,
        courseDescription: 'Introduction of the basic computational methods and open sources software commonly used in molecular sequence analysis. Topics include: biological sequence data formats and major public databases, concepts of computer algorithms and complexity, introductions to principle components analysis and data clustering methods, dynamics of genes in populations, evolutionary models of DNA and protein sequences, derivation of amino acid substitution matrices, algorithms for pairwise sequence alignments and multiple sequence alignments, algorithms for fast sequence database search, methods for molecular phylogenetic analysis, hidden Markov models and neural networks for sequence pattern and family recognition, and introductions to genome evolution and comics data analysis.',
        unccCatalogID: '37', 
        unccCourseID: '125650'  
      },

      { 
        code: 'BINF 8202', 
        title: 'Computational Structural Biology' ,
        courseDescription: 'Topics include: (a) the fundamental concepts of structural biology (chemical building blocks, structure, superstructure, folding, etc.); (b) structural databases and software for structure visualization; (c) Structure determination and quality assessment; (d) protein structure comparison and the hierarchical nature of biomacromolecular structure classification; (e) protein structure prediction and assessment; and (f) sequence and structure-based functional site prediction.',
        unccCatalogID: '37', 
        unccCourseID: '125651'  
      },

      { 
        code: 'BINF 8203', 
        title: 'Genomics' ,
        courseDescription: 'Surveys the application of high-throughput molecular biology and analytical biochemistry methods and data interpretation for those kinds of high volume biological data most commonly encountered by bioinformaticians. The relationship between significant biological questions, modern genomics technology methods, and the bioinformatics solutions that enable interpretation of complex data is emphasized. Topics include: genome sequencing and assembly, annotation, and comparison; genome evolution and individual variation; function prediction; gene ontologies; transcription assay design, data acquisition, and data analysis; metabolic pathways and databases and their role in genome analysis.',
        unccCatalogID: '37', 
        unccCourseID: '125652'  
      },

      { 
        code: 'BINF 8204', 
        title: 'Mathematical Systems Biology' ,
        courseDescription: 'Introduces basic concepts, principles and common methods used in systems biology. Emphasizes on molecular networks, models and applications, and covers the following topics: the structure of molecular networks; network motifs, their system properties and the roles they play in biological processes; complexity and robustness of molecular networks; hierarchy and modularity of molecular interaction networks; kinetic proofreading; optimal gene circuit design; and the rules for gene regulation.',
        unccCatalogID: '37', 
        unccCourseID: '125653'  
      },

      { 
        code: 'BINF 8205', 
        title: 'Computational Molecular Evolution' ,
        courseDescription: 'Major aspects of molecular evolution and phylogenetics with an emphasis on the modeling and computational aspects of the fields. Topics include: models of nucleotide substitution, models of amino acid and codon substitution, phylogenetic reconstruction, maximum likelihood methods, Bayesian methods, comparison of phylogenetic methods and tests on trees, neutral and adaptive evolution and simulating molecular evolution. Students obtain an in-depth knowledge of the various models of evolutionary processes, a conceptual understanding of the methods associated with phylogenetic reconstruction and testing of those methods and develop an ability to take a data-set and address fundamental questions with respect to genome evolution.',
        unccCatalogID: '37', 
        unccCourseID: '125654'  
      },

      { 
        code: 'BINF 8210', 
        title: 'Machine Learning for Bioinformatics' ,
        courseDescription: 'Introduces commonly used machine learning methods in the field of bioinformatics. Topics include: dimension reduction using principal component analysis, singular value decomposition, and linear discriminant analysis, clustering using k-means, hierarchical, expectation maximization approaches, classification using k-nearest neighbor and support vector machines. To help understand these methods, basic concepts from linear algebra, optimization, and information theory are explained. Application of these machine learning methods to solving bioinformatics problems are illustrated using examples from the literature.',
        unccCatalogID: '37', 
        unccCourseID: '125655'  
      },

      { 
        code: 'BINF 8211', 
        title: 'Design and Implementation of Bioinformatics Databases' ,
        courseDescription: 'Introduces the fundamentals of database modeling as used in bioinformatics.  By the end of the course, students are able to: understand different types of data models, know how hierarchical and relational models work and give examples that are widely used for biological databases, understand the capabilities of a standard, open source RDBMS, understand the tasks required for data integration and how to use SQL as a research tool. Introduction of XML, XML Schema, and BioOntologies as widely used data exchange and organization tools in bioinformatics databases.',
        unccCatalogID: '37', 
        unccCourseID: '125656'  
      },

      { 
        code: 'BINF 8310', 
        title: 'Advanced Statistics for Genomics' ,
        courseDescription: 'Canonical linear statistics (t-test, ANOVA, PCA) and their non-parametric equivalents. Examines the application of Bayesian statistics, Hidden Markov Models and machine learning algorithms to problems in bioinformatics. Students should have fluency in a high-level programming language (PERL, Java, C#, Python or equivalent) and are expected, in assignments, to manipulate and analyze large public data sets. Utilizes the R statistical package with the bioconductor extension.',
        unccCatalogID: '37', 
        unccCourseID: '125657'  
      },

      { 
        code: 'BINF 8310', 
        title: 'Computational Proteomics and Metabolomics' ,
        courseDescription: 'Introduces commonly used computational algorithms, software tools, and databases for analyzing mass spectrometry-based proteomics and metabolomics data. Students learn how to: 1) implement algorithms for processing raw mass spectrometry data and extracting qualitative and quantitative information about proteins and metabolites; 2) align multiple datasets; 3) perform differential analysis of proteomics and metabolomics datasets; and 4) use commonly used protein and metabolite databases. Also introduces chromatography, mass spectrometry, and isotopic patterns of proteins and metabolites to provide background information for understanding the nature of mass spectrometry data.',
        unccCatalogID: '37', 
        unccCourseID: '125661'  
      },

      { 
        code: 'BINF 8350', 
        title: 'Biotechnology and Genomics Laboratory' ,
        courseDescription: 'Introduction to the molecular biological methods by which samples are converted to a state from which sequence information can be produced. When sequence data is produced in a highly parallel fashion across a large fraction of a genome it is the basis of genomics. For historical reasons, the sample put on a sequencer is called a library, and the art of genomics lies in library construction. The experimental design and the technical details of library construction significantly affects the analyses that are appropriate and the conclusions that can be made. Lectures cover the design of experiments, how to critically read the literature to select an appropriate protocol for a variety of experimental purposes, and follow it to transform a sample into high quality sequence data. Quality control and library validation methods are explained. Topics include: selecting applications tuned to the experiment design to ensure proper data analysis and interpretation.',
        unccCatalogID: '37', 
        unccCourseID: '125662'  
      },

      { 
        code: 'BINF 8380', 
        title: 'Advanced Bioinformatics Programming' ,
        courseDescription: 'Advanced algorithms in bioinformatics with an emphasis placed on the implementation of bioinformatics algorithms in the context of parallel processing.  Topics covered depend on instructor expertise and student interest, but may include assembly of short read fragments from next-generation sequencing platforms, clustering algorithms, machine learning, development of multi-threaded applications, developing for multi-core processors and utilization of large clusters and “cloud” supercomputers.  Students are expected to complete a significant independent project.  Course includes hands-on experience with multi-threaded programming.',
        unccCatalogID: '37', 
        unccCourseID: '125663'  
      },

      { 
        code: 'BINF 8382', 
        title: 'Accelerated Bioinformatics Programming' ,
        courseDescription: 'Computationally intensive algorithms in bioinformatics with an emphasis placed on the implementation of bioinformatics algorithms in the context of parallel processing using modern hardware processor accelerators such as GPUs and FPGAs. Topics covered depend on instructor expertise and student interest but may include multi-threaded applications and developing for multi-core processors and for large clusters and other “cloud” computers. Students are expected to complete a significant independent project.',
        unccCatalogID: '37', 
        unccCourseID: '125664'  
      },

      { 
        code: 'BINF 8600', 
        title: 'Bioinformatics Seminar' ,
        courseDescription: 'Departmental seminar. Weekly seminars will be given by bioinformatics researchers from within the University and across the world.',
        unccCatalogID: '37', 
        unccCourseID: '125665'  
      },

      { 
        code: 'BINF 8601', 
        title: 'Bioinformatics Journal Club' ,
        courseDescription: 'Each week, a student in the class is assigned to choose and present a paper from the primary bioinformatics literature.',
        unccCatalogID: '37', 
        unccCourseID: '125666'  
      },

      { 
        code: 'BINF 8911', 
        title: 'Bioinformatics Research Rotation I' ,
        courseDescription: 'Faculty supervised research experience in bioinformatics to supplement regular course offerings.',
        unccCatalogID: '37', 
        unccCourseID: '125667'  
      },

      { 
        code: 'BINF 8912', 
        title: 'Bioinformatics Research Rotation II' ,
        courseDescription: 'Faculty supervised research experience in bioinformatics to supplement regular course offerings.',
        unccCatalogID: '37', 
        unccCourseID: '125668'  
      },

      { 
        code: 'BINF 8990', 
        title: 'Pre-Dissertation Research' ,
        courseDescription: 'Students conduct research in bioinformatics under the direction of one or more Bioinformatics faculty.  A major goal of this course is to prepare the student for the Qualifying Examination. ',
        unccCatalogID: '37', 
        unccCourseID: '128525'  
      },

      { 
        code: 'BINF 8991', 
        title: 'Doctoral Dissertation Research' ,
        courseDescription: 'Individual investigation culminating in the preparation and presentation of a doctoral dissertation. A student may register for multiple sections of this course in the same semester or different semesters.',
        unccCatalogID: '37', 
        unccCourseID: '125669'  
      },

      //Math Undergraduate Courses
      { 
        code: 'MATH 1120', 
        title: 'Calculus' ,
        courseDescription: 'Intended for students majoring in fields other than engineering, mathematics or science. Elements of differential and integral calculus for polynomial, rational, exponential, logarithmic functions, with applications to business and the social and life sciences. Students who have already received credit for MATH 1121 or higher will not receive credit for taking MATH 1120.',
        unccCatalogID: '36', 
        unccCourseID: '123332'  
      },

      { 
        code: 'MATH 1165', 
        title: 'Introduction to Discrete Structures' ,
        courseDescription: 'Propositions and truth tables, sets, permutations and combinations, relations and functions, lattices, and trees.',
        unccCatalogID: '36', 
        unccCourseID: '123334'  
      },

      { 
        code: 'MATH 1241', 
        title: 'Calculus 1' ,
        courseDescription: 'Designed for students majoring in Mathematics, Science, or Engineering. Elementary functions, derivatives and their applications, introduction to definite integrals.',
        unccCatalogID: '36', 
        unccCourseID: '123335'  
      },

      { 
        code: 'MATH 1242', 
        title: 'Calculus 2' ,
        courseDescription: 'Methods for evaluating definite integrals, applications of integration, improper integrals, infinite series, Taylor series, power series, and introduction to differential equations.',
        unccCatalogID: '36', 
        unccCourseID: '123336'  
      },

      { 
        code: 'MATH 2164', 
        title: 'Matrices and Linear Algebra' ,
        courseDescription: 'Matrix algebra, systems of linear equations, vector spaces, linear transformations, determinants, inner products, eigenvalues.',
        unccCatalogID: '36', 
        unccCourseID: '123339'  
      },

      //Stat Undergraduate Courses
      { 
        code: 'STAT 1220', 
        title: 'Elements of Statistics I (BUSN)' ,
        courseDescription: 'Non-calculus based introduction to data summarization, discrete and continuous random variables (e.g., binomial, normal), sampling, central limit theorem, estimation, testing hypotheses, and linear regression. Applications of theory will be drawn from areas related to business. May not be taken for credit if credit has been received for STAT 1221 or STAT 1222.',
        unccCatalogID: '36', 
        unccCourseID: '124336'  
      },
      { 
        code: 'STAT 1221', 
        title: 'Elements of Statistics I' ,
        courseDescription: 'Same topics as STAT 1220 with special emphasis on applications to the life sciences. Students who have already received credit for STAT 1220 or STAT 1222 will not receive credit for taking STAT 1221.',
        unccCatalogID: '36', 
        unccCourseID: '124337'  
      },
      { 
        code: 'STAT 1222', 
        title: 'Introduction to Statistics' ,
        courseDescription: 'Same topics as STAT 1220 with special emphasis on applications to the social and behavioral sciences. May not be taken for credit and for a grade if credit has been received for STAT 1220 or STAT 1221.',
        unccCatalogID: '36', 
        unccCourseID: '124338'  
      },

      { 
        code: 'STAT 2122', 
        title: 'Introduction to Probability and Statistics' ,
        courseDescription: 'A study of probability models, discrete and continuous random variables, inference about Bernoulli probability, inference about population mean, inference about population variance, the maximum likelihood principle, the minimax principle, Bayes procedures, and linear models.',
        unccCatalogID: '36', 
        unccCourseID: '124339'
      },

      { 
        code: 'STAT 2223', 
        title: 'Elements of Statistics II' ,
        courseDescription: 'Topics include: contingency analysis, design of experiments, more on simple linear regression, and multiple regression. Computers are used to solve some of the problems.',
        unccCatalogID: '36', 
        unccCourseID: '124340'  
      },

      //INFO (Belk College of Business) Undergraduate Course
      //TODO: Add unccCourseID & unccCatalogID
      { 
        code: 'INFO 3236', 
        title: 'Business Analytics' ,
        courseDescription: 'Various data mining and business intelligence methods, such as rule-based systems, decision trees, and logistic regression. Query and reporting, online analytical processing (OLAP) and statistical analysis. Issues relating to modeling, storing, securing, and sharing the organizational data resources.',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      // BIOL (Department of Biological Science) Undergraduate Courses
      // TODO: Add unccCourseID and unccCatalogID
      { 
        code: 'BIOL 2120', 
        title: 'General Biology I' ,
        courseDescription: 'Origin and early evolution of life, basic principles of chemistry, cell biology, and genetics.',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'BIOL 2130', 
        title: 'General Biology II' ,
        courseDescription: 'Ecology, evolution, biodiversity, plant and animal structure and function',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      //CHEM (Department of Chemistry) Undergraduate Courses
      //TODO: Add unccCourseID and unccCatalogID
      { 
        code: 'CHEM 1251', 
        title: 'General Chemistry I' ,
        courseDescription: 'A principles-oriented course for science and engineering majors. Fundamental principles and laws of chemistry; the relationship of atomic structure to physical and chemical properties of the elements. Topics include: measurements, chemical nomenclature, reactions and stoichiometry, thermochemistry, atomic structure, periodicity, bonding, and molecular structure. Three lecture hours and one Problem Session hour per week.  Students may attempt CHEM 1251 a total of three times. Withdrawing from the course after the Add/Drop deadline constitutes an attempt as does receiving any letter grade.  Students who have received credit for CHEM 1251 may not enroll in CHEM 1111 or CHEM 1111L.  Students who have received credit for CHEM 1251 with a grade of C or above may not enroll in CHEM 1200.',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'CHEM 1251L', 
        title: 'General Chemistry I Laboratory' ,
        courseDescription: 'Experimental investigations involving the fundamental principles and laws of chemistry.  Students may attempt CHEM 1251L a total of three times. Withdrawing from the course after the Add/Drop deadline constitutes an attempt as does receiving any letter grade.  Students who have received credit for CHEM 1251L may not enroll in CHEM 1111L. ',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'CHEM 1252', 
        title: 'General Chemistry II' ,
        courseDescription: 'Continuation of CHEM 1251. Topics include: gas laws, liquids and solids, solutions, chemical kinetics, chemical equilibrium, thermodynamics, and electrochemistry.  Three lecture hours and one Problem Session hour per week.  Students may attempt CHEM 1252 a total of three times. Withdrawing from the course after the Add/Drop deadline constitutes an attempt as does receiving any letter grade. Students who have received credit for CHEM 1252 may not enroll in CHEM 1112 or CHEM 1112L. ',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'CHEM 1252L', 
        title: 'General Chemistry II Laboratory' ,
        courseDescription: 'Continuation of CHEM 1251L.  Students may attempt CHEM 1252L a total of three times. Withdrawing from the course after the Add/Drop deadline constitutes an attempt as does receiving any letter grade. Students who have received credit for CHEM 1252L may not enroll in CHEM 1112L. ',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      // ECGR (Electrical/Computer engineering)  Graduate Courses
      // Todo: Add unccCourseID and unccCatalogID 
      { 
        code: 'ECGR 5101', 
        title: 'Advanced Embedded Systems',
        courseDescription: 'An advanced course in embedded system design utilizing advanced microprocessors.  Architecture, software, and interface techniques.  This course is project-oriented, involving the use of a logic analyzer and hardware design tools.  Credit will not be given for ECGR 5101 where credit has been given for ECGR 4101.',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ECGR 5124', 
        title: 'Digital Signal Processing',
        courseDescription: 'Sampling and signal recovery in linear systems; analysis of sampled systems; discrete and fast Fourier transforms; ztransform; discrete convolution; design of digital FIR and IIR filters. Credit will not be given for ECGR 5124 where credit has been given for ECGR 4124.',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      { 
        code: 'ECGR 6181',  
        title: 'Embedded Operating Systems' ,
        courseDescription: 'Introduction to the fundamentals of embedded operating systems with an emphasis on real-time performance.  A series of labs provides students practical experience on bare metal programming, embedded Linux kernel configuration and initialization, boot loaders, kernel modules, device drivers, and interrupt handlers.',
        unccCatalogID: '', 
        unccCourseID: ''  
      },

      // MBAD (Master of Business Administration) Graduate Courses
      //TODO: Add unccCourseID and unccCatalogID
      { 
        code: 'MBAD 6122', 
        title: 'Decision Modeling and Analysis' ,
        courseDescription: 'An analytical approach to the management process. Generalized models for decision making with major emphasis on application of the scientific method to management problems.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'MBAD 6141', 
        title: 'Operations Management' ,
        courseDescription: 'Design, operation, and control of service and manufacturing systems. Emphasis on using analytical tools for problem solving in process analysis and reengineering, work-force management, material and inventory management, aggregate planning, total quality management, and others.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'MBAD 6161', 
        title: 'Human Behavior in Organizations' ,
        courseDescription: 'Behavioral knowledge and skills essential to becoming an effective manager/leader including behavior and motivation in an environment of complexity and rapid change and ethical implications of actions and their effects on demographically diverse and increasingly international work force.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'MBAD 6164', 
        title: 'Executive Communication' ,
        courseDescription: 'Intensive study of communication in organizations from middle and upper management perspectives with special attention to corporate communication, media relations, technologically mediated communication, crisis communication and public affairs. Case studies, readings, and project assignments are used in a variety of business situations.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },
      { 
        code: 'MBAD 6165', 
        title: 'Negotiation and Conflict Management' ,
        courseDescription: 'Negotiation is the art and science of securing agreement between two or more independent parties. Conflict management involves resolving situations where the interests of two or more parties differ. Involves developing a repertoire of skills and techniques for negotiation and conflict management to develop a systematic and positive approach for negotiating with multiple stakeholders. Case studies, readings, and simulations are used.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'MBAD 6201', 
        title: 'Business Intelligence and Analytics' ,
        courseDescription: 'An overview of the business approach to identifying, modeling, retrieving, sharing, and evaluating an enterprise’s data and knowledge assets. Focuses on the understanding of data and knowledge management, data warehousing, data mining (including rule-based systems, decision trees, neural networks, etc.), and other business intelligence concepts. Covers the organizational, technological and management perspectives.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'MBAD 6202', 
        title: 'Digitization of Business Processes' ,
        courseDescription: 'Examination of key issues involved in digitization of business processes. Topics include: digitization strategies, systems analysis and design, data management, evaluation of IT investments, and management of emerging technologies.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'MBAD 6207', 
        title: 'Business Project Management' ,
        courseDescription: 'Project management is widely used in a variety of business environments to manage complex, non-routine endeavors. Examples of projects include consulting and process improvement projects, advertising projects, and technology projects. This course focuses on tools, techniques, and skills for business project management, with attention to both the quantitative and the qualitative aspects of project management. Topics include: project evaluation, estimation, monitoring, risk management, audit, managing global projects, outsourcing, and project portfolio management. Students also gain experience using Project Management Software.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'MBAD 6211', 
        title: 'Advanced Business Analytics' ,
        courseDescription: 'An in-depth study of applications of data analytics techniques to discover non-trivial relationships that are understandable, useful, and actionable to decision makers. A case approach is used to emphasize hands-on learning and real-world deployment of business analytics.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      // DSBA (Data Science and Buiness Analytics) Graduate Courses
      // TODO: Add unccCourseID and unccCatalogID
      { 
        code: 'DSBA 6100', 
        title: 'Big Data Analytics for Competitive Advantage' ,
        courseDescription: 'An introduction to the use of big data as a strategic resource. A focus is placed on integrating the knowledge of analytics tools with an understanding of how companies leverage data analytics to gain strategic advantage. A case approach is used to emphasize hands-on learning and a real-world view of big data analytics.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'DSBA 6156', 
        title: 'Applied Machine Learning' ,
        courseDescription: 'Practical perspectives and applications of machine learning methods and techniques including: acquisition of declarative knowledge; organization of knowledge into new, more effective representations; development of new skills through instruction and practice; and discovery of new facts and theories through observation and experimentation.',
        unccCatalogID: '', 
        unccCourseID: ''
      },

      { 
        code: 'DSBA 6201', 
        title: 'Business Intelligence and Analytics' ,
        courseDescription: 'An overview of the business approach to identifying, modeling, managing, and evaluating an enterprise’s data and knowledge assets.  Focuses on the understanding of statistical modeling and analysis, data warehousing, data mining (including decision trees, clustering, association rule mining, etc.), and other business intelligence and analytics concepts. ',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      // PHIL (Depart of philosophy) Graduate Courses
      //TODO: Add unccCourseID and unccCatalogID
      { 
        code: 'PHIL 6340', 
        title: 'Philosophy of Mind' ,
        courseDescription: 'Examines questions concerning the relationship between body and mind, the existence of other minds, the nature of consciousness, and the architecture of cognition. Approaches to these questions include traditional philosophical sources (emphasizing metaphysics and epistemology) and more recent developments in cognitive science (including the computational model of mind, mental representation, connectionist systems, and artificial intelligence). Also addressed are ethical and social issues involved in the design and implementation of intelligent systems. Inquiries bear on issue such as free will and determinism, emotion and reasoning, and the nature of rationality.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      // PSYC (Department of Psychological Science) Graduate Courses
      //TODO: Add unccCourseID and unccCatalogID
      { 
        code: 'PSYC 6116', 
        title: 'Cognition' ,
        courseDescription: 'Concerned with how humans acquire information, retain information in memory, and use this information to reason and solve problems. Current emphases include memory, category learning, planning, concept formation, problem solving, mental models, and knowledge representation.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      // ARCH Graduate Courses
      //TODO: Add unccCourseID and unccCatalogID
      { 
        code: 'ARCH 7211', 
        title: 'Studio Lab I',
        courseDescription: 'The Studio Lab sequence situates students with varying backgrounds in a research environment that allows them to develop and test innovative tools, applications, and solutions.  Each semester may be jointly taught by faculty from the School of Architecture and other collaborating departments from the University.  The course is typically project-based and organized around research questions and topics chosen by the participating faculty.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'ARCH 7212', 
        title: 'Studio Lab II' ,
        courseDescription: 'The Studio Lab sequence situates students with varying backgrounds in a research environment that allows them to develop and test innovative tools, applications, and solutions.  Each semester may be jointly taught by faculty from the School of Architecture and other collaborating departments from the University.  The course is typically project-based and organized around research questions and topics chosen by the participating faculty.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'ARCH 8004', 
        title: 'Architectural History Topics' ,
        courseDescription: 'Topics are available in a wide variety of subjects in architectural history and theory, in which students develop in-depth research, writing, and presentation skills. ',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'ARCH 8050', 
        title: 'Architectural Elective: Connective Environments I' ,
        courseDescription: 'Topics include: Computation, Theory, Representation, Making, Urbanism, and Technology. ',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'ARCH 8211', 
        title: 'Studio Lab' ,
        courseDescription: 'Topics are available in a wide variety of subjects in architectural history and theory, in which students develop in-depth research, writing, and presentation skills. ',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'ARCH 8607', 
        title: 'Digital Manufacturing and Robotics' ,
        courseDescription: 'The use of digital manufacturing and robotics is quickly becoming an engrained part of design professions.  The understanding of how these machines function will become an essential component of an Architect’s understanding of how buildings can be manufactured both in-situ and in a factory.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      // GRAD Graduate Courses
      //TODO: Add unccCourseID and unccCatalogID 
      { 
        code: 'GRAD 8302', 
        title: 'Responsible Conduct of Research' ,
        courseDescription: 'An introduction to several aspects of a successful professional career emphasizing research. Designed to benefit graduate students across the University. Focuses on practical skills and critical research, highlighting the nine areas of instruction required by the National Institutes of Health (NIH) and National Science Foundation (NSF). Features several different speakers with expertise in various areas of professionalism and research ethics. Required course for all doctoral students.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

      { 
        code: 'GRAD 8990', 
        title: 'Academic Integrity' ,
        courseDescription: 'Online training addressing issues of academic integrity and the University’s policy and procedures related to violations. Required of all new doctoral students.',
        unccCatalogID: '', 
        unccCourseID: '' 
      },

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
