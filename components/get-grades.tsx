"use client"


import { DemoGrades } from "./demo-grades";
import { useEffect, useState } from "react";
import { GradesStudent } from './grades-student';
import { GradesTeacher } from './grades-teacher';

async function fetcher(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }

export function GetGrades({ role }:{role:any}){
    const
    [error, setError] = useState<Error | null>(null),
    [grades, setGrades] = useState([]),
    [students, setStudents] = useState<any[]>([]),
    [teachers, setTeachers] = useState<any[]>([]),
    [loading, setLoading] = useState(true),
    [needReload, setNeedReload] = useState(0);

    useEffect(() => {
        fetchData();
        async function fetchData() {
          try {
            const result = await Promise.all(
              [fetcher('/api/grade'),
              fetcher('/api/student'),
              fetcher('/api/teacher')]);
    
            setGrades(result[0]);
            setStudents(result[1]);
            setTeachers(result[2]);
            setError(null);
            setLoading(false);
          } catch (error) {
            console.error('error=', error);
            
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error('Unknown error occurred'));
            }
          }
        }
      }, [needReload]);
    
      if (error) return <div>Error: {error.message}</div>;
      if (loading) return <div>Loading...</div>;
    
      console.log({ grades, students, teachers });
      return <>
        <DemoGrades grades={grades} students={students} teachers={teachers} />
        {'student' === role && <GradesStudent grades={grades}  teachers={teachers} />}
        {'teacher' === role && <GradesTeacher grades={grades} students={students} needReload={() => setNeedReload(x => 1 + x)} />}
    
</>
}