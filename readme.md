# FEATURES & User Stories
Sorting Algorithm visualizer, for helping Software Engineering Students understand and nail common algorithms.

MVP Features and User Stories are outlined below, along with some stretch goals/features that we hope to eventually incorporate.

## Features - MVP
- [ ] Merge Sort
- [ ] Generate New Array button
- [ ] Sort button
- [ ] Quick Sort, Heap Sort, Bubble Sort Algorithm Visualizations


## Backlog
- [ ] Sliding scale for changing array size and speed
- [ ] Translation to different languages
- [ ] Darkmode
- [ ] User comments below each Algo sorted by newest
    - [ ] Up/Downvoting like Reddit


<!-- OLD -->
- [ ] Site-wide navigation element
- [ ] Homepage that includes information about the site and link to signup/login.
- [ ] Authentication - sign up with username/email/password, login/logout, demo user login. If user tries to navigate to protected portions of site, will be redirected to login/signup.
- [ ] Landing page that user is directed to upon login that gives overall market snapshot of the day [simulation stretch: portfolio].
<!-- end OLD -->


## User Stories
1. As an unauthorized user, I want to view a home page that provides me with information about the site, and the ability to log in.
    - Acceptance Criteria:
        - [ ] User can visit the `/` path and will be served a homepage/landing page that provides information about the site, a navigation bar & log-in form, and a link to sign-up if necessary.
1. As an unauthorized user, I want to be able to sign up for the website via a signup form in order to access protected content.
    - Acceptance Criteria:
        - [ ] User can visit the `/sign-up` path and will be served a form asking for a name, email, and password.
        - [ ] After user enters valid information for all fields, a new user row is added to the User table, and user is directed to a login page.
        - [ ] If a user enters invalid sign-up information, they receive a message specific to the information that is incorrect.
        - [ ] If a user enters an email that is already in use for another user, they receive a message indicating such, with a link to `/log-in`
        - [ ] Session should last 1 day
        - [ ] Use auth with JWT from Redux example
1. As an unauthorized user, I want to be able to login to the website, via a form, in order to access my private information.
    - Acceptance Criteria
        - [ ] User can visit the `/` path and will be served a form on the homepage requesting email and password, along with link to sign-up page.
        - [ ] After user enters valid login information, the user is redirected back to the homepage at `/`.
        - [ ] Contents of homepage determined by logged in/out state.
        - [ ] After user successfully logs in, a session is created with the necessary cookies/etc.
        - [ ] If a user enters incorrect log-in information, they receive an error message.


## Frontend Routes
- `/` Home/Landing Page (w/login form if user is not logged in)
- `/signup` Signup Page
- `/currencies/${id}}` Currency Detail Page (directed from search)
- `/lists` Watch List Page
- `/explore/${page}` Explore Currencies Page

## Components
Components to be organized as follows:
- Root
    - App
        - NavBar
            - Search
        - Main Component
        - Footer

The following components will render in between `NavBar` and `Footer` for their corresponding pages:
- /
    - Homepage
        - [if not logged in] LoginForm
        - [if logged in] redirects to `/lists`

- /signup
    - SignupForm

- /currencies/${id}}
    - CurrencyDetails
        - CurrencyHeader
        - CurrencyPrices
        - CurrencyMarketChart
        - CurrencyAbout

- /lists
    - [single watchlist implementation (MVP)] List


## State Shape
