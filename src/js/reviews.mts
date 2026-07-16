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

export async function updateReview(token: string, id: string, courseCode: string, courseName: string, professor: string, semester: "Winter" | "Spring" | "Summer" | "Fall",
  isBlock: boolean, year: number, rating: number, gradeReceived: "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "F" | "P" | "W",
  difficulty: number, type: "online" | "in-person" | "hybrid", isRecommended: boolean, description: string) {
    try {
        if (!token) {
            throw new Error("No authorization token provided to updateReview");
        }
        const res = await fetch(`${baseURL}reviews/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` },
            body: JSON.stringify({courseCode, courseName, professor, semester, isBlock, year, rating, gradeReceived,
                difficulty, type, isRecommended, description})
            })
            let data;
            try {
                data = await res.json();
            } catch {
                data = null;
            }
            if (!res.ok) {
                const errorMessage = data?.error?.message || data?.message || data?.error || res.statusText || 'Unknown error';
                throw new Error(errorMessage);            }
            return data;
        } catch (error) {
            console.log(`updateReview() caught an error: ${error}`)
            throw error;
        }
}