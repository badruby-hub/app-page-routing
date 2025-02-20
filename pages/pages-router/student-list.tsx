import { StudentList } from "@/components/student-list";
import { $students} from "@/store/api";
import { useStore } from "@nanostores/react";

export default function Page(){
    const {data, loading,error} = useStore($students);

    if(Array.isArray(data))
         return<StudentList student={data}/>
    if(loading)
        return <>loading...</>;
    return <>Error!={String(error)}</>;
}
