export { normalizeURL, getURLsFromHTML, crawlPage, fetchHTML }
import { JSDOM } from 'jsdom'


function normalizeURL(url){
    url = url.replace("https://", "")
    url = url.replace("http://", "")
    while(url.slice(-1) == "/")
        {
            url = url.substring(0, url.length - 1)
        }

    return url.toLowerCase()
}

function getURLsFromHTML(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a')
    const urls = []

    for (const link of links) {
        if(link.host == ""){
            urls.push(new URL(link.href, baseURL).href)
        }
        else{
            urls.push(link.href)
        }
      }

    return urls
}

async function crawlPage(baseURL, currentURL, pages){
        if(new URL(baseURL).hostname !== new URL(currentURL).hostname){
            return pages;
        }
        
        const normalizedURL = normalizeURL(currentURL);
        if (pages[normalizedURL] > 0) {
            pages[normalizedURL]++;
            return pages;
        }

        pages[normalizedURL] = 1;
        console.log(`Crawling ${currentURL}`)
        let htmlContent = ''
        try {
            htmlContent = await fetchHTML(currentURL)
        } catch (err) {
            console.log(`${err.message}`)
            return pages
        }
        
        const urls = getURLsFromHTML(htmlContent, baseURL);
        for(const url of urls){
            pages = await crawlPage(baseURL, url, pages)
        }
        
        return pages
}

async function fetchHTML(url){
    try{
        const response = await fetch(url); 
        if( response.status > 399){
            console.log(`ERROR while fetching: ${url}. Code: ${response.status}. Response: ${await response.text()}`)
            return
        }
        
        const contentType = response.headers.get("content-type") 
        if(!contentType.startsWith("text/html")){
            console.log(`${url} returned unsupported content-type: ${contentType}`)
            return
        }
        
        return await response.text()
    }
    catch (error){
        console.log(`ERROR while fetching: ${url}. Error: ${error}`)
    }
}