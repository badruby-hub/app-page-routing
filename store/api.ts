import { createFetcherStore } from "./fetcher";
import type {Group, Student} from "@prisma/client"
export const $myAccount =  createFetcherStore(['/api/myaccount/']);
export const $groups =  createFetcherStore<Group[]>(['/api/group/']);
export const $students =  createFetcherStore<Student[]>(['/api/student/']);