(function(selector) {
    initCalendar(document.querySelector(selector));

    function initCalendar(calendar) {
        let date = new Date(),
            showedYear = date.getFullYear(),
            showedMonth = date.getMonth();

        let currentMoment = {
            year: showedYear,
            month: showedMonth,
            date: date.getDate()
        };

        let dates = calendar.querySelector('.dates'),
            infoMonth = calendar.querySelector('.month-info'),
            infoYear = calendar.querySelector('.year-info');
        drawCalendar(showedYear, showedMonth, currentMoment, calendar);

        let prev = calendar.querySelector('.prev'),
            next = calendar.querySelector('.next');

        prev.addEventListener('click', function() {
            showedYear = getPrevYear(showedYear, showedMonth);
            showedMonth = getPrevMonth(showedMonth);

            drawCalendar(showedYear, showedMonth, currentMoment, calendar)
        });

        next.addEventListener('click', function() {
            showedYear = getNextYear(showedYear, showedMonth);
            showedMonth = getNextMonth(showedMonth);

            drawCalendar(showedYear, showedMonth, currentMoment, calendar)
        });

        function drawCalendar(showedYear, showedMonth, currentMoment, calendar) {
            drawDates(showedYear, showedMonth, dates);
            showInfo(showedYear, showedMonth, infoMonth, infoYear);
            showCurrentDate(showedYear, showedMonth, currentMoment, dates);
        }
    }

    function showCurrentDate(showedYear, showedMonth, currentMoment, dates) {
        if (
            showedYear == currentMoment['year'] &&
            showedMonth == currentMoment['month']
        ) {
            let tds = dates.querySelectorAll('td');
            for (let i = 0; i < tds.length; i++) {
                if (tds[i].innerHTML == currentMoment['date']) {
                    tds[i].classList.add('active');
                    break;
                }
            }
        }
    }

    function getPrevYear(year, month) {
        if (month == 0) {
            return year - 1;
        } else {
            return year;
        }
    }

    function getPrevMonth(month) {
        if (month == 0) {
            return 11;
        } else {
            return month - 1;
        }
    }

    function getNextYear(year, month) {
        if (month == 11) {
            return year + 1;
        } else {
            return year;
        }
    }

    function getNextMonth(month) {
        if (month == 11) {
            return 0;
        } else {
            return month + 1;
        }
    }

    function showInfo(year, month, elemMonth, elemYear) {
        elemMonth.innerHTML = getMonthName(month);
        elemYear.innerHTML = year;
    }

    function getMonthName(num) {
        let month = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ]
        return month[num];
    }

    function drawDates(year, month, dates) {
        let arr = [],
            firstDateOfMonth = 1,
            lastDateOfMonth = getLastDayOfMonth(year, month);

        let unshiftElemsNum = getUnshiftElemsNum(year, month),
            pushElemsNum = getPushElemsNum(year, month);

        arr = createArr(firstDateOfMonth, lastDateOfMonth);
        arr = unshiftElems(unshiftElemsNum, '', arr);
        arr = pushElems(pushElemsNum, '', arr);
        arr = chunkArr(7, arr);

        createTable(arr, dates);
    }

    function createTable(arr, parent) {
        parent.innerHTML = '';
        for (let i = 0; i < arr.length; i++) {
            let tr = document.createElement('tr');

            for (let j = 0; j < arr[i].length; j++) {
                let td = document.createElement('td');
                td.innerHTML = arr[i][j];
                tr.appendChild(td);
            }
            parent.appendChild(tr);
        }
    }

    function createArr(from, to) {
        let arr = [];
        for (let i = from; i <= to; i++) {
            arr.push(i);
        }
        return arr;
    }

    function unshiftElems(num, elem, arr) {
        for (let i = 0; i < num; i++) {
            arr.unshift(elem);
        }
        return arr;
    }

    function unshiftElems(num, elem, arr) {
        for (let i = 0; i < num; i++) {
            arr.unshift(elem);
        }
        return arr;
    }

    function pushElems(num, elem, arr) {
        for (let i = 0; i < num; i++) {
            arr.push(elem);
        }
        return arr;
    }

    function getLastDayOfMonth(year, month) {
        let date = new Date(year, month + 1, 0);
        return date.getDate();
    }

    function getUnshiftElemsNum(year, month) {
        let jsDayNum = getFirstWeekDayOfMonthNum(year, month),
            realDayNum = getRealDayOfWeekNum(jsDayNum);

        return realDayNum - 1;

    }

    function getPushElemsNum(year, month) {
        let jsDayNum = getLastWeekDayOfMonthNum(year, month),
            realDayNum = getRealDayOfWeekNum(jsDayNum);

        return 7 - realDayNum;
    }

    function chunkArr(num, arr) {
        let result = [],
            chunk = [],
            iterCount = arr.length / num;

        for (let i = 0; i < iterCount; i++) {
            chunk = arr.splice(0, num);
            result.push(chunk);
        }
        return result;
    }

    function getRealDayOfWeekNum(jsNumOfDay) {
        if (jsNumOfDay == 0) {
            return 7;
        } else {
            return jsNumOfDay;
        }
    }

    function getFirstWeekDayOfMonthNum(year, month) {
        let date = new Date(year, month, 1);
        return date.getDay();
    }

    function getLastWeekDayOfMonthNum(year, month) {
        let date = new Date(year, month + 1, 0);
        return date.getDate();
    }
}('#calendar'));


let tds = document.querySelectorAll('td');

document.getElementById('dates')
    .addEventListener('click', event => {
        if (event.target.tagName === 'TD') {
            tds.forEach(
                function(td) {
                    td.style.border = '1px solid #fff'
                });

            event.target.style.border = '1px solid #4E68EF';
        }
    });