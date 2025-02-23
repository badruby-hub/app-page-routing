import type {Student, Group} from "@prisma/client"

type StudentWidthGroup = Student & {group: Group}


export function StudentList({student}: {student: StudentWidthGroup[]}) {
    return <table>
        <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>surname</td>
              <td>age</td>
            </tr>
        </thead>
        <tbody>
            {student.map(({id,name,surname,age,group})=><tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{age}</td>
                <td>{group?.name}</td>
            </tr>)}
        </tbody>
    </table>
}