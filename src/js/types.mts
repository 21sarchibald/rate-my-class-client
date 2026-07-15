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

export interface Review {
  userId: string;
  courseCode: string;
  courseName: string;
  professor: string;
  semester: "Winter" | "Spring" | "Summer" | "Fall";
  isBlock: boolean;
  year: number;
  rating: number;
  gradeReceived: "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "F" | "P" | "W";
  difficulty: number;
  type: "online" | "in-person" | "hybrid";
  recommend: boolean;
  description: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  modifiedAt: Date;
}

// Create Review Request schema
export interface CreateReviewRequest {
  courseCode: string;
  courseName: string;
  professor: string;
  semester: "Winter" | "Spring" | "Summer" | "Fall";
  isBlock: boolean;
  year: number;
  rating: number;
  gradeReceived: "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "F" | "P" | "W";
  difficulty: number;
  type: "online" | "in-person" | "hybrid";
  recommend: boolean;
  description: string;
}

// Course schema
export interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewErrors {
  courseCode?: string;
  courseName?: string;
  professor?: string;
  semester?: string;
  isBlock?: string;
  year?: string;
  rating?: string;
  gradeReceived?: string;
  difficulty?: string;
  recommend?: string;
  type?: string;
  description?: string;
}