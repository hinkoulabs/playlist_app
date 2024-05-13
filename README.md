# Playlist App

## Table of Contents

- [Introduction](#introduction)
- [Initial Setup](#initial-setup)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
    - [Running the Application Locally](#running-the-application-locally)
- [Project Description](#project-description)
- [Local Usage](#local-usage)
- [Testing](#testing)
- [Localization](#localization)

## Introduction

The Playlist App is a playlist management system designed to integrate a variety of front-end libraries
with a Ruby on Rails backend. It provides a responsive user interface that is compatible with both tablets and mobile
phones. The application facilitates complex UI functionalities through its integration of multiple libraries,
demonstrating a sophisticated engineering solution.

## Initial Setup

### Prerequisites

- Ruby version 3.2.2
- Redis server (required for Sidekiq)
- Node.js with npm

### Installation Steps

1. **Install Required Gems**

```bash
bundle install
```

2. **Install NPM Dependencies**

```bash
npm install
```

3. **Database Setup**

```bash
rails db:create
rails db:migrate
```   

### Running the Application Locally

Execute the following command to start the development server along with Sidekiq workers and the Redis server:

```bash
bin/dev
```

## Project Description

This application is built using Ruby on Rails 7.1, esbuild, and SQLite, with a front-end orchestrated through Turbo,
Stimulus, and React.js. This blend allows for rapid UI updates, complex interactions, and scalable structure, ensuring
that the app can handle dynamic content efficiently.

- **Front-end Libraries:**
    - **Turbo:** Enables quick navigation without full page reloads, enhancing the user experience with fast
      interactions.
    - **Stimulus:** Provides a modest JavaScript framework that works seamlessly with HTML, making it easier to manage
      UI interactions.
    - **React.js:** Used for more complex UI components that require state management and dynamic data handling.

- **Database:**
    - **SQLite:** A lightweight database used for local development and testing, ensuring quick setup and minimal
      configuration.

- **Styling:**
    - **Bootstrap 5:** Utilized for responsive and modern UI designs.

The tech specification for this project can be explored in greater detail
here: [Technical Specification](https://gist.github.com/sp2410/d34d7b75e8a3fb1752ab2a14e74bee84).

## Local Usage

1. **Initialize the Application**
    - Start the application using `bin/dev`.
    - Ensure the Redis server and Sidekiq workers are running.

2. **Load Videos**
    - Go to `http://localhost:3000/setting`, check data source is set properly and click button `Fetch Videos`.

   The application will add jobs to fetch videos from the data source using sidekiq workers.
   Each page is processing async (please use button `http://localhost:3000/fetch_requests` to get status of all fetch
   requests)

3. **View Videos**
    - Go to `http://localhost:3000/` to get access to loaded videos

   The page is build using React Component.
   Videos are loaded from application server (please make sure you has already fetched records on step **Load Videos**
   otherwise videos will be missing)

   Users are able to do the following actions:

    - view videos (frontend is built to load videos using endless pagination)
    - search videos by title
    - select videos (please active select mode on top left corner on view) and add selected videos to new or existing
      playlist

   4. **Manage Playlists**
       - Go to `http://localhost:3000/playlists` to get access to playlists.

   The management is built using rails + turbo except playlist show page that is implemented using react.js. 
   Playlist show page has complex functionality that's why it's need to use react.

   Users are able to do the following actions on playlist show page:

   - view playlist videos (frontend is built to load videos using endless pagination)
   - search videos by title
   - select videos (please active select mode on top left corner on view) and remove selected videos from the playlist
   - reorder videos (please active reorder mode on top right corner on view), reorder videos using drag and drop and click
     button save to save the changes

## Testing

The application includes test suites for both models and controllers to ensure functionality and
reliability. Please use command tu run tests:

```bash
rails test
```

## Localization

The application supports internationalization (I18n) and set for `en` locale:

- **Backend Localization:** Update translations in the `config/locales` directory.
- **Frontend Localization:** Modify the `app/javascript/translation.json` file to adjust text displayed on the frontend.

Developers can add or update existing translations by modifying these files, ensuring that the app meets regional needs
and preferences.