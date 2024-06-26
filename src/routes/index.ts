import * as P from "@/pages/index"




export const Authorized = [
    {
        path: '/admin/dashboard/',
        element: P.LAdminDashboard
    },
    {
        path: 'view-categories',
        element: P.LCategories
    },
    {
        path: 'view-colors',
        element: P.LColors
    },
    {
        path: 'category/:id',
        element: P.LCategoryDetail
    },
    {
        path: 'create-product',
        element: P.LCreateProduct
    },
]


export const Admin = [
    {
        path: '/super-admin/dashboard/',
        element: P.LAdminDashboard
    },
    {
        path: 'users',
        element: P.LUsers
    },
    {
        path: 'user/:id',
        element: P.LUserDetail
    },
]


export const Authenticate = [
    {
        path: '/dashboard',
        element: P.LDashboard
    },
]
export { default as Routing } from "./Routing"