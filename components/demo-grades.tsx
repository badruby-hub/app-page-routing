

import type {Grade, Teacher,Student} from "@prisma/client";
export function DemoGrades({grades=[], students=[], teachers=[]}:
    {grades:Grade[], students:Student[], teachers:Teacher[]}){
        const 
            getStudent = (id: number) => students.find(student => student.id === id),
            teacherMap = new Map(teachers.map(teacher => [teacher.id, teacher])),
            studentCell = (id: number) => {
                const
                  student = getStudent(id);
                return `${student?.name} ${student?.surname}`;
              },
              teacherCell = (id: number) => {
                const
                  teacher = teacherMap.get(id);
                return `${teacher?.name} ${teacher?.surname}`
              };
    return <div>
    <h1>Grades</h1>
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Point</th>
          <th>Teacher</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {grades.map(grade => <tr key={grade.id}>
          <td>{studentCell(grade.studentId)}</td>
          <td>{grade.point}</td>
          <td>{teacherCell(grade.teacherId)}</td>
          <td>{grade?.date?.toString?.()}</td>
        </tr>)}
      </tbody>
    </table>
  </div>;
} 