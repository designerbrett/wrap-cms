// Get the current UID count from local storage
let uidCount = parseInt(localStorage.getItem('uidCount')) || 0;

// Increment the UID count and generate a new UID
const newUid = ++uidCount;

// Save the new UID count to local storage
localStorage.setItem('uidCount', uidCount);

// Add the new UID as a class with a prefix of "wrapcms-pageid-"
document.body.classList.add(`wrapcms-pageid-${newUid}`);

// Get the current page's URL path
const path = location.pathname;

// Extract the file name from the URL path
const fileName = path.substring(path.lastIndexOf('/') + 1);

// Add the file name as a body class
document.body.classList.add(fileName);

// Select the wrap-header element
var wrapHeader = document.querySelector('wrap-header');

// Load the custom header HTML from a separate file
var headerXhr = new XMLHttpRequest();
headerXhr.open('GET', '/header.html', true);
headerXhr.onreadystatechange = function() {
  if (headerXhr.readyState === 4 && headerXhr.status === 200) {
    // Set the innerHTML of the wrap-header element to the loaded HTML
    wrapHeader.innerHTML = headerXhr.responseText;
  }
};
headerXhr.send();

// Select the wrap-footer element
var wrapFooter = document.querySelector('wrap-footer');

// Load the custom footer HTML from a separate file
var footerXhr = new XMLHttpRequest();
footerXhr.open('GET', '/footer.html', true);
footerXhr.onreadystatechange = function() {
  if (footerXhr.readyState === 4 && footerXhr.status === 200) {
    // Set the innerHTML of the wrap-footer element to the loaded HTML
    wrapFooter.innerHTML = footerXhr.responseText;
  }
};
footerXhr.send();


var editButton = document.getElementById('edit-button');
editButton.addEventListener('click', function(event) {
  event.preventDefault();

  // Show the edit modal
  var editModal = document.getElementById('edit-modal');
  editModal.style.display = 'block';
});

// Find all wrapcms elements and display their editable inputs in the modal
var wrapcmsElements = document.querySelectorAll('[wrapcms]');
wrapcmsElements.forEach(function(element) {
  // Get the wrapcms type and the input fields
  var wrapcmsType = element.getAttribute('wrapcms');
  var fieldName = element.getAttribute('field-name');
  var inputFields = getEditFormFields(wrapcmsType, fieldName, element);

  // Add the input fields to the edit form
  var editFormFieldsContainer = document.getElementById('edit-form-fields');
  editFormFieldsContainer.appendChild(inputFields);

  // Save the edited content to localStorage when the input fields change
  inputFields.addEventListener('change', function() {
    var editedContent = inputFields.querySelector('[name]').value;
    localStorage.setItem(wrapcmsType, editedContent);
  });

  // Load the edited content from localStorage
  var editedContent = localStorage.getItem(wrapcmsType);
  if (editedContent) {
    switch (wrapcmsType) {
      case 'title':
        element.querySelector('h1').innerHTML = editedContent;
        break;
      case 'heading-2':
        element.querySelector('h2').innerHTML = editedContent;
        break;
      case 'content':
        element.querySelector('p').innerHTML = editedContent;
        break;
      // Add more cases for other wrapcms types
    }
  }
});

// Show the edit modal
var editModal = document.getElementById('edit-modal');
editModal.style.display = 'none';

// Function to get the edit form fields based on the wrapcms element
function getEditFormFields(wrapcmsType, fieldName, element) {
  var editFormFields = document.createElement('div');
  var fieldLabel = document.createElement('label');
  fieldLabel.innerHTML = fieldName + ':';
  editFormFields.appendChild(fieldLabel);

  switch (wrapcmsType) {
    case 'title':
      var titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.name = 'title';
      titleInput.value = element.querySelector('h1').innerHTML;
      titleInput.addEventListener('input', function(event) {
        element.querySelector('h1').innerHTML = event.target.value;
      });
      editFormFields.appendChild(titleInput);
      break;
    case 'heading-2':
      var headingInput = document.createElement('input');
      headingInput.type = 'text';
      headingInput.name = 'heading 2';
      headingInput.value = element.querySelector('h2').innerHTML;
      headingInput.addEventListener('input', function(event) {
        element.querySelector('h2').innerHTML = event.target.value;
      });
      editFormFields.appendChild(headingInput);
      break;
    case 'content':
      var contentTextarea = document.createElement('textarea');
      contentTextarea.name = 'content';
      contentTextarea.innerHTML = element.querySelector('p').innerHTML;
      contentTextarea.addEventListener('input', function(event) {
        element.querySelector('p').innerHTML = event.target.value;
      });
      editFormFields.appendChild(contentTextarea);
      break;
    // Add more cases for other wrapcms types
  }
  return editFormFields;
}

// Function to cancel editing and hide the modal
function cancelEdit() {
  var editModal = document.getElementById('edit-modal');
  editModal.style.display = 'none';
}


