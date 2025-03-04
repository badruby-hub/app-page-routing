import { StudentsList } from '@/components/student-list';
import { $students } from '@/store/api';
import { useStore } from '@nanostores/react';


export default function Page() {
  const { data, loading, error } = useStore($students);
  console.log('student-list', { data, loading, error });
  if (Array.isArray(data))
    return <StudentsList student={data} />;
  if (loading)
    return <>Loading...</>;
  return <>Error!={String(error)}</>;
}