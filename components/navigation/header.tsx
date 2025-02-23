import Link from "next/link";
import classes from "@/components/header.module.css";
import { ReactNode } from "react";


const 
   pages = [
    {href:'/', title: 'app-router'},
    {href:'/pages-router', title:'Pages-router'},
    {href:'/group-list', title:'Group list (app)'},
    {href:'/pages-router/group-list', title:'Group list (pages)'},
    {href:'/pages-router/student-list', title:'Student list (pages)'},
    {href:'/account', title:'My Account(app)'},
    {href:'/pages-router/account', title:'My Account(page)'},
    {href:'/grades', title:'Grade'},
   ];

export function Navigation({children = null }:{children:ReactNode | undefined}){
    return <header className={classes.head}>
    <nav className={classes.navigation}>
        <ul className={classes.block}>
        {pages.map(({href,title})=> <li className={classes.page} key={href}>
            <Link href={href}>{title}</Link>
        </li>)}
        </ul>
        {children}
    </nav>
        </header>
 }