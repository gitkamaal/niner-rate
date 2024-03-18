'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Pagination from '@/components/pagination';

const ITEMS_PER_PAGE = 9; // Set the number of items you want per page

const InstructorsPage = () => {
  const professors = [
    {
      name: 'Test Professor',
      title: 'Test Title',
      department: 'Test Department',
      office: 'Test Office',
      email: 'test1@test.edu',
      phone: '123-456-7890',
    },
    {
      name: 'Another Professor',
      title: 'Another Title',
      department: 'Another Department',
      office: 'Another Office',
      email: 'test2@test.edu',
      phone: '987-654-3210',
    },
    {
      name: 'Another Professor',
      title: 'Another Title',
      department: 'Another Department',
      office: 'Another Office',
      email: 'test2@test.edu',
      phone: '987-654-3210',
    },
    {
      name: 'Another Professor',
      title: 'Another Title',
      department: 'Another Department',
      office: 'Another Office',
      email: 'test2@test.edu',
      phone: '987-654-3210',
    },
    {
      name: 'Another Professor',
      title: 'Another Title',
      department: 'Another Department',
      office: 'Another Office',
      email: 'test2@test.edu',
      phone: '987-654-3210',
    },
    {
      name: 'Test Professor',
      title: 'Test Title',
      department: 'Test Department',
      office: 'Test Office',
      email: 'test1@test.edu',
      phone: '123-456-7890',
    },
    {
      name: 'Another Professor',
      title: 'Another Title',
      department: 'Another Department',
      office: 'Another Office',
      email: 'test2@test.edu',
      phone: '987-654-3210',
    },
    {
      name: 'Another Professor',
      title: 'Another Title',
      department: 'Another Department',
      office: 'Another Office',
      email: 'test2@test.edu',
      phone: '987-654-3210',
    },
    {
      name: 'Test Professor',
      title: 'Test Title',
      department: 'Test Department',
      office: 'Test Office',
      email: 'test1@test.edu',
      phone: '123-456-7890',
    },
    {
      name: 'Another Professor',
      title: 'Another Title',
      department: 'Another Department',
      office: 'Another Office',
      email: 'test2@test.edu',
      phone: '987-654-3210',
    },
    {
      name: 'Another Professor',
      title: 'Another Title',
      department: 'Another Department',
      office: 'Another Office',
      email: 'test2@test.edu',
      phone: '987-654-3210',
    },
    {
      name: 'Test Professor',
      title: 'Test Title',
      department: 'Test Department',
      office: 'Test Office',
      email: 'test1@test.edu',
      phone: '123-456-7890',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(professors.length / ITEMS_PER_PAGE);

  // Calculate the slice of professors to display based on the current page
  const displayedProfessors = professors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />

      <main className="py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProfessors.map((professor, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="bg-[#A49665] p-4">
                <h5 className="text-white">{professor.name}</h5>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Title: {professor.title}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Department: {professor.department}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Office: {professor.office}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Email: {professor.email}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Phone: {professor.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </>
  );
};

export default InstructorsPage;
