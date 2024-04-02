'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Pagination from '@/components/pagination';
import { HiExternalLink } from 'react-icons/hi';

interface Professor {
  name: string;
  title: string;
  department: string;
  office: string;
  email: string;
  phone?: string;
  rateMyProfessorsId?: string;
}

const ITEMS_PER_PAGE = 9;

export default function InstructorsPage() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/instructors');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data: Professor[] = await response.json();
        setProfessors(data);
      } catch (error) {
        console.error('Failed to fetch professors:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(professors.length / ITEMS_PER_PAGE);
  const displayedProfessors = professors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      <main className="mt-10 py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProfessors.map((professor, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="bg-[#A49665] p-4 flex justify-between items-center">
                <h5 className="text-white">{professor.name}</h5>
                {professor.rateMyProfessorsId && (
                  <a
                    href={`https://www.ratemyprofessors.com/professor/${professor.rateMyProfessorsId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    <HiExternalLink size={20} />
                  </a>
                )}
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
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
