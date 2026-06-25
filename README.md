# Rate My Class

## Project Description

Rate My Class is a web application where students can post reviews and ratings of CSE and WDD classes offered at BYU-Idaho.

Users can:

* Create an account
* Log in to their account
* Post reviews and ratings for classes
* Update their own reviews
* Delete their own reviews
* Search for reviews by class

## Team Members

* Sophie Archibald
* Ami Halsey
* Ruby Larson

## Setup and Installation Instructions

### Prerequisites

* Node.js
* npm
* MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd rate-my-class
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Configure environment variables:

   * Create a `.env` file in the project root.
   * Add the required configuration values.

5. Start the development server:

   ```bash
   pnpm run dev
   ```

6. Open the application in your browser.

   

```sh
pnpm create astro@latest -- --template minimal
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |


## API Documentation

### Authentication

#### Register User

* **POST** `/api/auth/register`
* Creates a new user account.

#### Login User

* **POST** `/api/auth/login`
* Authenticates a user and starts a session.

### Reviews

#### Get Reviews by Class

* **GET** `/api/reviews/:classId`
* Returns all reviews for a specific class.

#### Create Review

* **POST** `/api/reviews`
* Creates a new class review.

#### Update Review

* **PUT** `/api/reviews/:reviewId`
* Updates an existing review.

#### Delete Review

* **DELETE** `/api/reviews/:reviewId`
* Deletes a review owned by the current user.

### Classes

#### Search Classes

* **GET** `/api/classes/search?q=<search-term>`
* Searches for classes by name or course code.

## Known Issues

* Limited search filtering options.
* No professor-specific reviews currently available.
* User profile customization has not been implemented.

## Future Improvements

* Add professor ratings and reviews.
* Implement review upvoting and helpfulness scores.
* Add advanced search and filtering.
* Create user profile pages.
* Add review moderation tools.
* Support notifications for new reviews.
* Improve mobile responsiveness and accessibility.
