function generateHeader() {
  const header = document.createElement('header');
  header.innerHTML = `
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  `;
  return header;
}
