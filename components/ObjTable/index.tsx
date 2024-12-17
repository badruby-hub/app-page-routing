import { useState, memo } from "react";
import classes from "./ObjTable.module.css";

interface Column {
    title: string;
    content: (obj: any) => JSX.Element; // Уточните тип, если возможно
}

interface Config {
    columns: Column[];
}

interface Item {
    id: number;
    text: string;
    checked: boolean;
}

interface DescriptionProps {
    data: Item[];
    config: Config;
    checked: boolean;
}

export const  ObjTable = memo (function ObjTable({ data,config,children}:any){
    console.debug('ToDoList render');
    return <div className={classes.table}> 
        {children}
        <div className={classes.container}>
        <Description data={data} checked={false}  config={config}/>
        </div>
    </div>
});


function Description({data,config,checked}:DescriptionProps) {
    const [items, setItems] = useState(data);

    const checkbox = (id:number) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };
    return <div className={classes.items}>
    {data.map(obj => <div key={obj.id} className={classes.item}>
       <ul className={classes.content} key={obj.id} data-id={obj.id}>
        {config.columns.map(({title,content})=>
        <li className={classes.info} key={title}>
             {content(obj)}
        </li>)}
        <div className={classes.checkbox}>
            <input 
             type="checkbox" 
             checked={obj.checked} 
             onChange={() => checkbox(obj.id)}
             data-action={'toggle-checkbox'}/>
            <button data-action={'del'}>X</button>
            {checked && "🙈"}
            </div>
            
    </ul> </div>)}
  </div>
}