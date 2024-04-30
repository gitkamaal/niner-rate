'use client';
import Navbar from '@/components/navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
      .then((response) => {
        if (response.ok) {
          alert('Course added successfully!');
          window.location.reload()
        } else {
          alert('Failed to add course');
        }
      })
      .catch((error) => console.error('Failed to add course:', error));
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
    .then((response) => {
      if (response.ok) {
        alert('Instructor added successfully!');
        window.location.reload(); // Reload the page to see the new instructor
      } else {
        alert('Failed to add instructor');
      }
    })
    .catch((error) => console.error('Failed to add instructor:', error));
}

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="mt-20 py-8 px-4 w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-6">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-[#005035] mb-4">Admin Panel</h1>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3">Add Course</h2>
                <form onSubmit={handleCourseSubmit} className="space-y-4">
                  <input className="input-field" name="code" placeholder="Course Code" required />
                  <input className="input-field" name="title" placeholder="Title" required />
                  <textarea className="input-field" name="courseDescription" placeholder="Course Description" required />
                  <input className="input-field" name="unccCatalogID" placeholder="Catalog ID" required />
                  <input className="input-field" name="unccCourseID" placeholder="Course ID" required />
                  <button type="submit" className="btn btn-primary">Add Course</button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Add Instructor</h2>
                <form onSubmit={handleInstructorSubmit} className="space-y-4">
                  <input className="input-field" name="name" placeholder="Name" required />
                  <input className="input-field" name="title" placeholder="Title" required />
                  <input className="input-field" name="department" placeholder="Department" required />
                  <input className="input-field" name="phone" placeholder="Phone" required />
                  <input className="input-field" name="email" placeholder="Email" required />
                  <input className="input-field" name="office" placeholder="Office" required />
                  <input className="input-field" name="rateMyProfessorsId" placeholder="Rate My Professors ID" />
                  <button type="submit" className="btn btn-primary">Add Instructor</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
