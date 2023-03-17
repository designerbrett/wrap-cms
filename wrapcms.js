// Add event listener to edit button
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
  var inputFields = getEditFormFields(wrapcmsType, element);

  // Add the input fields to the edit form
  var editFormFieldsContainer = document.getElementById('edit-form-fields');
  editFormFieldsContainer.appendChild(inputFields);
});

// Show the edit modal
var editModal = document.getElementById('edit-modal');
editModal.style.display = 'none';

// Function to get the edit form fields based on the wrapcms element
function getEditFormFields(wrapcmsType, element) {
    var editFormFields = document.createElement('span');
    var editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-pencil-alt'); // Add your desired edit icon class here
    editIcon.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Create the edit form dynamically based on the wrapcms element
      var wrapcmsType = element.getAttribute('wrapcms');
      var editFormFields = getEditFormFields(wrapcmsType, element);
  
      // Add the form fields to the edit form
      var editFormFieldsContainer = document.getElementById('edit-form-fields');
      editFormFieldsContainer.innerHTML = '';
      editFormFieldsContainer.appendChild(editFormFields);
  
      // Show the edit modal
      var editModal = document.getElementById('edit-modal');
      editModal.style.display = 'block';
    });
   
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
            var titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.name = 'heading 2';
            titleInput.value = element.querySelector('h2').innerHTML;
            titleInput.addEventListener('input', function(event) {
              element.querySelector('h2').innerHTML = event.target.value;
            });
            editFormFields.appendChild(titleInput);
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

