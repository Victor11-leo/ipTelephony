'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const filterExtension = (data,keyword) => {
    if (! Array.isArray (data)) console.log('Not Array')
    if (keyword.length < 2) return data
    const results = data.filter((f) => {
        if      (f.deptcode.includes(keyword)) return f.deptcode.includes(keyword)
        else if (f.deptname.toLowerCase().includes(keyword.toLowerCase())) return f.deptname.toLowerCase().includes(keyword.toLowerCase())
        else if (f.ownerassigned.toLowerCase().includes(keyword.toLowerCase())) return f.ownerassigned.toLowerCase().includes(keyword.toLowerCase())
        else if (f.cname.toLowerCase().includes(keyword.toLowerCase())) return f.cname.toLowerCase().includes(keyword.toLowerCase())
    })
    return results
}

export const filterDepartments = (data,campus) => {
    if(!Array .isArray (data)) return
    const results = data?.filter((f) => f.cname == campus).map((d) => d.deptname)
    return results
}

export const filterAdmin = (data,keyword) => {
    if (! Array.isArray (data)) console.log('Not Array')
    if (keyword.length < 2) return data
    const results = data.filter((f) => {
        if (f.fname.toLowerCase().includes(keyword.toLowerCase())) return f.fname.toLowerCase().includes(keyword.toLowerCase())
        else if (f.surname.toLowerCase().includes(keyword.toLowerCase())) return f.surname.toLowerCase().includes(keyword.toLowerCase())
        else if (f.adminType.toLowerCase().includes(keyword.toLowerCase())) return f.adminType.toLowerCase().includes(keyword.toLowerCase())
    })
    return results
}
