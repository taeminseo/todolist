function Calendar(Date, CalTableId) {
    this.tbl = document.getElementById(CalTableId);
    this.isFirst = true;
    this.today = Date;
    
}

Calendar.prototype.setPrev = function () {
    const today = this.today;
    this.today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDay());
    this.build();
    
}

Calendar.prototype.setNext = function () {

    const today = this.today;
    this.today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDay());
    this.build();
    
}

Calendar.prototype.build = function () {
    let i = 0;
    let row = null; //행
    let cell = null; //열
    const table = this.tbl;
    const year = this.today.getFullYear();
    const month = this.today.getMonth();
    const month_en = ['JANUARY', 'FEBURARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

    //달력이 처음 실행되면
    if (this.isFirst) {

        //1. 헤더 행을 그린다.
        row = table.insertRow();
        cell = row.insertCell();

        const prev = "prev" + table.id;
        const next = "next" + table.id;

        cell.innerHTML = "<button id=" + prev + ">&lt;</button>" //이전 달 버튼
        document.getElementById(prev)
            .addEventListener('click', (e) => {
                e.preventDefault();
                this.isFirst = false;
                this.setPrev();
            })


        cell = row.insertCell();
        cell.colSpan = 5;
        cell.innerHTML = "<div id= head" + table.id + ">" + year + "<br />" + month_en[month] + "</div>";

        cell = row.insertCell();
        cell.innerHTML = "<button id=" + next + ">&gt;</button>" //다음 달 버튼
        document.getElementById(next)
            .addEventListener('click', (e) => {
                e.preventDefault();
                this.isFirst = false;
                this.setNext();
            })

        //2. 요일 만들기
        const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        row = table.insertRow();
        for (i = 0; i < week.length; i++) {
            cell = row.insertCell();
            cell.textContent = week[i];
        }

        

        //OR
    } else {
        //기존 테이블에 있던 달력 숫자(2행부터) 삭제
        while (table.rows.length > 2) {
            table.deleteRow(table.rows.length - 1);
        }

        this.isFirst = false;
    }

    if (!this.isFirst) {
        document.getElementById('head' + table.id).innerHTML =
            "<div id= head" + table.id + ">" + year + "<br />" + month_en[month] + "</div>";
    }

    const nMonth = new Date(year, month, 1); //이번달의 첫째날
    const lastDate = new Date(year, month + 1, 0); //이번달의 마지막날

    row = table.insertRow();
    let cnt = 0;

    for (i = 0; i < nMonth.getDay(); i++) {
        cell = row.insertCell();
        cnt++;
    }
    

    //달력출력
    for (i = 1; i <= lastDate.getDate(); i++) {
        cell = row.insertCell();
        cell.textContent = i;
        cell.setAttribute('data-date', [year, month, i].join('-'));

        if (cnt++ && cnt % 7 == 0)
            row = table.insertRow();
    }
    
}

