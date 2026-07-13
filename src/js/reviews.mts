import type { Review } from "./types.mts";

const baseURL = import.meta.env.PUBLIC_SERVER_URL;

export function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getReviewById(id: string) {
    try {
        const res = await fetch(baseURL + `reviews/${id}`)
        if(!res.ok) {
            throw new Error(`Review not found at id: ${id}, ${res.status}`)
        }

        const review = await convertToJson(res) as Review;
        if(!review || review === null) {
            throw new Error(`Review is undefined or null`);
        }
        console.log("Here is the review:", review);
        return review;
    } catch (error: any) {
        console.log("getReviewById found and error", error);
        return;
    }
}