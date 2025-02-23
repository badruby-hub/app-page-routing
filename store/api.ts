import { createFetcherStore } from "./fetcher";
import type {Grade, Group, Student, Teacher} from "@prisma/client"
export const $myAccount =  createFetcherStore(['/api/myaccount/']);
export const $groups =  createFetcherStore<Group[]>(['/api/group/']);
export const $students =  createFetcherStore<Student[]>(['/api/student/']);
export const $grades =  createFetcherStore<Grade[]>(['/api/grade/']);
export const $teacher =  createFetcherStore<Teacher[]>(['/api/teacher/']);