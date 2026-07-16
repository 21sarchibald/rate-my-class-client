const baseURL = import.meta.env.PUBLIC_SERVER_URL;
import type {CreateReviewRequest, Review, SearchResults} from "../types.mts"
import authSvelte from "../auth.svelte";
function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getReviews(category:string, identifier:string) {
  return await fetch(baseURL + `reviews?${category}=${encodeURIComponent(identifier)}`)
    .then(convertToJson)
    .then((data) => data);
}

// export async function getReviewById(id:string) {
//   const response = await fetch(baseURL + `reviews/${id}`);
//   const review = await convertToJson(response) as Review;
//   console.log(review)
//   return review;
// }

export async function searchReviews(query:string): Promise<SearchResults> {
  const response = await fetch(baseURL + `reviews/search?query=${encodeURIComponent(query)}`);
  console.log("response", response);
  const results = await convertToJson(response) as SearchResults;
  console.log(results);
  return results;
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