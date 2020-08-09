document.querySelector('#diagnosis').addEventListener('submit', (e) => {
  e.preventDefault()

  form = e.target
  score = 0

  // add 5 points for every 'yes'
  for (child of form.children) {
    if (!(child instanceof HTMLInputElement)) {
      if (child.getElementsByTagName('input')[0].checked) {
        score += 5
      }
    }
  }

  // return message based on score
  var message;
  if (score >= 30) {
    message =
      "Our Short Assessment Module system predicts that you have been contracted with COVID-19";
  } else if (score >= 20) {
    message =
      "Our system predics that you may have coronavirus, and you should get it checked out. Visit our testing center links based on your location";
  } else {
    message =
      "Our system does not think you have covid, but please feel free to access our testing site database and information";
  }

  // add the message to #results
  document.getElementById("results").innerHTML = message;
})