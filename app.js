document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div')
    const timeLeft = document.querySelector('#time-left')
    const result = document.querySelector('#result')
    const startBtn = document.querySelector('#button')
    const carsLeft = document.querySelectorAll('.car-left')
    const carsRight = document.querySelectorAll('.car-right')
    const logsLeft = document.querySelectorAll('.log-left')
    const logsRight = document.querySelectorAll('.log-right')
    const width = 9;
    let currentIndex = 76;
    let timerId
    let currentTime = 20


    squares[currentIndex].classList.add('starting-block')


    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog')
        switch (e.keyCode) {
            case 37: if (currentIndex % width !== 0) currentIndex -= 1
                break;
            case 38:
                if (currentIndex - width >= 0) currentIndex -= width
                break;
            case 39:
                if (currentIndex % width < width - 1) currentIndex += 1
                break;
            case 40:
                if (currentIndex + width < width * width) currentIndex += width
                break;
        }
        squares[currentIndex].classList.add('frog')
    }


    function autoMoveCars() {
        carsLeft.forEach(carsLeft => moveCarLeft(carsLeft))
        carsRight.forEach(carsRight => moveCarsRight(carsRight))
    }

    function moveCarLeft(carsLeft) {
        switch (true) {
            case carsLeft.classList.contains('c1'):
                carsLeft.classList.remove('c1')
                carsLeft.classList.add('c2')
                break;
            case carsLeft.classList.contains('c2'):
                carsLeft.classList.remove('c2')
                carsLeft.classList.add('c3')
                break;
            case carsLeft.classList.contains('c3'):
                carsLeft.classList.remove('c3')
                carsLeft.classList.add('c1')
                break;
        }
    }
    function moveCarsRight(carsRight) {
        switch (true) {
            case carsRight.classList.contains('c1'):
                carsRight.classList.remove('c1')
                carsRight.classList.add('c3')
                break;
            case carsRight.classList.contains('c2'):
                carsRight.classList.remove('c2')
                carsRight.classList.add('c1')
                break;
            case carsRight.classList.contains('c3'):
                carsRight.classList.remove('c3')
                carsRight.classList.add('c2')
                break;
        }
    }

    function autoMoveLogs() {
        logsLeft.forEach(logLeft => moveLogLeft(logLeft))
        logsRight.forEach(logRight => moveLogRigt(logRight))
    }

    function moveLogLeft(logLeft) {
        switch (true) {
            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1')
                logLeft.classList.add('l2')
                break;
            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2')
                logLeft.classList.add('l3')
                break;
            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3')
                logLeft.classList.add('l4')
                break;
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4')
                logLeft.classList.add('l5')
                break;
            case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5')
                logLeft.classList.add('l1')
                break;
        }
    }
    function moveLogRigt(logRight) {
        switch (true) {
            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1')
                logRight.classList.add('l5')
                break;
            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2')
                logRight.classList.add('l1')
                break;
            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3')
                logRight.classList.add('l2')
                break;
            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4')
                logRight.classList.add('l3')
                break;
            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5')
                logRight.classList.add('l4')
                break;
        }
    }

    if (squares[4].classList.contains('frog')) {
        result.textContent = "YOU WON"
        squares[currentIndex].classList.remove('frog')
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)


    }

    function lose() {
        if (currentTime === 0 || squares[currentIndex].classList.contains('c1')
            || squares[currentIndex].classList.contains('l4')
            || squares[currentIndex].classList.contains('l5')) {
            result.textContent = "YOU LOSE"
            squares[currentIndex].classList.remove('frog')
            clearInterval(timerId)
            document.removeEventListener('keyup', moveFrog)
        }
    }

    function moveWithLogLeft() {
        if (currentIndex >= 27 && currentIndex < 35) {
            squares[currentIndex].classList.remove('frog')
            currentIndex += 1
            console.log(currentIndex)
            squares[currentIndex].classList.add('frog')
        }
    }
    function moveWithLogRight() {
        if (currentIndex >= 18 && currentIndex < 26) {
            squares[currentIndex].classList.remove('frog')
            currentIndex -= 1
            squares[currentIndex].classList.add('frog')
        }
    }

    function movePeices() {
        currentTime--
        timeLeft.textContent = currentTime
        autoMoveCars()
        autoMoveLogs()
        moveWithLogLeft()
        moveWithLogRight()
        lose()
    }

    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
        }
        else {
            timerId = setInterval(movePeices, 1000)
            document.addEventListener('keyup', moveFrog)
        }
    })


})