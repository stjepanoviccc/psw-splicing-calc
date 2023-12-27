const trigger = document.querySelector('#calculatorApplyJs');
trigger.addEventListener('click', event => {
    event.preventDefault();

    const firstStat = document.querySelector('#firstStat').value;
    const secondStat = document.querySelector('#secondStat').value;

    calculateWorstAndBestCase(firstStat, secondStat);
});

const inputs = document.querySelectorAll('.input');
inputs.forEach(input => {
    input.addEventListener('change', (event) => {
        if (!/^[1-5]+$/.test(event.target.value)) {
            alert("Digits must be between 1 and 5.");
            resetAll();
            return;
        };
        if(parseInt(event.target.value) > 5555) {
            alert("It can't be higher than 5555.");
            resetAll();
            return;
        }
        else if(parseInt(event.target.value) < 1111) {
            alert("It can't be lower than 1111.");
            resetAll();
            return;
        };
    });
});

const resetAll = () => {
    document.querySelector("#firstStat").value = 1111;
    document.querySelector("#secondStat").value = 1111;
    document.querySelector("#firstLabelStatSpan").innerHTML = "60%";
    document.querySelector("#secondLabelStatSpan").innerHTML = "60%";
    document.querySelector("#calculatedValueBestCase").innerHTML = 1111 + " - " + 60 + "%";
    document.querySelector("#calculatedValueWorstCase").innerHTML = 1111 + " - " + 60 + "%";
    document.querySelector("#firstLabelStatSpan").innerHTML = 60 + "%";
    document.querySelector("#secondLabelStatSpan").innerHTML = 60 + "%";
};

const calculateWorstAndBestCase = (firstNumber, secondNumber) => {
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);

    let worstCase = "";
    let bestCase = "";

    let stringOfFirstNumber = firstNumber.toString();
    let stringOfSecondNumber = secondNumber.toString();

    let firstCharFirstNumber = stringOfFirstNumber.charAt(0);
    let secondCharFirstNumber = stringOfFirstNumber.charAt(1);
    let thirdCharFirstNumber = stringOfFirstNumber.charAt(2);
    let fourthCharFirstNumber = stringOfFirstNumber.charAt(3);
    let firstCharSecondNumber = stringOfSecondNumber.charAt(0);
    let secondCharSecondNumber = stringOfSecondNumber.charAt(1);
    let thirdCharSecondNumber = stringOfSecondNumber.charAt(2);
    let fourthCharSecondNumber = stringOfSecondNumber.charAt(3);

    worstCase += returnLower(firstCharFirstNumber, firstCharSecondNumber);
    worstCase += returnLower(secondCharFirstNumber, secondCharSecondNumber);
    worstCase += returnLower(thirdCharFirstNumber, thirdCharSecondNumber);
    worstCase += returnLower(fourthCharFirstNumber, fourthCharSecondNumber);

    bestCase += returnHigher(firstCharFirstNumber, firstCharSecondNumber);
    bestCase += returnHigher(secondCharFirstNumber, secondCharSecondNumber);
    bestCase += returnHigher(thirdCharFirstNumber, thirdCharSecondNumber);
    bestCase += returnHigher(fourthCharFirstNumber, fourthCharSecondNumber);

    const firstStatPercentage = calculatePercentage(stringOfFirstNumber);
    const secondStatPercentage = calculatePercentage(stringOfSecondNumber);
    
    document.querySelector('#calculatedValueBestCase').innerHTML = bestCase + " - " + calculatePercentage(bestCase)+ "%";
    document.querySelector('#calculatedValueWorstCase').innerHTML = worstCase + " - " + calculatePercentage(worstCase)  + "%";
    document.querySelector("#firstLabelStatSpan").innerHTML = firstStatPercentage + "%";
    document.querySelector('#secondLabelStatSpan').innerHTML = secondStatPercentage + "%";
};

const calculatePercentage = (stat) => {
    const one = 15;
    const two = 17.5;
    const three = 20;
    const four = 22.5;
    const five = 25;

    let finalPercentage = 0;

    for(let i = 0; i < 4; i++) {
        let parsed = parseInt(stat.charAt(i));
        switch(parsed) {
            case 1:
                finalPercentage += one;
                break;
            case 2:
                finalPercentage += two;
                break;
            case 3:
                finalPercentage += three;
                break;
            case 4:
                finalPercentage += four;
                break;
            case 5:
                finalPercentage += five;
                break;
        }
    }

    return Math.ceil(finalPercentage);
};

const returnLower = (firstStat, secondStat) => {
    if(parseInt(firstStat) <= parseInt(secondStat)) {
        return firstStat;
    } else {
        return secondStat;
    }
}

const returnHigher = (firstStat, secondStat) => {
    if(parseInt(firstStat) >= parseInt(secondStat)) {
        return firstStat;
    } else {
        return secondStat;
    }
}