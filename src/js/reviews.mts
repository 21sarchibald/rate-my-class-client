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

export async function updateReview(id: string, classCode: string, className: string, professor: string, semester: "Winter" | "Spring" | "Summer" | "Fall",
  isBlock: boolean, year: number, rating: number, gradeReceived: "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "F" | "P" | "W",
  difficulty: number, type: "online" | "in-person" | "hybrid", isRecommended: boolean, description: string) {
    try {
        const res = await fetch(`${baseURL}reviews/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id, classCode, className, professor, semester, isBlock, year, rating, gradeReceived,
                difficulty, type, isRecommended, description})
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error.message);
            }
            return data;
        } catch (error) {
            console.log(`updateReview() caught an error: ${error}`)
        }
}