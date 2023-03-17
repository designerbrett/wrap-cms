      // Get all elements with the "contenteditable" attribute
      const editableElements = document.querySelectorAll('[contenteditable]');

      // Create an object to store the HTML content and corresponding element IDs
      const content = {};
      editableElements.forEach(element => {
        content[element.id] = element.innerHTML;
      });

      // Convert the content object to JSON
      const jsonContent = JSON.stringify(content);

      // Save the JSON content to a file
      const file = new Blob([jsonContent], {type: 'application/json'});
      const fileName = 'content.json';
      const fileUrl = URL.createObjectURL(file);
      const fileLink = document.createElement('a');
      fileLink.href = fileUrl;
      fileLink.download = fileName;
      fileLink.click();

      // Update the GitHub file with the new content
      const fileContents = btoa(jsonContent); // Convert the JSON to base64
      const apiUrl = 'https://github.com/designerbrett/wrap-cms/blob/main/content.json'; // Replace with your own details
      const authToken = 'Ge5uQHtLCnp8f3/xJo/Tji4db5v0+f3bqEVrp62IM5o='; // Replace with your own token

      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update content.json',
          content: fileContents,
          sha: '<file sha>' // Replace with the sha of the existing file
        })
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });