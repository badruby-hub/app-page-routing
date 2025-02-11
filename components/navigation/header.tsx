import Link from "next/link";
import classes from "@/components/header.module.css";


const 
   pages = [
    {href:'/', title: 'app-router'},
    {href:'/pages-router', title:'Pages-router'},
    {href:'/custom-page', title:'Custom-router'},
   ];

export function Navigation(){
    return <header className={classes.head}>
    <nav className={classes.navigation}>
        <ul className={classes.block}>
        {pages.map(({href,title})=> <li className={classes.page} key={href}>
            <Link href={href}>{title}</Link>
        </li>)}
        </ul>
    </nav>
        </header>
 }