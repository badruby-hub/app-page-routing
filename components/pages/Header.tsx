import Link from "next/link";
import classes from "@/components/pages/Header.module.css";
import Log from "../buttons/Button";


const 
   pages = [
    {href:'/', title: 'home'},
    {href:'/ToDo', title:'ToDo-list'},
   ];

export function Header(){
    return <header className={classes.head}>
<nav className={classes.navigation}>
    <ul className={classes.block}>
    {pages.map(({href,title})=> <li className={classes.page} key={href}>
        <Link href={href}>{title}</Link>
    </li>)}
    </ul>
</nav>
<Log/>
    </header>
}