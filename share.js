function getFacebookIDsAndCaptionsWithThreeHashes() {
    let facebookIDs = [];
    let captions = [];
    let countCaptionsWithThreeHashes = 0;
    let uniqueFacebookIDs = new Set();

    let elements = document.querySelectorAll('.x78zum5.x1n2onr6.xh8yej3');

    elements.forEach(element => {
        // Get the href attribute of the <a> tag inside the element
        let link = element.querySelector('a');
        let facebookID;

        if (link) {
            let href = link.getAttribute('href');
            if (href) {
                // Create a URL object from the href
                let url = new URL(href);

                // Check if the pathname indicates a numeric ID or a nickname
                if (url.pathname === '/profile.php') {
                    // Get the numeric ID from the search parameters
                    facebookID = url.searchParams.get('id');
                } else {
                    // Get the nickname from the pathname
                    facebookID = url.pathname.split('/')[1];
                }
            }
        }

        // Get the caption text from divs with style text-align: start
        let captionDivs = element.querySelectorAll('div[dir="auto"][style="text-align: start;"]');
        captionDivs.forEach(captionDiv => {
            let captionText = captionDiv.textContent.trim();
            if (captionText) {
                // Check if the caption contains exactly three '#' characters
                let hashCount = (captionDiv.innerHTML.match(/#/g) || []).length;
                if (hashCount === 3 && facebookID && !uniqueFacebookIDs.has(facebookID)) {
                    facebookIDs.push(facebookID);
                    captions.push(captionText);
                    countCaptionsWithThreeHashes++;
                    uniqueFacebookIDs.add(facebookID);  // Ensure this Facebook ID is only counted once
                }
            }
        });
    });

    // Create a Blob from the facebookIDs array
    let blob = new Blob([facebookIDs.join('\n')], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);

    // Create a link element
    let link = document.createElement('a');
    link.href = url;
    link.download = 'facebookIDs.txt';

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    // Return the list of Facebook IDs, captions, and count of captions with three hashes
    return { facebookIDs, captions, countCaptionsWithThreeHashes };
}

// Call the function and log the results
let result = getFacebookIDsAndCaptionsWithThreeHashes();
console.log(result);
console.log("Facebook IDs: ", result.facebookIDs);
console.log("Captions: ", result.captions);
console.log("Number of captions with exactly three '#' characters: " + result.countCaptionsWithThreeHashes);