import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import classes from "./Button.module.css"


export default function Log() {
  const { data: session } = useSession()
  if (session) {
    return <>
      <div className={classes.sing}>
        <button onClick={() => signOut()}>Выйти</button>
        <div>
          {session.user?.image && <img className={classes.avatar} src={session.user?.image} />}
        </div>
      </div>
    </>
  }
  return <>
    <button className={classes.sing} onClick={() => signIn()}>Войти</button>
  </>
}


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



export function AddForm({ columns, values, setValues, addPost }: AddFormProps & { addPost: () => void }) {
  return (
    <>
      <h3 className={classes.zagolovok}>Добавьте дело</h3>
      <div className={classes.form}>
        {columns.map(({ setVal }, i) => (
          <div key={i}>
            {setVal ? (
              <input
                value={values[i]}
                onInput={event => {
                  const target = event.target as HTMLInputElement;
                  setVal(target.value);
                  setValues(prev => prev.with(i, target.value));
                }}
              />
            ) : ''}
          </div>
        ))}
        <div>
          <button className={classes.btn} data-action="add" onClick={addPost}>Добавить</button>
          <button className={classes.btn} data-action='cancel' onClick={() => setValues(Array.from({ length: columns.length }, () => ''))}>Сброс</button>
        </div>
      </div>
    </>
  );
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


export function Description({ data, config, checked, delPost, checkPost }: DescriptionProps & { delPost: (id: number) => void; checkPost: (id: number) => void; }) {
  const [items, setItems] = useState(data);

  const checkbox = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    checkPost(id)
  };
  return <div className={classes.items}>
    {data.map(obj => <div key={obj.id} className={classes.item}>
      <ul className={classes.content} key={obj.id} data-id={obj.id}>
        {config.columns.map(({ title, content }) =>
          <li className={classes.info} key={title}>
            {content(obj)}
          </li>)}
        <div className={classes.checkbox}>
          <input
            type="checkbox"
            checked={obj.checked}
            onChange={() => checkbox(obj.id)}
            data-action={'toggle-checkbox'} />
          <button data-action={'del'} onClick={() => delPost(obj.id)}>X</button>
          {checked && "🙈"}
        </div>

      </ul> </div>)}
  </div>
}
