const codeSnippets = {
    javascript: [
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
console.log(isPalindrome('racecar'));`
    ],
    python: [
        `def is_even(n):
    return n % 2 == 0

print(is_even(4))`,

        `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,

        `numbers = [1, 2, 3, 4]
doubled = [n * 2 for n in numbers]
print(doubled)`,

        `def greet(name):
    return f"Hello, {name}!"

print(greet('Coder'))`,

        `def reverse_string(s):
    return s[::-1]

print(reverse_string('hello'))`,

        `def is_palindrome(s):
    s = ''.join(filter(str.isalnum, s)).lower()
    return s == s[::-1]

print(is_palindrome('racecar'))`,

        `import random

def get_random_int(max):
    return random.randint(0, max - 1)

print(get_random_int(10))`
    ],
    php: [
        `<?php
function isEven($n) {
    return $n % 2 === 0;
}
echo isEven(4) ? 'Even' : 'Odd';
?>`,

        `<?php
function factorial($n) {
    if ($n === 0) {
        return 1;
    }
    return $n * factorial($n - 1);
}
echo factorial(5);
?>`,

        `<?php
$numbers = [1, 2, 3, 4];
$doubled = array_map(fn($n) => $n * 2, $numbers);
print_r($doubled);
?>`,

        `<?php
function greet($name) {
    return "Hello, $name!";
}
echo greet('Coder');
?>`,

        `<?php
function reverseString($str) {
    return strrev($str);
}
echo reverseString('hello');
?>`,

        `<?php
function isPalindrome($str) {
    $cleaned = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $str));
    return $cleaned === strrev($cleaned);
}
echo isPalindrome('racecar') ? 'Palindrome' : 'Not Palindrome';
?>`,

        `<?php
function getRandomInt($max) {
    return rand(0, $max - 1);
}
echo getRandomInt(10);
?>`
    ],
    sql: [
        `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,

        `SELECT name, email FROM users WHERE id = 1;`,

        `UPDATE users SET email = 'newemail@example.com' WHERE id = 1;`,

        `DELETE FROM users WHERE id = 1;`,

        `INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');`,

        `ALTER TABLE users ADD COLUMN phone VARCHAR(15);`,

        `SELECT COUNT(*) AS user_count FROM users;`
    ],
    laravel: [
        `Route::get('/welcome', function () {
    return 'Welcome to Laravel!';
});`,

        `public function showUser($id) {
    $user = User::find($id);
    return response()->json($user);
}`,

        `Schema::table('users', function (Blueprint $table) {
    $table->string('phone')->nullable();
});`,

        `Route::post('/user', function (Request $request) {
    $user = User::create($request->all());
    return response()->json($user, 201);
});`,

        `Route::put('/user/{id}', function (Request $request, $id) {
    $user = User::find($id);
    $user->update($request->all());
    return response()->json($user, 200);
});`,

        `Route::delete('/user/{id}', function ($id) {
    User::destroy($id);
    return response()->json(null, 204);
});`,

        `public function showAllUsers() {
    $users = User::all();
    return view('users.index', compact('users'));
}`
    ]
};

let timer;
let timeLeft;
let currentSnippet = "";
let errorCount = 0;
let startTime; // Nueva variable para registrar el tiempo de inicio

const codeDisplay = document.getElementById("code-display");
const codeInput = document.getElementById("code-input");
const timerDisplay = document.getElementById("timer");
const errorsDisplay = document.getElementById("errors");
const startButton = document.getElementById("start-button");
const resultDisplay = document.getElementById("result");
const languageSelect = document.getElementById("language-select");

// Function to load the saved language from localStorage
function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'javascript';
    languageSelect.value = savedLanguage;
    loadSnippet();
}

// Function to save the selected language to localStorage
function saveSelectedLanguage() {
    localStorage.setItem('selectedLanguage', languageSelect.value);
}

function startGame() {
    if (startButton.textContent === "Comenzar") {
        resetGame();
        loadSnippet();
        setTimeBasedOnSnippetLength();
        startTime = new Date(); // Registrar el tiempo de inicio
        startTimer();
        codeInput.focus();
        startButton.textContent = "Parar";
    } else {
        endGame(true);
    }
}

function resetGame() {
    clearInterval(timer);
    errorCount = 0;
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
    const selectedLanguage = languageSelect.value;
    const snippets = codeSnippets[selectedLanguage];
    currentSnippet = snippets[Math.floor(Math.random() * snippets.length)];
    displaySnippet();
}

function displaySnippet() {
    codeDisplay.textContent = currentSnippet;
}

function setTimeBasedOnSnippetLength() {
    const snippetLength = currentSnippet.length;
    timeLeft = Math.max(Math.ceil(snippetLength / 3), 10); // Mínimo de 10 segundos
    timerDisplay.textContent = timeLeft;
}

codeInput.addEventListener("input", () => {
    const inputText = codeInput.value;
    let displayText = "";
    let errorFound = false;

    for (let i = 0; i < currentSnippet.length; i++) {
        if (i < inputText.length) {
            if (inputText[i] === currentSnippet[i]) {
                displayText += `<span style="color:white;">${currentSnippet[i]}</span>`;
            } else {
                if (!errorFound) {
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

        // Calcular el tiempo total transcurrido
        const endTime = new Date();
        const timeSpent = Math.max(0, Math.round((endTime - startTime) / 1000)); // Tiempo en segundos

        resultDisplay.innerHTML = `Escribiste ${totalTypedChars} caracteres con ${errorCount} errores. Podrías escribir aproximadamente ${Math.floor((totalTypedChars / timeLeft) * 60)} caracteres por minuto con una eficiencia del ${efficiency.toFixed(2)}%.<br>Conseguido en ${timeSpent} segundos.`;

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
    setTimeBasedOnSnippetLength(); // Reinicia el temporizador basado en la nueva longitud del snippet
    startButton.textContent = "Comenzar";
    resultDisplay.textContent = ""; 
    codeDisplay.innerHTML = "";
    errorCount = 0;
    errorsDisplay.textContent = `Errores: ${errorCount}`;
    document.getElementById('new-snippet-button')?.remove();
}

startButton.addEventListener("click", startGame);
languageSelect.addEventListener("change", () => {
    saveSelectedLanguage(); // Guarda el lenguaje seleccionado
    loadSnippet();
    setTimeBasedOnSnippetLength(); // Actualiza el temporizador basado en el nuevo fragmento
});

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

document.addEventListener('DOMContentLoaded', () => {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Cargar el tema guardado al cargar la página
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    body.classList.add(savedTheme);

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode'); // Guardar la preferencia
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode'); // Guardar la preferencia
        }
    });

    loadSavedLanguage(); // Cargar el lenguaje guardado al cargar la página
});
