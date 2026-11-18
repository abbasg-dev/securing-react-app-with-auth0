import { useEffect, useState } from 'react';
import { api } from './api/interceptor';

interface Course {
  id: number;
  title: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  console.log('courses: ', courses);
  useEffect(() => {
    api<{ courses: Course[] }>('/api/course')
      .then(({ courses }) => setCourses(courses))
      .catch((error: Error) =>
        console.error('Failed to fetch courses:', error),
      );
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
