import { ObjTable } from "@/components/ObjTable";
import { config } from "../configs/ArrayTitle";
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { Err } from '../Error/index';
import { useState } from "react";
import { ToDo } from "@prisma/client";
import { AddForm } from "../buttons/Button";
import { Description } from "../buttons/Button";
import classes from "./Todo-swr.module.css";
const
    API_URL = '/api/todo',
    fetcher = async (): Promise<ToDo[]> => {
        console.log("fether");
        const response: Response = await fetch(API_URL);
        if (!response.ok) throw new Error('fetch ' + response.status) as Error;
        return await response.json() as ToDo[];

    },

    infofetcher = async () => {
        console.log("infofetcher",);
        const pr = fetcher();
        toast.promise(pr, {
            loading: 'Загрузка',
            success: 'Авто-обновление',
            error: (err) => `${err.toString()}`,
        });
        return await pr
    },
    columns = config.columns;

export function ToDoSwr() {
    const
        { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, infofetcher, { revalidateOnFocus: false }),
        [addValues, setAddValues] = useState(Array.from({ length: config.columns.length }, () => ''));
    let optimisticData;

    const AddPost = async () => {
        let
            newObj = {
                id: 1,
                text: '',
                checked: false
            };
        config.columns.forEach(({ setVal }, i) => setVal && Object.assign(newObj, setVal(addValues[i])));
        if (data) {
            optimisticData = data.concat(newObj);
        } else {
            optimisticData = [newObj];
        }
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newObj)
        });

        if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
        }
        setAddValues(Array.from({ length: config.columns.length }, () => ''));
        await mutate(fetcher, { optimisticData, revalidate: true });
        toast.success('Дело добавлено');
    }


    const DelPost = async (id: number) => {
        const optimisticData = data?.filter(el => String(el.id) !== String(id));
        const response = await fetch(API_URL + '/' + id, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
        }

        await mutate(fetcher, { optimisticData, revalidate: true });
        toast.success('Дело удалено');
    }
    const CheckPost = async (id: number) => {
        const currentItem = data?.find(el => String(el.id) === String(id));
        if (currentItem) {
            const newCheckedStatus = !currentItem.checked;
            const optimisticData = data?.map(el => el.id === currentItem.id ? { ...el, checked: newCheckedStatus } : el);
            await fetch(API_URL + '/' + id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ checked: newCheckedStatus })
            });
            await mutate(fetcher, { optimisticData, revalidate: true });
            toast.success('Статус обновлен');
        }
    }
    return <>
        <div
            className={classes.loading}>
            {isLoading && '⌛'}
            {isValidating && '👁'}
            {error && `❌ ${error.toString()}`}
        </div>
        <div>
            {data && <ObjTable data={data} config={{ columns: config.columns }}>
                <AddForm columns={config.columns} values={addValues} setValues={setAddValues} addPost={AddPost} />
                <Description data={data} checked={false} config={{ columns: config.columns }} delPost={DelPost} checkPost={CheckPost} />
            </ObjTable>
            }
        </div>
    </>
};

