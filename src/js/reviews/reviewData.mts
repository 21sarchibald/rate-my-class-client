const baseURL = import.meta.env.PUBLIC_SERVER_URL;
import type {CreateReviewRequest, Review} from "../types.mts"
import authSvelte from "../auth.svelte";
function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getReviews(category?:string, identifier?:string) {
  let url = `${baseURL}reviews`;

    if (category && identifier) {
        url += `?${category}=${identifier}`;
    }

    console.log("Fetching:", url);

    const response = await fetch(url);
    return convertToJson(response);
    
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

export async function createReview(review:CreateReviewRequest) {
    const response = await fetch(baseURL + `reviews/create`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${authSvelte.userStore.token}`
         },
        body: JSON.stringify(review)
    })
    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        throw new Error(data.error);
    }
}