import type { Group } from "@prisma/client"
export function GroupList({groups}:{groups:Group[]}){
    return<>
    <ol>
{groups?.map(group=><li key={group.id}>{group.name}</li>)}
    </ol>
    </>
}