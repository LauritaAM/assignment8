const questionBlocks = document.querySelectorAll('.question-block');

const userAnswers = {};

questionBlocks.forEach((block, index) => {
  const buttons = block.querySelectorAll('.answer-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('selected'));
      button.classList.add('selected');
      userAnswers[index] = button.dataset.answer;
      console.log(`Question ${index + 1} selected:`, button.dataset.answer);
      console.log(userAnswers);
    });
  });
});


const style = document.createElement('style');
style.innerHTML = `
  .answer-btn.selected {
    background-color: #0d6efd;
    color: white;
    transform: scale(1.05);
  }
`;
document.head.appendChild(style);


function calculateResult() {
  const counts = {};
  Object.values(userAnswers).forEach(ans => {
    counts[ans] = (counts[ans] || 0) + 1;
  });

  let top = null;
  let topCount = 0;
  for (const [season, count] of Object.entries(counts)) {
    if (count > topCount) {
      top = season;
      topCount = count;
    }
  }

  const mapping = {
    summer: "Summer — energetic and social!",
    spring: "Spring — fresh and creative!",
    fall: "Fall — warm and thoughtful!",
    winter: "Winter — calm and cozy!"
  };

  return mapping[top] || "You are a mix of seasons!";
}


function displayResult() {
  if (Object.keys(userAnswers).length < questionBlocks.length) {
    alert("Please answer all the questions before seeing your result!");
    return;
  }

  const resultContainer = document.getElementById('result-container');
  const resultTextEl = document.getElementById('result-text');

  const finalResult = calculateResult();
  resultTextEl.textContent = finalResult;
  resultContainer.style.display = 'block';
}

document.getElementById('show-result').addEventListener('click', displayResult);

