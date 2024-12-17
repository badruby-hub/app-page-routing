import { ObjTable } from "@/components/ObjTable";
import { config } from "../configs/ArrayTitle";
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { Err } from '../Error/index';
import { MouseEventHandler, useState } from "react";
import classes from "@/components/ToDo-SWR/Todo-swr.module.css";
import { ToDo } from "@prisma/client";

const 
API_URL = '/api/todo',
DELETE = 'del',
CHECK = 'toggle-checkbox',
ADD ='add',
fetcher = async ():Promise<ToDo[]> => {
    console.log("fether");
    const response : Response = await fetch(API_URL);
    if (!response.ok) throw new Error('fetch ' + response.status) as Error;
    return await response.json() as ToDo[];
    
},

infofetcher = async()=>{
    console.log("infofetcher",);
    const pr = fetcher();
    toast.promise(pr,{
        loading:'Загрузка',
        success:'Авто-обновление',
        error: (err) => `${err.toString()}`,
    });
    return await pr
},
columns = config.columns;

interface Column {
    title: string;
    content: (props: { text: string }) => string;
    setVal: (text: string) => { text: string; };
}

interface AddFormProps {
    columns: Column[];
    values: string[];
    setValues: React.Dispatch<React.SetStateAction<string[]>>;
}



function AddForm({columns,values,setValues}:AddFormProps) {
   
    return<>
    <h3 className={classes.zagolovok}>Добавьте дело</h3>
   
    <div className={classes.form}>
         {columns.map(({setVal},i)=> <div key={i}>
            {setVal
                ? <input
                  value={values[i]}
                  onInput={event =>{
                    const target = event.target as HTMLInputElement; 
                    setVal(target.value);
                    setValues(prev=>prev.with(i,target.value))}}/>
                : ''}
                </div>
         )}
        <div>
            <button className={classes.btn} data-action={ADD}>Добавить</button>
            <button className={classes.btn} data-action='cancel' onClick={()=>setValues(Array.from({length: columns.length},()=>''))}>Сброс</button>

        </div>
    </div>
    </> 
}

export  function ToDoSwr(){
    const 
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, infofetcher,{revalidateOnFocus:false}),
    [addValues,setAddValues]= useState(Array.from({length: config.columns.length},()=>'')),
    onClick: MouseEventHandler =async event =>{
        const
           target = event.target as HTMLElement,
           action = (target.closest('[data-action]') as HTMLElement)?.dataset?.action,
           id = (target.closest('[data-id]') as HTMLElement)?.dataset?.id;
           console.log("onClick", {action,id});
           if(!action)return;
           let optimisticData: ToDo[]|undefined;
           let newObj: ToDo;
           const 
              getPromise=()=>{
                    switch (action) {
                        case DELETE:
                            if(!id)return;
                            optimisticData = data?.filter(el => String(el.id) !== id);
                            return fetch(API_URL + '/' + id, { method: 'DELETE' })
                              .then(res => {
                                if (!res.ok) {
                                  throw (new Error(res.status + ' ' + res.statusText));
                              }
                             });
                        case ADD:
                            newObj = {
                                id: 1,
                                text:'',
                                checked: false
                            };
                            config.columns.map(({setVal},i)=>setVal && Object.assign(newObj,setVal(addValues[i])));
                            if(data){
                            optimisticData = data.concat(newObj);
                            }else{
                                optimisticData = [newObj];
                            }
                            return fetch(API_URL, {
                                 method: 'POST',
                                  headers:{'Content-Type': 'application/json'},
                                  body: JSON.stringify(newObj)
                             }).then(res => {
                              if (!res.ok) {
                                throw (new Error(res.status + ' ' + res.statusText));
                              }
                              setAddValues(Array.from({ length: config.columns.length }, () => ''));
                          });
                          case CHECK:
                            if (data) {
                                const currentItem = data.find(el => String(el.id) === String(id));
                                if (currentItem) {
                                    const newCheckedStatus = !currentItem.checked;
                                    optimisticData = data.map(el => el.id === currentItem.id ? { ...el, checked: newCheckedStatus } : el);
                                    return fetch(API_URL + '/' + id, {
                                        method: 'PATCH',
                                        headers:{'Content-Type': 'application/json'},
                                        body: JSON.stringify({checked: !data.find(el=> String(id) === String(el.id))?.checked})
                                     });
                                } else {
                                    console.error("Item not found");
                                }
                            } else {
                                console.error("Data is undefined");
                            }
                            
                        
                        }
                       
                    },
              promise = getPromise();

           if(promise){
            let successMessage = '';
            if (action === ADD) {
                successMessage = 'Дело добавлено';
            } else if (action === DELETE) {
                successMessage = 'Дело удалено';
            } else if (action === CHECK) {
                if (data) { 
                    const checkedStatus = data.find(el => String(el.id) === String(id))?.checked;
                    successMessage = checkedStatus ? 'Статус: В процессе' : 'Статус: Выполнено';
                } else {
                    console.error("Data is undefined");
                    successMessage = 'Не удалось получить статус';
                }
            }
            toast.promise(promise as Promise<void>,{
                loading: "Загрузка: " + action,
                success: successMessage,
                error: (err) => `${err.toString()}`,
            });
            await mutate(promise.then( ()=> optimisticData, fetcher), {optimisticData, revalidate:true});
           }
    };
    return <>
    <div style={{  top:'4rem',left:'35rem', position: 'absolute', fontSize: 'xxx-large' }}>
      {isLoading && '⌛'}
      {isValidating && '👁'}
    </div>
    {error && <Err error={error} />}
         <div onClick={onClick}>
        {data && <ObjTable data={data} config={{columns}}>
            <AddForm columns={config.columns} values={addValues} setValues={setAddValues}/>
                 </ObjTable>
            }
        </div>

    </>
}