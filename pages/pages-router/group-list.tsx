import { GroupList } from "@/components/group-list";
import { $groups } from "@/store/api";
import { useStore } from "@nanostores/react";

export default function Page(){
    const {data, loading,error} = useStore($groups);
    if(data)
         return<GroupList groups={data}/>
    if(loading)
        return <>loading...</>;
    return <>Error!={String(error)}</>;
}
