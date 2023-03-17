// Add event listener to wrapcms elements
var wrapcmsElements = document.querySelectorAll('[wrapcms]');
wrapcmsElements.forEach(function(element) {
  element.addEventListener('click', function(event) {
    event.preventDefault();

    // Create the edit form dynamically based on the wrapcms element
    var wrapcmsType = element.getAttribute('wrapcms');
    var editFormFields = getEditFormFields(wrapcmsType, element);

// Add event listener to edit-field select element
var editField = document.getElementById('edit-field');
editField.addEventListener('change', function() {
  // Create the edit form dynamically based on the selected field
  var editFormFields = getEditFormFields(editField.value);

  // Add the form fields to the edit form
  var editFormFieldsContainer = document.getElementById('edit-form-fields');
  editFormFieldsContainer.innerHTML = '';
  editFormFieldsContainer.appendChild(editFormFields);

  // Show the edit modal
  var editModal = document.getElementById('edit-modal');
  editModal.style.display = 'block';
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

      // Save the changes to GitHub
      var xhr2 = new XMLHttpRequest();
      xhr2.open('PUT', 'https://api.github.com/repos/designerbrett/wrapcms/contents/index.html');
      xhr2.setRequestHeader('Authorization', 'Bearer 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');
      xhr2.onreadystatechange = function() {
        if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
          console.log('Changes saved to GitHub.');
        }
      };
      var commitMessage = 'Update HTML file';
      var content = btoa(wrapcmsElement.outerHTML);
      var data = {
        "message": commitMessage,
        "content": content,
        "sha": "0b901630c433bba0e571189e684e1dcbe72afe39506c7857b1df89147b36bf89"
      };
      xhr2.send(JSON.stringify(data));
    }
  };
  xhr.send(formData);
});







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
    editFormFields.appendChild(editIcon);
    switch (wrapcmsType) {
      case 'title':
        var titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.name = 'title';
        titleInput.value = element.querySelector('h1').innerHTML;
        editFormFields.appendChild(titleInput);
        break;
      case 'heading-2':
        var titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.name = 'heading 2';
        titleInput.value = element.querySelector('h2').innerHTML;
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

