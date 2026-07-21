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

export async function getReviews(category?:string, identifier?:string) {
  let url = `${baseURL}reviews`;

    if (category && identifier) {
        url += `?${category}=${encodeURIComponent(identifier)}`;
    }

    console.log("Fetching:", url);

    const response = await fetch(url);
    return convertToJson(response);
    
}

export async function getReviewCountForCourse(courseCode: string) {
    const data = await getReviews("courseCode", courseCode)
    return data.length

}

export async function getClassRating(courseCode: string) {
    let totalRating = 0;
    const data = await getReviews("courseCode", courseCode)
    const numRatings = data.length;
    for (const d of data) {
      const rating = d.rating;
      totalRating += rating 
    }
    if (!numRatings) {
      totalRating = 0;
    } else {
      totalRating /= numRatings;
    }
    return totalRating;
}

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

