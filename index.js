const bank = [];
const odds = [];
const evens = [];

function addToBank(num) {
  bank.push(num);
}

function sortFromBank() {
  const num = bank.shift();
  if (num % 2 === 0) {
    evens.push(num);
  } else {
    odds.push(num);
  }
}

function renderNumbers(numbers, sectionId) {
  const $nums = numbers.map((num) => {
    const $num = document.createElement("span");
    $num.textContent = num;
    return $num;
  });
  const $output = document.querySelector(`#${sectionId} output`);
  $output.replaceChildren(...$nums);
}

function render() {
  renderNumbers(bank, "numberBank");
  renderNumbers(odds, "odds");
  renderNumbers(evens, "evens");
}

// === Script ===
render(); // Initial render

// Add number to bank when form submitted
const $form = document.querySelector("form");
$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const $input = document.querySelector("#number");
  const input = $input.value;

  // Guard against empty or non-number inputs
  if (input.length === 0 || isNaN(input)) {
    console.error("Input must be a number");
    return;
  }

  $input.value = "";

  addToBank(Number(input)); // Convert input to a number before storing it
  render();
});

// Sort one number from bank
const $sortOne = document.querySelector("#sortOne");
$sortOne.addEventListener("click", () => {
  sortFromBank();
  render();
});

// Sort all numbers from bank
const $sortAll = document.querySelector("#sortAll");
$sortAll.addEventListener("click", () => {
  // We keep sorting _while_ there are numbers in the bank
  while (bank.length > 0) {
    sortFromBank();
  }
  render();
});
