<script lang="ts">
    import type { Review } from "../js/types.mts";

    interface Props {
      review: Review;
    }

    let { review }: Props = $props();

</script>

<div class="review-card">
    <!-- <label for="courseName">Course Name:</label>
    <p id="courseName">{review.courseName}</p>
    <label for="courseCode">Course Code:</label>
    <p id="courseCode">{review.courseCode}</p> -->
    <h2>{`${review.courseName} (${review.courseCode})`}</h2>
    <div class="review-detail">
    <label for="rating">Rating:</label>
    <p id="rating">{review.rating}</p>
</div>
    
    <div class="review-detail">
    <label for="difficulty">Difficulty:</label>
    <p id="difficulty">{review.difficulty}</p>
</div>

    <div class="review-detail">
    <label for="recommmend">Would Recommend:</label>
    <p id="recommend">{review.recommend ? "Yes" : "No"}</p>
</div>

    <div class="review-detail">
    <label for="professor">Professor:</label>
    <p id="professor">{review.professor}</p>
</div>

    <div class="review-detail">
    <label for="semester">Semester:</label>
    <p id="semester">{review.semester}</p>
</div>

    <div class="review-detail">
    <label for="year">Year:</label>
    <p id="year">{review.year}</p>
</div>

    <div class="review-detail">
    <label for="courseType">Course Type:</label>
    <p id="courseType">{review.type}</p>
</div>

    <div class="review-detail">
    <label for="description">Review:</label>
    <p id="description">{review.description}</p>
</div>

    <div class="review-detail">
    <label for="gradeReceived">Grade Received:</label>
    <p id="gradeReceived">{review.gradeReceived}</p>
</div>

    <div class="review-detail">
    <label for="likes">Likes:</label>
    <p id="likes">{review.likes}</p>
</div>

    <div class="review-detail">
    <label for="dislikes">Dislikes:</label>
    <p id="dislikes">{review.dislikes}</p>
</div>

    <div class="review-detail">
        <label for="date">Date:</label>
        <p id="date">{review.createdAt}</p>
    </div>
</div>

<style>
    .review-card {
      /* display: flex;
      flex-direction: column; */
      
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      max-width: 700px;
      margin: 2rem auto;
      padding: 1.5rem;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    label {
      display: flex;
      flex-direction: row;
      font-weight: bold;
    }
    p {
      margin-left: 0.5rem;
      font-size: 1rem;
      display: block;
    }
    h2 {
        grid-column: 1/3;
    }
    .review-detail {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

  </style>