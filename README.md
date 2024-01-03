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
   
### Fetching Search Results
The `getSearchResults` function uses Axios to make HTTP requests to Google's Custom Search API, retrieving links based on predefined keywords.
```
The `getSearchResults` function is responsible for querying Google's Custom Search API to fetch search results based on predefined keywords. This function uses the Axios library to make an HTTP GET request to the API endpoint constructed with the specified query parameters.

const getSearchResults = async (query) => {
    const apiKey = process.env.API_KEY;
    const cx = process.env.CSE_ID;
    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;

    try {
        const response = await axios.get(searchUrl);
        const searchResults = response.data.items.map(item => item.link);
        return searchResults;
    } catch (error) {
        console.error("Failed to fetch search results: ", error.message);
        return [];
    }
};

```
 **Functionality:**
- Constructs the search query URL using the provided API key and Custom Search Engine ID (CSE ID).
- Performs an HTTP GET request to the GOogle Custom Search API endpoint.
- Retrieves search results and extracts the links from the response data.

### Scraping Project Ideas
The `scraperProjectIdeas` function utilizes Cheerio for HTML parsing and extracts project ideas from specific websites' content.
```
The `scrapeProjectIdeas` function scrapes project ideas from the content of fetched web pages. It utilizes Axios to make an HTTP GET request to the specified URL and Cheerio for parsing HTML content and extracting project ideas.

const scrapeProjectIdeas = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const projectIdeas = [];
        
        // Extracts project ideas based on the website's HTML structure
        $('div.project-idea').each((index, element) => {
            projectIdeas.push($(element).text().trim());
        });

        return projectIdeas;
    } catch (error) {
        console.error("Failed to fetch the webpage:", error.message);
    }
};

```
**Functionality:**
- Performs an HTTP GET request to the specified URL.
- Loads the HTML content using Cheerio to manipulate and traverse the DOM.
- Extracts project ideas by targeting specific HTML elements (e.g., <div class="project-idea">) and retrieving their text content.

### Random Delays
The code implements delays between requests to avoid rate limiting and simulate human-like browsing behavior.
```
The `randomDelay` function introduces random delays between requests to prevent rate limiting. It helps mimic human-like browsing behavior by pausing execution for a random duration within a specified range.

const randomDelay = async (min, max) => {
    const delayDuration = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise((resolve) => setTimeout(resolve, delayDuration));
};

```
**Functionality:**
- Generates a random delay duration between min and max values.
- Pauses the execution of code for the generated duration using setTimeout.


## Workflow

### Project Functionality

**Project Functionality**
- getSearchResults: Fetches search results from Google based on predefined keywords.
- scrapeProjectIdeas: Extracts project ideas from the fetched web pages.
- Random Delays: Implements delays between requests to avoid rate limiting.

## Flow Diagram
```
                                                                                                
                       +---------------+   Random Keyword   +---------------+                   
                       |  getSearch    | ------------------> |  scrapeProject |                   
                       |  Results      |                     |    Ideas      |                   
                       +---------------+                     +---------------+                   
                              |                                     |                              
                              v                                     |                              
                +------------------------+                           |                              
                | Search for keywords,  |                           |                              
                | fetch Google results, |                           |                              
                | and extract links     |                           |                              
                +------------------------+                           |                              
                              |                                     |                              
                              v                                     |                              
                       +----------------------+                      |                              
                       | Retrieve web content |                      |                              
                       | and extract project  |                      |                              
                       | ideas from websites  |                      |                              
                       +----------------------+                      |                              
                              |                                     |                              
                              v                                     |                              
                       +----------------------+                      |                              
                       | Display found ideas  |                      |                              
                       +----------------------+                      |                              
                              |                                     |                              
                              v                                     |                              
                                                                     

```

## Contributions
Feel free to contribute by opening issues or creating pull requests. Contributions that enhance functionality, add new features, or improve documentation are welcome!

## Project Details

**Objective**

The objective of this web scraper project is to gather project ideas related to software development, machine learning, web applications, and mobile apps from various websites. It aims to automate the process of searching for project ideas by querying search engines, navigating to relevant web pages, and extracting project-related content.

**Technical Aspects**

The project utilizes Node.js along with Axios for handling HTTP requests and Cheerio for HTML parsing. It interacts with the Google Custom Search API to obtain search results and extracts project ideas by scraping content from fetched web pages. The scraper incorporates random delays between requests to prevent rate limiting and mimic human browsing behavior.

**Challenges Faced**

- Searching Limitation: Dealing with the bot going for random unnecessary websites and generating
  garbage values.
  
- Rate Limiting: Dealing with rate limiting from search engines and websites was a significant challenge. Introducing random delays helped mitigate this issue.

- HTML Structure Variability: Websites have different HTML structures, making it challenging to consistently extract project ideas. Customizing the scraping logic for each website was necessary.

- Handling Errors: Managing various types of errors, such as HTTP request failures or incorrect HTML structures, required robust error handling mechanisms.

**Fixed Issues**

- Searching limitation Avoidance: Implementing Google Custom Search Engine provided better and
bigger searching areas.
- Rate Limiting Avoidance: Implementing random delays between requests significantly helped in avoiding rate limiting while scraping.
- Adaptability: Adapting the scraper to handle different website layouts improved its reliability and robustness.
- Error Handling: Enhancing error handling and logging mechanisms allowed for better troubleshooting and debugging during development.

**Some websites have countermeasures and still block automated access from bots. The limitation of
the bot is not able to access those websites.**
