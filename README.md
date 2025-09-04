## Hi there

I'm Dan,

This is SocialDan, a social media app.

## Technologies

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* Daisy UI
* React Query
* Axios
* Zustand
* Jest.js
* React Icons

## Overview

* The app has login, sign up, home, and search page.
* Login and Sign Up page are used for authentication. The account used to login is admin / admin. 
* Home page shows a list of posts. Use search bar to access Search page.
* Search page also has a post list and filters. There're 2 filters: date (today, yesterday or last 7 days) and comment count (<10 or >=10).
* Each post has title, content, creator info, comment count, etc. But there is no comment to show yet.
* Tap on any post to see post detail. This will shows list of comments.
* You can comment below post details.

## Implementation

### Authentication

Use middleware and cookie to check.

Account:
* Username: admin
* Password: admin

### APIs

* Use Next.js routes for fake APIs
* Fetching with Axios
* Caching with React Query

### Store Management

Use Zustand to manage token, user info and posts.

### Pagination

* Infinite scrolling for post fetching.
* View more comments by hitting load more button.

### UI

Use Tailwind CSS, Daisy UI, and React Icons.

### Responsive

Responsive UI for mobile and desktop.

### Testing

Use Jest.js to test component and middleware.

### Demo

https://github.com/user-attachments/assets/9a0176dc-bb9e-4f2c-9c16-098e23071b21

## How to run?

1. Clone repo
2. npm i
3. npm run test
4. npm run dev
5. Access http://localhost:3000/
6. Checkout the webstie.

## How to test?

1. Sign up an account. Please avoid username as admin and email as admin@gmail.com
2. Login as admin
3. Scroll for more posts
4. Find posts and then, filter them
5. Open any post's comment section
6. Leave a comment
7. View previous comments
8. Logout

## Thank you~
