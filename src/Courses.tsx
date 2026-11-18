import { useEffect, useState } from 'react';
import { api } from './api/interceptor';

interface Course {
  id: number;
  title: string;
}

interface AdminResponse {
  message: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    api<{ courses: Course[] }>('/api/course')
      .then(({ courses }) => setCourses(courses))
      .catch((error: Error) =>
        console.error('Failed to fetch courses:', error),
      );

    api<AdminResponse>('/api/admin')
      .then((data) => console.log('Admin API:', data))
      .catch((error: Error) => console.error('Admin API error:', error));
  }, []);

  return (
    <ul>
      {courses.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
};

export default Courses;
