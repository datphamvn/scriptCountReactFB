function countUniqueCommentsAndGetFacebookIDs() {
    let facebookIDs = new Set(); // To store unique Facebook IDs
    let commentCount = 0;

    // Select all comment elements
    let commentElements = document.querySelectorAll('div[role="article"][aria-label^="Comment by"]');

    commentElements.forEach(commentElement => {
        // Find the link inside the comment
        let link = commentElement.querySelector('a');
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

                // Add the Facebook ID to the set if it's not already present
                if (facebookID && !facebookIDs.has(facebookID)) {
                    facebookIDs.add(facebookID);
                    commentCount++; // Increase comment count for each unique Facebook ID
                }
            }
        }
    });

    return { facebookIDs: Array.from(facebookIDs), commentCount };
}

function exportFacebookIDsToTxt(facebookIDs) {
    // Create a blob from the Facebook IDs array
    const blob = new Blob([facebookIDs.join('\n')], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with a filename
    link.download = 'facebookIDs.txt';

    // Create a URL for the blob and set it as the href attribute
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}

// Call the function and get the results
let result = countUniqueCommentsAndGetFacebookIDs();
console.log("Number of unique comments: ", result.commentCount);
console.log("Facebook IDs: ", result.facebookIDs);

// Export the Facebook IDs to a .txt file
exportFacebookIDsToTxt(result.facebookIDs);