import { memo } from "react";
import classes from "./ObjTable.module.css";


export const  ObjTable = memo (function ObjTable({children}:any){
    console.debug('ToDoList render');
    return <div className={classes.table}> 
        {children}
        <div className={classes.container}>
        </div>
    </div>
});


