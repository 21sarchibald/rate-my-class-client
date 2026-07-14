const baseURL = import.meta.env.PUBLIC_SERVER_URL;
import type {Review} from "../types.mts"
function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getReviews(category:string, identifier:string) {
  return await fetch(baseURL + `reviews?${category}=${identifier}`)
    .then(convertToJson)
    .then((data) => data);
}

// export async function getReviewById(id:string) {
//   const response = await fetch(baseURL + `reviews/${id}`);
//   const review = await convertToJson(response) as Review;
//   console.log(review)
//   return review;
// }

export async function searchReviews(query:string) {
  const response = await fetch(baseURL + `reviews?search=${query}`);
  console.log("response", response);
  const reviews = await convertToJson(response) as Review[];
  console.log(reviews);
  return reviews;
}