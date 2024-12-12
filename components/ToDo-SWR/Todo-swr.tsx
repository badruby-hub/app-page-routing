import { ObjTable } from "@/components/ObjTable";
import { config } from "../configs/ArrayTitle";
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { Error } from '../Error/index';
import { useState } from "react";
import classes from "@/components/ToDo-SWR/Todo-swr.module.css";

const 
API_URL = '/api/todo',
DELETE = 'del',
CHECK = 'toggle-checkbox',
ADD ='add',
fetcher = async () => {
    console.log("fether");
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
    
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




function AddForm({columns,values,setValues}) {

    return<>
    <h3 className={classes.zagolovok}>Добавьте дело</h3>
   
    <div className={classes.form}>
         {columns.map(({setVal},i)=> <div key={i}>
            {setVal
                ? <input
                  value={values[i]}
                  onInput={event =>setValues(prev=>prev.with(i,event.target.value))}/>
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
    onClick =async event =>{
        const 
           action = event.target.closest('[data-action]')?.dataset?.action,
           id = +event.target.closest('[data-id]')?.dataset?.id;
           console.log("onClick", {action,id});
           if(!action)return;
           let optimisticData;
           let newObj;
           const 
              getPromise=()=>{
                    switch (action) {
                        case DELETE:
                            if(!id)return;
                            optimisticData = data.filter(el => String(el.id) !== id);
                            return fetch(API_URL + '/' + id, { method: 'DELETE' })
                              .then(res => {
                                if (!res.ok) {
                                  throw (new Error(res.status + ' ' + res.statusText));
                              }
                             });
                        case ADD:
                            newObj = {};
                            config.columns.map(({setVal},i)=>setVal && Object.assign(newObj,setVal(addValues[i])));
                            const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
                            newObj.id = (maxId + 1).toString();
                            newObj.checked = false;
                            optimisticData = data.concat(newObj);
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
                            return fetch(API_URL + '/' + id, {
                                method: 'PATCH',
                                headers:{'Content-Type': 'application/json'},
                                body: JSON.stringify({checked: !data.find(el=> String(id) === String(el.id))?.checked})
                             });
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
                const сheckedStatus = data.find(el => String(el.id) === String(id))?.checked;
                successMessage = сheckedStatus ? 'Статус: В процессе' : 'Статус: Выполнено';
           
            }
            toast.promise(promise,{
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
    {error && <Error error={error} />}
         <div onClick={onClick}>
        {data && <ObjTable data={data} config={{columns}}>
            <AddForm columns={config.columns} values={addValues} setValues={setAddValues}/>
                 </ObjTable>
            }
        </div>

    </>
}