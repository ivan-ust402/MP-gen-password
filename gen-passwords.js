"use-strict";

const title = document.querySelector('.title');
const text = document.querySelector('.text');
title.textContent = 'Password generator (генератор паролей)'
text.textContent = 'To restart the application, refresh the page. (Для перезапуска приложения обновите страницу.)'

// Набор символов, из которых будет генерироваться пароль (35 + 52 - 1 = 86)
let symbols = "1234567890!@#$%^&*()_+;:][}\"\'|{/?.,\
qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"; //86 символов
let password = '';

/**
 * Функция возвращает случайное целое число между min(включительно) и 
 * max(не включая max)
 * @param {number} min минимальное значение диапазона для поиска
 * @param {number} max максимальное значение диапазона для поиска
 * @returns {number} случайная позиция в строке символов
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Examples 
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Функция генерирует случайный пароль
 * @param {number} passLength длина пароля 
 * @returns {void} выводит случайный пароль
 */
function generatePassword(passLength) {
    let symbolPosition = getRandomInt(0, 87);
    password += symbols.charAt(symbolPosition);
    passLength--;
    if(passLength !== 0) {
        generatePassword(passLength);
    }
}

/**
 * Функция спрашивает у пользователей длину пароля.
 * @returns {number} длина пароля
 */
function askPassLength() {
    return prompt("Enter the password length (Введите длину пароля):");
}

const mainFunc = () => {
    password = ''
    const length = askPassLength();
    if (length === null) {
        alert('Ваше действие привело к выходу из цикла приложения! Если вы хотите запустить заново приложение, обновите страницу!')
        return
    }
    if (length === '0') {
        alert('Длина пароля не может быть нулем!')
        setTimeout(mainFunc, 100);
    } else if (parseInt(length) && parseInt(length) > 0) {
        generatePassword(length);
        alert(`Your password (Ваш пароль): ${password}`);
        setTimeout(mainFunc, 100);
    } else if (parseInt(length) && parseInt(length) < 0) {
        alert("Вы ввели отрицательное число! Попробуйте ввести заново!");
        setTimeout(mainFunc, 100);
    } else {
        alert("Вы ввели не число! Попробуйте ввести заново!");
        setTimeout(mainFunc, 100);
    }
    
}

setTimeout(() => {
    mainFunc()
}, 100)
