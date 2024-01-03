const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const projectKeywords = ["software development", "web applications", "machine learning", "mobile apps"]; // List of predefined keywords

// Function to fetch search results from Google based on a query
const getSearchResults = async(query) => {
    const apiKey = process.env.API_KEY;
    const cx = process.env.CSE_ID;
    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;
    //const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+software+engineering+project+ideas`;

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    };


    try {
        const response = await axios.get(searchUrl, { headers });
        const searchResults = response.data.items.map(item => item.link);
        await randomDelay(3000);
        return searchResults;
        // const $ = cheerio.load(response.data);

        /*const urls = [];
        $('a').each((index, element) => {
            const url = $(element).attr('href');
            if (url && url.startsWith('http')) {
                urls.push(url);
            }
        });*/
        // return urls;
    } catch (error) {
        console.error("Failed to fetch search results: ", error.message);
        return [];
    }
};

// Function to check if text contains project-related keywords
const isProjectIdea = (text) => {
    const projectKeywords = ["project", "idea", "create", "build", "develop"];

    // Check if any of the project keywords are present in the text
    for (const keyword of projectKeywords) {
        if (text.toLowerCase().includes(keyword)) {
            return true;
        }
    }
    return false;
};

// Function to scrape project ideas from a website URL
const scrapeProjectIdeas = async(url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const projectIdeas = [];

        // Find project ideas based on the website's HTML structure
        // Update this based on the specific website's layout
        $('div.project-idea').each((index, element) => {
            projectIdeas.push($(element).text().trim()); // Store project idea in the array
        });
        await randomDelay(3000);
        return projectIdeas;
    } catch (error) {
        console.error("Failed to fetch the webpage:", error.message);
        return [];
    }
};

//function to introduce a random delay between requests
const randomDelay = async(min, max) => {
    const delayDuration = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise((resolve) => setTimeout(resolve, delayDuration));
};

//function to perform the search and scrape process for a specific duration
const performScrapingForDuration = async(durationInSeconds) => {
    const startTime = Date.now();

    while (Date.now() - startTime < durationInSeconds * 1000) {
        const randomKeyword = projectKeywords[Math.floor(Math.random() * projectKeywords.length)];

        console.log(`Searching for project ideas related to '${randomKeyword}'...`);

        const searchResults = await getSearchResults(randomKeyword);

        if (searchResults.length > 0) {
            const firstUrl = searchResults[0];

            console.log(`Searching for project ideas on '${firstUrl}'...`);

            const projectIdeas = await scrapeProjectIdeas(firstUrl);

            if (projectIdeas.length > 0) {
                console.log(`Retrieved Project Ideas from '${firstUrl}':`);
                projectIdeas.forEach((idea, index) => {
                    console.log(`${index + 1}. ${idea}`);
                });
                return; // Stop searching if ideas are found
            } else {
                console.log("No project ideas found on the webpage.");
            }
        } else {
            console.log("No search results found for the randomly chosen keyword.");
        }

        //introduce a random delay between requests
        await randomDelay(1000, 5000);
    }

    console.log(`Search stopped after ${durationInSeconds} seconds. No project ideas found.`);
};

// Main function to initiate scraping process
const main = async() => {
    const randomKeyword = projectKeywords[Math.floor(Math.random() * projectKeywords.length)];

    const searchResults = await getSearchResults(randomKeyword);

    if (searchResults.length > 0) {
        const firstUrl = searchResults[0];

        const projectIdeas = await scrapeProjectIdeas(firstUrl);

        if (projectIdeas.length > 0) {
            console.log("Retrieved Project Ideas:");
            projectIdeas.forEach((idea, index) => {
                console.log(`${index + 1}. ${idea}`);
            });
        } else {
            console.log("No project ideas found on the webpage.");
        }
    } else {
        console.log("No search results found for the randomly chosen keyword.");
    }

    await performScrapingForDuration(120); //perform the scrapping for 2 min
};

// Execute main function
main();

//310265526856-k67u551bsl7kc9dfb5to8md7dc0mcie9.apps.googleusercontent.com client id
