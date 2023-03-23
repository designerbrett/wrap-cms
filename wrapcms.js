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

function getEditFormFields(wrapcmsType, fieldName, element) {
  var editFormFields = document.createElement('span');
  var fieldLabel = document.createElement('label');
  fieldLabel.innerHTML = fieldName + ':';
  editFormFields.appendChild(fieldLabel);

  switch (wrapcmsType) {
    case 'title':
      var titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.name = 'title';
      titleInput.id = uuidv4();
      var h1 = element.querySelector('h1');
      titleInput.value = h1 !== null ? h1.innerHTML : '';
      titleInput.addEventListener('input', function(event) {
        var h1 = element.querySelector('h1');
        if (h1 !== null && h1 !== undefined) {
          h1.innerHTML = event.target.value;
          titleInput.value = h1.innerHTML;
        } else {
          titleInput.value = '';
        }
      });
      editFormFields.appendChild(titleInput);
      break;
    case 'heading-2':
      var headingInput = document.createElement('input');
      headingInput.type = 'text';
      headingInput.name = 'heading-2';
      headingInput.id = uuidv4();
      var h2 = element.querySelector('h2');
      headingInput.value = h2 !== null ? h2.innerHTML : '';
      headingInput.addEventListener('input', function(event) {
        var h2 = element.querySelector('h2');
        if (h2 !== null && h2 !== undefined) {
          h2.innerHTML = event.target.value;
          headingInput.value = h2.innerHTML;
        } else {
          headingInput.value = '';
        }
      });
      editFormFields.appendChild(headingInput);
      break;
    case 'content':
      var contentTextarea = document.createElement('textarea');
      contentTextarea.name = 'content';
      contentTextarea.id = uuidv4();
      var p = element.querySelector('p');
      contentTextarea.innerHTML = p !== null ? p.innerHTML : '';
      contentTextarea.addEventListener('input', function(event) {
        var p = element.querySelector('p');
        if (p !== null && p !== undefined) {
          p.innerHTML = event.target.value;
          contentTextarea.value = p.innerHTML;
        } else {
          contentTextarea.value = '';
        }
      });
      editFormFields.appendChild(contentTextarea);
      break;
    case 'meta-description':
      var metaDescInput = document.createElement('textarea');
      metaDescInput.type = 'text';
      metaDescInput.name = 'meta-description';
      metaDescInput.id = uuidv4();
      var metaDesc = element.querySelector('meta[name="description"]');
      metaDescInput.value = metaDesc !== null ? metaDesc.content : '';
      metaDescInput.addEventListener('input', function(event) {
        var metaDesc = element.querySelector('meta[name="description"]');
        if (metaDesc !== null && metaDesc !== undefined) {
          metaDesc.content = event.target.value;
          metaDescInput.value = metaDesc.content;
        } else {
          metaDescInput.value = '';
        }
      });
      editFormFields.appendChild(metaDescInput);
      break;
    case 'doc-title':
      var docTitleInput = document.createElement('input');
      docTitleInput.type = 'text';
      docTitleInput.name = 'doc-title';
      docTitleInput.id = uuidv4();
      var docTitle = document.querySelector('title');
      docTitleInput.value = docTitle !== null ? docTitle.innerHTML : '';
      docTitleInput.addEventListener('input', function(event) {
        var docTitle = document.querySelector('title');
        if (docTitle !== null && docTitle !== undefined) {
          docTitle.innerHTML = event.target.value;
          docTitleInput.value = docTitle.innerHTML;
        } else {
          docTitleInput.value = '';
        }
      });
      editFormFields.appendChild(docTitleInput);
      break;
    // Add more cases for other wrapcms types
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


