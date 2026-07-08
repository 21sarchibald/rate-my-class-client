export interface UserStore {
    isLoggedIn:boolean,
    user?:{
        name:string
        email:string
        _id:string
    },
    token:string
   }

export interface Registration {
    _id:string
    name:string
    username:string
    password:string
    email:string
    major:string
}

export interface FormErrors {
    email?: string
    username?: string
    name?: string
    major?: string
    password?:string 
    confirmPassword?: string
}