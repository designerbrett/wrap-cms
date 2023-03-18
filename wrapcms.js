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

// tinyimce
tinymce.init({
 selector: '#textarea',
  plugins: [
   'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
   'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
    'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
   ],
    toolbar: 'undo redo | formatpainter casechange blocks | bold italic backcolor | ' +
    'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
   });


import { generateHeader } from './header.js';
import { generateFooter } from './footer.js';

const header = generateHeader();
const footer = generateFooter();

document.body.prepend(header);
document.body.append(footer);

// Check if user is logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
  // User is logged in, add "logged-in" class to body element
  document.body.classList.add('logged-in');
} else {
  // User is not logged in, remove "logged-in" class from body element
  document.body.classList.remove('logged-in');
}

