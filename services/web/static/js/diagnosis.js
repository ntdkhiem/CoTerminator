document.querySelector('#diagnosis').addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(e.target);

  // make a post request to diagnosis api endpoint 
  fetch('/api/diagnosis', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json()) 
  .then(data => {
    document.getElementById("results").innerHTML = data.message;
  })
  .catch(err => {
    console.error(err)
  })
})