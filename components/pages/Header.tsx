import Link from "next/link";
import classes from "@/components/pages/Header.module.css";

const 
   pages = [
    {href:'/', title: 'home'},
    {href:'/ToDo', title:'ToDo-list'},
    {href:'/login-btn', title:'Sing in'},
   ];

export function Header(){
    return <header>
<nav className={classes.navigation}>
    <ul className={classes.block}>
    {pages.map(({href,title})=> <li className={classes.page} key={href}>
        <Link href={href}>{title}</Link>
    </li>)}
    </ul>
</nav>
    </header>
}