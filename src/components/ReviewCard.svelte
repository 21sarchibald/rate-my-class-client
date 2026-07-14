<script lang="ts">
    import type { Review } from "../js/types.mts";

    interface Props {
      review: Review;
    }

    let { review }: Props = $props();

</script>

<div class="review-card">
    <label for="courseName">Course Name:</label>
    <p id="courseName">{review.courseName}</p>
    <label for="courseCode">Course Code:</label>
    <p id="courseCode">{review.courseCode}</p>
    <label for="rating">Rating:</label>
    <p id="rating">{review.rating}</p>
    <label for="difficulty">Difficulty:</label>
    <p id="difficulty">{review.difficulty}</p>
    <label for="recommmend">Would Recommend:</label>
    <p id="recommend">{review.recommend ? "Yes" : "No"}</p>
    <label for="professor">Professor:</label>
    <p id="professor">{review.professor}</p>
    <label for="semester">Semester:</label>
    <p id="semester">{review.semester}</p>
    <label for="year">Year:</label>
    <p id="year">{review.year}</p>
    <label for="courseType">Course Type:</label>
    <p id="courseType">{review.type}</p>
    <label for="description">Review:</label>
    <p id="description">{review.description}</p>
    <label for="gradeReceived">Grade Received:</label>
    <p id="gradeReceived">{review.gradeReceived}</p>
    <label for="likes">Likes:</label>
    <p id="likes">{review.likes}</p>
    <label for="dislikes">Dislikes:</label>
    <p id="dislikes">{review.dislikes}</p>
    <label for="date">Date:</label>
    <p id="date">{review.createdAt}</p>
</div>

<style>
    .review-card {
        border: black solid;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    p {
        display: inline;
    }
    label {
        display: block;
    }
</style>