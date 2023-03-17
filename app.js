// Get all elements with the "editable" class
const editableElements = document.querySelectorAll('.editable');

// Add a contenteditable attribute to each editable element
editableElements.forEach(function(element) {
  element.setAttribute('contenteditable', true);
});

// Add a save button
const saveButton = document.createElement('button');
saveButton.textContent = 'Save';
document.body.appendChild(saveButton);

// Save the content when the save button is clicked
saveButton.addEventListener('click', function() {
  // Create an object to store the edited elements
  const editedElements = {};

  // Update the JSON content with the edited elements
  editableElements.forEach(function(element) {
    const id = element.id;
    const content = element.innerHTML;

    editedElements[id] = content;
  });

  const jsonContent = JSON.stringify(editedElements);

  // Update the HTML content with the edited elements
  editableElements.forEach(function(element) {
    const id = element.id;
    const content = editedElements[id];

    element.innerHTML = content;
  });

  // Update the GitHub file with the new content
  const fileContents = btoa(jsonContent); // Convert the JSON to base64
  const apiUrl = 'https://github.com/designerbrett/wrap-cms/content.json'; // Replace with your own details
  const authToken = 'Ge5uQHtLCnp8f3/xJo/Tji4db5v0+f3bqEVrp62IM5o='; // Replace with your own token

  // Get the existing file details from GitHub
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  })
  .then(response => response.json())
  .then(data => {
    const existingFile = data;
    const existingFileContent = atob(existingFile.content); // Convert the base64 content to a string
    const existingFileSha = existingFile.sha;

    // Check if the content has changed
    if (jsonContent !== existingFileContent) {
      // Update the GitHub file with the new content
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update content.json',
          content: fileContents,
          sha: existingFileSha
        })
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      console.log('Content has not changed.');
    }
  })
  .catch(error => {
    console.error(error);
  });
});