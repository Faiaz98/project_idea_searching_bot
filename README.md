# Web Scraping Project: Project Idea Searching Bot

## Overview

This project involves a web scraper built using Node.js to extract project ideas related to predefined keywords from various websites. The scraper fetches search results from Google, extracts links, navigates to these links, and scrapes project ideas from the website content. The aim is to compile a list of project ideas useful for software development, machine learning, web applications, and mobile apps.

## Requirements

- Node.js installed
- API key for Google Custom Search API
- Environment variables for API key and Custom Search Engine ID (CSE ID)

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Faiaz98/project_idea_searching_bot.git
    ```

2. **Install dependencies:**

    ```bash
    cd project
    npm install
    ```

3. **Create a `.env` file and add your API key and CSE ID:**

    ```plaintext
    API_KEY=your_api_key
    CSE_ID=your_custom_search_engine_id
    ```

## Usage

Run the scraper:

```bash
node scraper.js
```
## How it Works
The `scraper.js` file functions as follows:
   
