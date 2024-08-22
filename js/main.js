const codeSnippets = [
    `function isEven(n) {
    return n % 2 === 0;
}
console.log(isEven(4));`,

    `function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}
console.log(factorial(5));`,

    `const square = x => x * x;
console.log(square(9));`,

    `function greet(name) {
    return \`Hello, \${name}!\`;
}
console.log(greet('Coder'));`,

    `function reverseString(str) {
    return str.split('').reverse().join('');
}
console.log(reverseString('hello'));`,

    `const sum = (a, b) => a + b;
console.log(sum(3, 4));`,

    `function isPalindrome(str) {
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}
console.log(isPalindrome('racecar'));`,

    `function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
console.log(getRandomInt(10));`,

    `const arr = [1, 2, 3, 4];
const doubled = arr.map(n => n * 2);
console.log(doubled);`,

    `function sumArray(arr) {
    return arr.reduce((acc, num) => acc + num, 0);
}
console.log(sumArray([1, 2, 3, 4]));`,

    `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(6));`,

    `const user = {
    name: 'Alice',
    age: 25
};
console.log(user.name);`,

    `function findMax(arr) {
    return Math.max(...arr);
}
console.log(findMax([1, 2, 3, 4, 5]));`,

    `const doubleNumbers = arr => arr.map(n => n * 2);
console.log(doubleNumbers([1, 2, 3]));`,

    `const add = (a, b) => a + b;
console.log(add(5, 10));`,

    `function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log(capitalize('hello'));`,

    `function countVowels(str) {
    return str.match(/[aeiou]/gi).length;
}
console.log(countVowels('hello world'));`,

    `function isOdd(n) {
    return n % 2 !== 0;
}
console.log(isOdd(5));`,

    `const cube = x => x * x * x;
console.log(cube(3));`,

    `function multiply(a, b) {
    return a * b;
}
console.log(multiply(6, 7));`,

    `function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return n > 1;
}
console.log(isPrime(7));`,

    `const subtract = (a, b) => a - b;
console.log(subtract(10, 5));`,

    `function sortArray(arr) {
    return arr.sort((a, b) => a - b);
}
console.log(sortArray([3, 1, 4, 1, 5]));`,

    `const greetings = ['Hello', 'Hi', 'Hey'];
console.log(greetings.join(', '));`,

    `function double(num) {
    return num * 2;
}
console.log(double(7));`,

    `function findMin(arr) {
    return Math.min(...arr);
}
console.log(findMin([8, 3, 5, 1, 6]));`,

    `const divide = (a, b) => a / b;
console.log(divide(20, 4));`,

    `function squareRoot(x) {
    return Math.sqrt(x);
}
console.log(squareRoot(16));`,

    `function repeatString(str, times) {
    return str.repeat(times);
}
console.log(repeatString('Hi', 3));`,

    `const filterOdds = arr => arr.filter(n => n % 2 === 1);
console.log(filterOdds([1, 2, 3, 4, 5]));`,

    `function concatStrings(str1, str2) {
    return str1 + str2;
}
console.log(concatStrings('Hello', ' World'));`,

    `function getFirstElement(arr) {
    return arr[0];
}
console.log(getFirstElement(['a', 'b', 'c']));`
];


let timer;
let timeLeft = 60;
let currentSnippet = "";
let errorCount = 0;

const codeDisplay = document.getElementById("code-display");
const codeInput = document.getElementById("code-input");
const timerDisplay = document.getElementById("timer");
const errorsDisplay = document.getElementById("errors");
const startButton = document.getElementById("start-button");
const resultDisplay = document.getElementById("result");

function startGame() {
    if (startButton.textContent === "Comenzar") {
        resetGame();
        startTimer();
        loadSnippet();
        codeInput.focus();
        startButton.textContent = "Parar";
    } else {
        endGame(true);
    }
}

