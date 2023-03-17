// Add event listener to wrapcms elements
// Add event listener to wrapcms elements
var wrapcmsElements = document.querySelectorAll('[wrapcms]');
wrapcmsElements.forEach(function(element) {
  // Wrap the element with a container div
  var containerDiv = document.createElement('span');
  containerDiv.classList.add('wrapcms-container');
  element.parentNode.insertBefore(containerDiv, element);
  containerDiv.appendChild(element);

  // Add an edit icon to the container div
  var editIcon = document.createElement('i');
  editIcon.classList.add('fa', 'fa-edit');
  editIcon.addEventListener('click', function(event) {
    event.preventDefault();

    // Create the edit form dynamically based on the wrapcms element
    var wrapcmsType = element.getAttribute('wrapcms');
    var editFormFields = getEditFormFields(wrapcmsType);

    // Add the form fields to the edit form
    var editFormFieldsContainer = document.getElementById('edit-form-fields');
    editFormFieldsContainer.innerHTML = '';
    editFormFieldsContainer.appendChild(editFormFields);

    // Show the edit modal
    var editModal = document.getElementById('edit-modal');
    editModal.style.display = 'block';
  });
  containerDiv.appendChild(editIcon);
});

// Add event listener to the edit form
var editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the data from the edit form
  var formData = new FormData(editForm);

  // Send the data to the server-side script using AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/save');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // If the save is successful, hide the edit modal and update the wrapcms element
      var response = JSON.parse(xhr.responseText);
      var wrapcmsType = response.type;
      var wrapcmsData = response.data;
      var wrapcmsElement = document.querySelector('[wrapcms="' + wrapcmsType + '"]');
      wrapcmsElement.innerHTML = wrapcmsData;
      var editModal = document.getElementById('edit-modal');
      editModal.style.display = 'none';
    }
  };
  xhr.send(formData);
});

// Function to get the edit form fields based on the wrapcms element
function getEditFormFields(wrapcmsType, element) {
  var editFormFields = document.createElement('span');
  switch (wrapcmsType) {
    case 'title-1':
      var titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.name = 'title';
      titleInput.value = element.querySelector('h1').innerHTML;
      editFormFields.appendChild(titleInput);
      break;
    case 'content':
      var contentTextarea = document.createElement('textarea');
      contentTextarea.name = 'content';
      contentTextarea.innerHTML = element.querySelector('p').innerHTML;
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
