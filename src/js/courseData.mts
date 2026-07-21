const baseURL = import.meta.env.PUBLIC_SERVER_URL;
import type { Review } from "./types.mts";

function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getCourseById(courseId:string) {
    return await fetch(baseURL + `reviews/course/${courseId}`)
      .then(convertToJson)
      .then((data) => data);
  }

export async function getAllCourses() {
    return await fetch(baseURL + `reviews/course`)
      .then(convertToJson)
      .then((data) => data);
  };

