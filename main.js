import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { printReport } from './reports.js';

async function main() {
    if (argv.length > 3){
        console.log("Too many arguments")
    }

    if (argv.length < 3){
        console.log("Please provide website url")
    }

    const baseURL = argv[2]
    console.log(`Crawler starting: ${baseURL}`)

    const pages = await crawlPage(baseURL, baseURL, {})
    printReport(pages)
  }
  
await main()