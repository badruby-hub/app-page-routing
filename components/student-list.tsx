import type {Student} from "@prisma/client"
export function StudentList({student}: {student: Student[]}) {
    return <table>
        <thead>
            <tr>
              <td>name</td>
              <td>surname</td>
              <td>age</td>
            </tr>
        </thead>
        <tbody>
            {student.map(({id,name,surname,age,groupId})=><tr key={id}>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{age}</td>
                <td>{groupId}</td>
            </tr>)}
        </tbody>
    </table>
}