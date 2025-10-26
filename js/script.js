console.log("script.js connected!");

const questionBlocks = document.querySelectorAll('.question-block');

const userAnswers = {};

questionBlocks.forEach((block, index) => {
  const buttons = block.querySelectorAll('.answer-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // remove selected from all in this block
      buttons.forEach(b => b.classList.remove('selected'));

      // add selected to clicked button
      button.classList.add('selected');

      // save the user's answer for this question
      userAnswers[index] = button.dataset.answer;

      // optional: log to verify behavior
      console.log(`Question ${index + 1} selected:`, button.dataset.answer);
    });
  });
});

const style = document.createElement('style');
style.innerHTML = `
  .answer-btn.selected {
    background-color: #0d6efd; /* bootstrap primary */
    color: white;
  }
`;
document.head.appendChild(style);

// Points mapping
const points = {
  summer: 4,
  spring: 3,
  fall: 2,
  winter: 1
};

function calculatePointsResult() {
  let total = 0;
  Object.values(userAnswers).forEach(ans => {
    total += points[ans] || 0;
  });

  // map total to a message
  let resultMsg;
  if (total <= 4) resultMsg = "Winter — calm and cozy.";
  else if (total <= 7) resultMsg = "Spring — fresh and creative.";
  else if (total <= 10) resultMsg = "Summer — energetic and social.";
  else resultMsg = "Fall — warm and thoughtful.";

  return resultMsg;
}

function displayResult() {
  // optional: require all answered
  if (Object.keys(userAnswers).length < questionBlocks.length) {
    alert('Please answer all the questions before viewing your result.');
    return;
  }

  // choose one of the calculators:
  // const finalText = calculatePointsResult();
  const finalText = calculateMajorityResult();

  const resultContainer = document.getElementById('result-container');
  const resultTextEl = document.getElementById('result-text');

  resultTextEl.textContent = finalText;
  resultContainer.style.display = 'block';
}
document.getElementById('show-result').addEventListener('click', displayResult);

