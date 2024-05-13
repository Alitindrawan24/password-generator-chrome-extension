function generatePassword() {
    const charsetLowercase = "abcdefghijklmnopqrstuvwxyz";
    const charsetUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charsetNumeric = "0123456789";
    const charsetSymbol = "!@#$*";

    const lowercaseUsed =  document.getElementById("lowercase-used").checked
    const uppercaseUsed =  document.getElementById("uppercase-used").checked
    const numericUsed =  document.getElementById("numeric-used").checked
    const symbolUsed =  document.getElementById("symbol-used").checked
    
    let password = "";
    let length = document.getElementById("passwordLength").value

    let randomList = []
    if (lowercaseUsed) randomList.push(charsetLowercase)
    if (uppercaseUsed) randomList.push(charsetUppercase)
    if (numericUsed) randomList.push(charsetNumeric)
    if (symbolUsed) randomList.push(charsetSymbol)

    randomList = randomList.shuffle()
    
    for (var i = 0; i < length; i++) {
        if (randomList.length > 0) {
            let randomCharset = randomList[ i % randomList.length ]
            let randomIndex = Math.floor(Math.random() * randomCharset.length);
            password += randomCharset[randomIndex];
        }
    }
    
    return password.shuffle();
}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

Array.prototype.shuffle = function () {
    let array = this
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array
}

function generate() {
    const password = generatePassword()
    document.getElementById("password").value = password

    const level = getPasswordStrength(password)
    
    document.getElementById("strongLevel").innerHTML = level.name
    document.getElementById("strongLevel").classList.remove("text-success", "text-danger", "text-primary")
    if (level.minScore >= 4) {
        document.getElementById("strongLevel").classList.add("text-success")
    } else if (level.minScore == 3) {
        document.getElementById("strongLevel").classList.add("text-primary")
    } else {
        document.getElementById("strongLevel").classList.add("text-danger")
    }
    
}

function copy() {
    const passwordBtn = document.getElementById("password");
    navigator.clipboard.writeText(passwordBtn.value)
    
    copyBtn = document.getElementById("copy")
    textCopied = document.getElementById("textCopied")


    copyBtn.classList.remove("btn-outline-secondary")
    copyBtn.classList.add("btn-outline-success")
    textCopied.innerHTML = "Password Copied!"
    setTimeout(function() {
        copyBtn.classList.remove("btn-outline-success")
        copyBtn.classList.add("btn-outline-secondary")
        textCopied.innerHTML = ""
    },1000)
}

function range() {
    const passwordLengthRange = document.getElementById("passwordLengthRange");
    const passwordLength = document.getElementById("passwordLength");
    passwordLength.value = passwordLengthRange.value
    
}

function getPasswordStrength(password) {
    const strengthLevels = [
        { name: "Very Strong", minScore: 5 },
        { name: "Strong", minScore: 4 },
        { name: "Medium", minScore: 3 },
        { name: "Weak", minScore: 2 },
        { name: "Very Weak", minScore: 1 },
        { name: "Bad", minScore: 0 },
    ];

    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numbersRegex = /[0-9]/;
    const specialCharsRegex = /[!@#$*]/;

    let score = 0;
    if (password.length >= 8) score++;
    if (lowercaseRegex.test(password)) score++;
    if (uppercaseRegex.test(password)) score++;
    if (numbersRegex.test(password)) score++;
    if (specialCharsRegex.test(password)) score++;

    let strengthLevel = strengthLevels.find(level => score >= level.minScore);
    return strengthLevel;
}

document.getElementById("generate").addEventListener("click", generate);
document.getElementById("copy").addEventListener("click", copy);
document.getElementById("passwordLengthRange").addEventListener("change", range);

generate();