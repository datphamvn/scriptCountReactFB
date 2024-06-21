// JavaScript code to count elements with specific text and extract Facebook IDs
const extractFacebookIDsAndCountTypes = () => {
    // Select all elements matching the specified structure
    const elements = document.querySelectorAll('div[data-visualcompletion="ignore-dynamic"]');
  
    // Initialize counters for each type
    let inviteCount = 0;
    let invitedCount = 0;
    let followingCount = 0;
  
    // Initialize an array to store Facebook IDs
    const facebookIDs = [];
  
    // Iterate through elements and count each type
    elements.forEach(element => {
      const text = element.textContent || element.innerText;
      let counterIncreased = false;
  
      if (text.includes("Invite")) {
        inviteCount++;
      }
      if (text.includes("Invited")) {
        invitedCount++;
      }
      if (text.includes("Following")) {
        followingCount++;
        counterIncreased = true;
      }
  
      if (counterIncreased) {
        const linkElement = element.querySelector('a[href*="facebook.com"]');
        if (linkElement) {
          const href = linkElement.getAttribute('href');
          const url = new URL(href);
          let facebookID;
  
          if (url.pathname === '/profile.php') {
            facebookID = url.searchParams.get('id');
          } else {
            facebookID = url.pathname.split('/')[1];
          }
  
          facebookIDs.push(facebookID);
        }
      }
    });
  
    // Log the count of each type to the console
    console.log(`Invite: ${inviteCount}`);
    console.log(`Invited: ${invitedCount}`);
    console.log(`Following: ${followingCount}`);
  
    // Log the extracted Facebook IDs to the console
    console.log(facebookIDs);
  
    // Function to download Facebook IDs as a .txt file
    downloadAsTxt(facebookIDs, 'facebookIDs.txt');
  }
  
  // Function to download an array of strings as a .txt file
  const downloadAsTxt = (data, filename) => {
    const blob = new Blob([data.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Call the function
  extractFacebookIDsAndCountTypes();