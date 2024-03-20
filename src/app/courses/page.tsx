'use client';
import Navbar from '@/components/navbar';
import CoursesPage from '@/components/coursesUI/courses';
import React from 'react';

function Page() {
  return (
    <div>
        <Navbar />
        <CoursesPage />
    </div>
  )
}

export default Page