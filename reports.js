export { printReport }

function printReport(pages){
    console.log("Printing report...")

    var items = Object.keys(pages).map(function(key) {
        return [key, pages[key]];
      });
      
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    for(const item of items){
        console.log(`Found ${item[1]} internal links to ${item[0]}`)
    }
}