function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    errorCount = 0;
    timerDisplay.textContent = timeLeft;
    errorsDisplay.textContent = `Errores: ${errorCount}`;
    codeInput.value = "";
    codeInput.disabled = false;
    resultDisplay.textContent = "";
    document.getElementById('new-snippet-button')?.remove(); 
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            endGame(false);
        }
    }, 1000);
}

function loadSnippet() {
    currentSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    displaySnippet();
}

function displaySnippet() {
    codeDisplay.textContent = currentSnippet;
}

codeInput.addEventListener("input", () => {
    const inputText = codeInput.value;
    let displayText = "";
    let errorFound = false;
    let localErrorCount = 0; 

    for (let i = 0; i < currentSnippet.length; i++) {
        if (i < inputText.length) {
            if (inputText[i] === currentSnippet[i]) {
                displayText += `<span style="color:white;">${currentSnippet[i]}</span>`;
            } else {
                if (!errorFound) {
                    localErrorCount++;
                    errorCount++;
                }
                displayText += `<span style="color:red;">${currentSnippet[i]}</span>`;
                errorFound = true; 
            }
        } else {
            displayText += `<span style="color:#444;">${currentSnippet[i]}</span>`;
        }
    }

    codeDisplay.innerHTML = displayText;
    errorsDisplay.textContent = `Errores: ${errorCount}`;

    if (!errorFound && inputText === currentSnippet) {
        endGame(false);
    }
});



codeInput.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        e.preventDefault();
        const start = codeInput.selectionStart;
        codeInput.value = codeInput.value.substring(0, start) + "    " + codeInput.value.substring(codeInput.selectionEnd); 
        codeInput.selectionStart = codeInput.selectionEnd = start + 4;
    } else if (e.key === "Enter") {
        e.preventDefault();
        const start = codeInput.selectionStart;
        codeInput.value = codeInput.value.substring(0, start) + "\n" + codeInput.value.substring(codeInput.selectionEnd);
        codeInput.selectionStart = codeInput.selectionEnd = start + 1;
    }
});

function endGame(stoppedByUser) {
    clearInterval(timer);
    codeInput.disabled = true;
    startButton.textContent = "Comenzar";

    if (!stoppedByUser) {
        const totalTypedChars = codeInput.value.length;
        const totalCharsInSnippet = currentSnippet.length;
        const efficiency = ((totalTypedChars - errorCount) / totalCharsInSnippet) * 100;

        resultDisplay.innerHTML = `Estadísticas: Escribiste ${totalTypedChars} caracteres con ${errorCount} errores. Podrías escribir aproximadamente ${Math.floor((totalTypedChars / 60) * 60)} caracteres por minuto con una eficiencia del ${efficiency.toFixed(2)}%.`;

        const newSnippetButton = document.createElement('button');
        newSnippetButton.textContent = "Nuevo Código";
        newSnippetButton.id = "new-snippet-button";
        newSnippetButton.onclick = loadNewSnippet;
        resultDisplay.appendChild(newSnippetButton);
    }
}

function loadNewSnippet() {
    codeInput.value = "";
    loadSnippet();
    startButton.textContent = "Comenzar";
    resultDisplay.textContent = ""; 
    codeDisplay.innerHTML = "";
    timerDisplay.textContent = 60;
    timeLeft = 60;
    errorCount = 0;
    errorsDisplay.textContent = `Errores: ${errorCount}`;
    document.getElementById('new-snippet-button')?.remove();
}

startButton.addEventListener("click", startGame);

const titleElement = document.getElementById('title');
const text = titleElement.innerText;
let index = 0;
let isDeleting = false;

function type() {
    let displayText = isDeleting
        ? text.substring(0, index--)
        : text.substring(0, index++);

    titleElement.innerText = displayText;

    if (index > text.length) {
        isDeleting = true;
        index = text.length;
    } else if (index < 0) {
        isDeleting = false;
        index = 0;
    }
    setTimeout(type, isDeleting ? 150 : 300);
}

type();

document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey && event.key === 'c') || 
        (event.ctrlKey && event.key === 'u') ||
        (event.ctrlKey && event.key === 'p')) {
        event.preventDefault();
    }
});

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
