import { Grade, Teacher } from '@prisma/client';

export function GradesStudent({ grades, teachers }:
  { grades: Grade[], teachers: Teacher[] }) {
  return <table>
    <caption>Student Grades</caption>
    <thead>
      <tr>
        <th>Points</th>
        <th>Teacher</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {grades.map(({ id, teacherId, date, point }) => {
        const teacher = teachers.find(t => t.id === teacherId);
        return <tr key={id}>
          <td>{point}</td>
          <td>{teacher?.name}</td>
          <td>{date.toString()}</td>
        </tr>
      })}
    </tbody>
  </table>;
}