// Generate a unique identifier (UID)
function generateUID() {
  return Math.random().toString(36).substr(2, 6);
}

// Get the current page name
var pageName = window.location.pathname.split('/').pop().split('.')[0];

// Load the data for the current page from the included JSON file
var data = {};
document.addEventListener('DOMContentLoaded', function() {
  var jsonScript = document.querySelector('script[type="application/json"]');
  if (jsonScript && jsonScript.textContent.trim() !== '') {
    try {
      var jsonData = JSON.parse(jsonScript.textContent);
      if (jsonData && jsonData.name === pageName) {
        data = jsonData.data;
      }
    } catch (error) {
      console.warn('Error parsing JSON data:', error);
    }
  }
  
  var wrapcmsElements = document.querySelectorAll('[wrapcms]');
  wrapcmsElements.forEach(function(element) {
    var uid = element.getAttribute('wrapcms');
    if (!uid) {
      uid = generateUID();
      element.setAttribute('wrapcms', uid);
      data[uid] = {
        type: element.getAttribute('type'),
        content: element.innerHTML
      };
    } else {
      if (data[uid]) {
        element.innerHTML = data[uid].content;
      }
    }
  });
});

// Populate the page with the loaded data
function populatePageData() {
  var wrapcmsElements = document.querySelectorAll('[wrapcms]');
  wrapcmsElements.forEach(function(element) {
    var uid = element.getAttribute('wrapcms');
    var placeholderElement = element.querySelector('[wrapcms-placeholder="' + uid + '"]');
    var editedContent = data[uid] ? data[uid].content : null;
    if (placeholderElement && editedContent) {
      placeholderElement.innerHTML = editedContent;
    }
  });
}

// Edit button click event
var editButton = document.getElementById('edit-button');
editButton.addEventListener('click', function(event) {
  event.preventDefault();
  var editModal = document.getElementById('edit-modal');
  editModal.style.display = 'block';
  populateEditForm();
});

// Populate the edit form with the current field values
function populateEditForm() {
  var editFormFieldsContainer = document.getElementById('edit-form-fields');
  editFormFieldsContainer.innerHTML = ''; // Clear previous form fields
  var wrapcmsElements = document.querySelectorAll('[wrapcms]');
  wrapcmsElements.forEach(function(element) {
    var uid = element.getAttribute('wrapcms');
    var fieldName = element.getAttribute('field-name');
    var inputFields = getEditFormFields(uid, fieldName, element);
    editFormFieldsContainer.appendChild(inputFields);
    console.log('Populated edit form field:', uid, inputFields.querySelector('[name]').value);
  });
}

// Save the edited content to data object
var editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', function(event) {
  event.preventDefault();
  var inputFields = editForm.querySelectorAll('[name]');
  inputFields.forEach(function(inputField) {
    var uid = inputField.name;
    var editedContent = inputField.value;
    if (data[uid]) {
      data[uid].content = editedContent;
    } else {
      var wrapcmsElement = document.querySelector(`[wrapcms="${uid}"]`);
      var wrapcmsType = wrapcmsElement.getAttribute('type');
      data[uid] = {
        type: wrapcmsType,
        content: editedContent
      };
    }
  });
  savePageData();
  var editModal = document.getElementById('edit-modal');
  editModal.style.display = 'none';
});

// Save the edited content to JSON file and download HTML
function savePageData() {
  // Save JSON data
  var pageData = {
    name: pageName,
    data: data
  };
  var jsonDataString = JSON.stringify(pageData, null, 2);
  var jsonBlob = new Blob([jsonDataString], { type: 'application/json' });
  var jsonUrl = URL.createObjectURL(jsonBlob);
  var jsonLink = document.createElement('a');
  jsonLink.href = jsonUrl;
  jsonLink.download = 'wrapcms-data.json';

  // Create a clone of the current document
  var clonedDocument = document.cloneNode(true);

  // Remove the content of editable elements in the cloned document
  var wrapcmsElements = clonedDocument.querySelectorAll('[wrapcms]');
  wrapcmsElements.forEach(function(element) {
    element.innerHTML = '';
  });

  // Get the HTML content of the cloned document
  var htmlContent = clonedDocument.documentElement.outerHTML;
  var htmlBlob = new Blob([htmlContent], { type: 'text/html' });
  var htmlUrl = URL.createObjectURL(htmlBlob);
  var htmlLink = document.createElement('a');
  htmlLink.href = htmlUrl;
  htmlLink.download = pageName + '.html';

  // Trigger downloads
  jsonLink.click();
  htmlLink.click();

  // Clean up
  URL.revokeObjectURL(jsonUrl);
  URL.revokeObjectURL(htmlUrl);
}

// Function to generate edit form fields
function getEditFormFields(uid, fieldName, element) {
  var editFormFields = document.createElement('div');
  var fieldLabel = document.createElement('label');
  fieldLabel.innerHTML = fieldName + ':';
  editFormFields.appendChild(fieldLabel);

  var inputField;
  var wrapcmsType = element.getAttribute('type');
  if (wrapcmsType === 'content' || wrapcmsType === 'meta-description') {
    inputField = document.createElement('textarea');
  } else {
    inputField = document.createElement('input');
    inputField.type = 'text';
  }
  inputField.name = uid;
  inputField.value = element.innerHTML;
  editFormFields.appendChild(inputField);

  return editFormFields;
}

// Function to cancel editing and hide the modal
function cancelEdit() {
  var editModal = document.getElementById('edit-modal');
  editModal.style.display = 'none';
}