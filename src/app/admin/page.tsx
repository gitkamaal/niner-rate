'use client';
import Navbar from '@/components/navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {

      if (status !== 'loading') {
        if (!session || session.user.id !== 'admin') {
          router.push('/');
        } else {
          setIsReady(true); 
        }
      }
    }, [session, status, router]);

    function handleCourseSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const courseData = Object.fromEntries(formData.entries());

      fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      })
      .then(response => {
        if (response.ok) {
          alert('Course added successfully!');
        } else {
          alert('Failed to add course');
        }
      })
      .catch(error => console.error('Failed to add course:', error));
    }

    function handleInstructorSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const instructorData = Object.fromEntries(formData.entries());

        fetch('/api/instructors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(instructorData),
        })
        .then(response => response.ok ? alert('Instructor added successfully!') : Promise.reject('Failed to add instructor'))
        .catch(error => console.error('Failed to add instructor:', error));
    }

    if (!isReady) {
      return <p>Loading...</p>;
    }

    return (
      <>
        <div>
        <Navbar />
          <h1>Admin Panel</h1>
            <h2>Add Course</h2>
          <form onSubmit={handleCourseSubmit}>
            <input name="code" placeholder="Course Code" required />
            <input name="title" placeholder="Title" required />
            <textarea name="courseDescription" placeholder="Course Description" required />
            <input name="unccCatalogID" placeholder="Catalog ID" required />
            <input name="unccCourseID" placeholder="Course ID" required />
            <button type="submit">Add Course</button>
          </form>

          <h2> Add Instructor</h2>
                <form onSubmit={handleInstructorSubmit}>
                    <input name="name" placeholder="Name" required />
                    <input name="title" placeholder="Title" required />
                    <input name="department" placeholder="Department" required />
                    <input name="phone" placeholder="Phone" required />
                    <input name="email" placeholder="Email" required />
                    <input name="office" placeholder="Office" required />
                    <input name="rateMyProfessorsId" placeholder="Rate My Professors ID" />
                    <button type="submit">Add Instructor</button>
                </form>
        </div>
      </>
    );
  }