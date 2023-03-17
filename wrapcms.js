// select all HTML elements with the wrapcms tag
const wrapcmsElems = document.querySelectorAll('[wrapcms]');

// load the form HTML from a separate file
fetch('form.html')
  .then(response => response.text())
  .then(html => {
    // create a new div element to contain the form
    const formContainer = document.createElement('div');
    formContainer.innerHTML = html;

    // select the form and input fields from the loaded HTML
    const formElem = formContainer.querySelector('#edit-form');
    const titleInput = formContainer.querySelector('#title');
    const contentInput = formContainer.querySelector('#content');

    // loop through the wrapcms elements and add click event listeners
    wrapcmsElems.forEach(elem => {
      elem.addEventListener('click', () => {
        // set the input field values to the current element content
        titleInput.value = elem.getAttribute('data-title') || '';
        contentInput.value = elem.innerHTML.trim();

        // show the form and focus on the title input
        formElem.style.display = 'block';
        titleInput.focus();

        // update the element content when the form is submitted
        formElem.addEventListener('submit', event => {
          event.preventDefault();
          elem.setAttribute('data-title', titleInput.value);
          elem.innerHTML = contentInput.value;
          formElem.style.display = 'none';

          // send the updated content to the server-side script using AJAX
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'save.php'); // replace 'save.php' with your server-side script URL
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              console.log('Content saved successfully');
            }
          };
          const data = { id: elem.id, title: titleInput.value, content: contentInput.value };
          xhr.send(`data=${JSON.stringify(data)}`);
        });
      });
    });

    // add the form to the page
    document.body.appendChild(formElem);
  })
  .catch(error => {
    console.error('Error loading form:', error);
  });
