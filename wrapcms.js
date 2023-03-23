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

// Get the current UID count from local storage
let uidCount = parseInt(localStorage.getItem('uidCount')) || 0;

// Increment the UID count and generate a new UID
const newUid = ++uidCount;

// Save the new UID count to local storage
localStorage.setItem('uidCount', uidCount);

// Add the new UID as a class with a prefix of "wrapcms-pageid-"
document.body.classList.add(`wrapcms-pageid-${newUid}`);


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
});
  // Load the edited content from localStorage
// Load the edited content from localStorage
var editedContent = localStorage.getItem(wrapcmsType);
if (editedContent) {
  var targetElement;
  var fieldSelector;
  switch (wrapcmsType) {
    case 'doc-title':
      targetElement = document.querySelector('title');
      fieldSelector = 'innerHTML';
      break;
    case 'meta-description':
      targetElement = document.querySelector('meta[name="description"]');
      fieldSelector = 'content';
      break;
    case 'title':
      targetElement = element.querySelector('h1');
      fieldSelector = 'innerHTML';
      break;
    case 'heading-2':
      targetElement = element.querySelector('h2');
      fieldSelector = 'innerHTML';
      break;
    case 'content':
      targetElement = element.querySelector('p');
      fieldSelector = 'innerHTML';
      break;
    // Add more cases for other wrapcms types
  }
  if (targetElement) {
    targetElement[fieldSelector] = editedContent;
  }
}


var editModal = document.getElementById('edit-modal');
editModal.style.display = 'none';

function getEditFormFields(wrapcmsType, fieldName, element) {
  var editFormFields = document.createElement('span');
  var fieldLabel = document.createElement('label');
  fieldLabel.innerHTML = fieldName + ':';
  editFormFields.appendChild(fieldLabel);

  var inputField;
  var valueField;

  switch (wrapcmsType) {
    case 'title':
      inputField = 'input';
      valueField = 'h1';
      break;
    case 'heading-2':
      inputField = 'input';
      valueField = 'h2';
      break;
    case 'content':
      inputField = 'textarea';
      valueField = 'p';
      break;
    case 'meta-description':
      inputField = 'textarea';
      valueField = 'meta[name="description"]';
      break;
    case 'doc-title':
      inputField = 'input';
      valueField = 'title';
      break;
    // Add more cases for other wrapcms types
  }

  if (inputField && valueField) {
    var editField = document.createElement(inputField);
    editField.type = 'text';
    editField.name = wrapcmsType;
    var uid = uuidv4();
    editField.id = uid;
    var targetElement = element.querySelector(valueField);
    editField.value = targetElement ? targetElement.innerHTML : '';
    editField.addEventListener('input', function(event) {
      var targetElement = element.querySelector(valueField);
      if (targetElement) {
        targetElement.innerHTML = event.target.value;
        editField.value = targetElement.innerHTML;
      } else {
        editField.value = '';
      }
    });
  }
  
  return editFormFields;
}



// Function to generate a unique ID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Function to cancel editing and hide the modal
function cancelEdit() {
  var editModal = document.getElementById('edit-modal');
  editModal.style.display = 'none';
}