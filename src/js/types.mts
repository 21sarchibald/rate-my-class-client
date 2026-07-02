export interface UserStore {
    isLoggedIn:boolean,
    user?:{
        name:string
        email:string
        _id:string
    },
    token:string
   }