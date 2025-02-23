import { Grade, Student } from '@prisma/client';

async function addGrade(event: React.FormEvent<HTMLFormElement>, needReload: () => void) {
  event.preventDefault();
  const
    form = event.target as HTMLFormElement,
    formData = new FormData(form),
    data = Object.fromEntries(formData.entries());
  console.log('addGrade', data);
  await fetch('/api/grade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  needReload();
}

export function GradesTeacher({ grades, students, needReload }:
  { grades: Grade[], students: Student[],needReload: () => void }) {
  return <table>
    <caption>Teacher Grades</caption>
    <thead>
      <tr>
        <th>Student</th>
        <th>Points</th>
        <th>add</th>
      </tr>
    </thead>
    <tbody>
      {students.map(({ id, name }) => {
        const
          studentGrades = grades
            .filter(g => g.studentId === id)
            .map(g => g.point);
        return <tr key={id}>
          <td>{name}</td>
          <td>{studentGrades.join(', ')}</td>
          <td>
            <form onSubmit={evt => addGrade(evt, needReload)}>
              <input type="hidden" name="studentId" value={id} />
              <input min="1" max="12" type="number" name="point" />
              <button type="submit">add</button>
            </form>
          </td>
        </tr>
      })}
    </tbody>
  </table>;
}