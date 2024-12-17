export function Err({error}: {error: Error}){
    return <div style={{color:'red'}}>
        {error.toString()}
    </div>
}