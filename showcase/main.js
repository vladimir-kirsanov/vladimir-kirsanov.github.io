var apiVitr = {};
$.ajax({
    url: "https://krapipl.imumk.ru:8443/api/mobilev1/update",
    type: 'post',
    data: {
        "data": ""
    },
    dataType: 'json',
    success: function(json) {
        a(json);
    },
    error: function(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
    }
});

function rub() {
    var priceRub = document.getElementById('rubles');
    if (priceRub.checked) {
        let blockRub = document.querySelectorAll(".rub");
        for (let i = 0; i < blockRub.length; i++) {
            blockRub[i].style.display = 'block';
        }
        let blockBon = document.querySelectorAll(".bon");
        for (let i = 0; i < blockBon.length; i++) {
            blockBon[i].style.display = 'none';
        }
    }
    var priceBon = document.getElementById('bonus');
    if (priceBon.checked) {
        let blockRub = document.querySelectorAll(".rub");
        for (let i = 0; i < blockRub.length; i++) {
            blockRub[i].style.display = 'none';
        }
        let blockBon = document.querySelectorAll(".bon");
        for (let i = 0; i < blockBon.length; i++) {
            blockBon[i].style.display = 'block';
        }
    }
}

function a(apiVitr) {
    for (let i = 1; i < apiVitr.items.length; i++) {
        var ccc = apiVitr.items[i];
        if (ccc.grade.length == 1) {
            var hidd1 = ccc.grade;
            var hidd2 = ccc.grade;
            ccc.grade = ccc.grade + ' класс';
        } else {
            var grad = ccc.grade.split(";");
            ccc.grade = grad[0] + '-' + grad[grad.length - 1] + ' классы';
            var hidd1 = grad[0];
            var hidd2 = grad[grad.length - 1];
        }
        createCard(hidd1, hidd2, ccc.courseId, ccc.title, ccc.grade, ccc.genre, ccc.subject, ccc.status, ccc.price, ccc.priceBonus, ccc.shopUrl);
    }
}

function createCard(hidd1, hidd2, courseId, title, grade, genre, subject, status, price, priceBonus, shopUrl) {
    let card = document.createElement('li');
    card.className = 'courses-sci filtr';
    card.innerHTML = `
    <div class="sci-figure" ><img src="https://www.imumk.ru/svc/coursecover/${courseId}"></div>
    <div class="sci-info">
        <p class="sci-title">${subject}</p>
        <p class="sci-grade">${grade}</p>
        <p class="sci-genre">${genre}</p>
        <a class="sci-meta" href=${shopUrl}>Подробнее</a>
        <p class="sci-meta sci-price  rub "  style="color: #fff;   "    >Цена ${price} рублей</p>
        <p class="sci-meta sci-price  bon "  style="color: #fff;   "    >Цена ${priceBonus} бонусов</p>
        <p class="sci-hidd1 "  style="display = 'none';   "    >${hidd1}</p>
        <p class="sci-hidd2 "  style="display = 'none';   "    >${hidd2}</p>
    </div>
    
`
    document.querySelector('.courses-list').appendChild(card);
}

filterForm.onchange = function() {
    document.getElementById('InfoH1span').style.display = 'none';
    document.getElementById('InfoH1').style.display = 'none';
    document.getElementById('courseslist').style.margin = '60px 0 20px';
    var zero = 0;
    var nSubj = document.getElementById('subj').options.selectedIndex;
    var txtSubj = document.getElementById('subj').options[nSubj].text;
    var nGenre = document.getElementById('genre').options.selectedIndex;
    var txtGenre = document.getElementById('genre').options[nGenre].text;
    var nGrade = document.getElementById('grade').options.selectedIndex;
    var txtGrade = document.getElementById('grade').options[nGrade].text;
    var blockSub = document.querySelectorAll(".filtr");
    var filterSubj = document.querySelectorAll('.sci-title');
    var filterGenre = document.querySelectorAll('.sci-genre');
    var filterGrade = document.querySelectorAll('.sci-grade');
    var filterhidd1 = document.querySelectorAll('.sci-hidd1');
    var filterhidd2 = document.querySelectorAll('.sci-hidd2');
    for (let i = 0; i < blockSub.length; i++) {
        if (((filterSubj[i].textContent == txtSubj) || (txtSubj == 'Все предметы')) && ((filterGenre[i].textContent == txtGenre) || (txtGenre == 'Все жанры')) && (((filterhidd1[i].textContent <= txtGrade) && (filterhidd2[i].textContent >= txtGrade)) || (txtGrade == 'Все классы'))) {
            blockSub[i].style.display = 'block';
            zero = 1;
        } else {
            blockSub[i].style.display = 'none';
            document.getElementById('InfoH1').style.display = 'block';
            document.getElementById('courseslist').style.margin = '0px 0 20px';
        }
    }
    if (zero === 0) {
        document.getElementById('InfoH1span').style.display = 'block';
    }
}

function find() {
    document.getElementById('InfoH1span').style.display = 'none';
    document.getElementById('InfoH1').style.display = 'none';
    document.getElementById('courseslist').style.margin = '60px 0 20px';
    var zero = 0;
    var textFind = document.getElementById('search').value;
    textFind = textFind.toLowerCase();
    var blockSub = document.querySelectorAll(".filtr");
    var filterSubj = document.querySelectorAll('.sci-title');
    var filterGenre = document.querySelectorAll('.sci-genre');
    var filterGrade = document.querySelectorAll('.sci-grade');
    var filterhidd1 = document.querySelectorAll('.sci-hidd1');
    var filterhidd2 = document.querySelectorAll('.sci-hidd2');
    for (let i = 0; i < blockSub.length; i++) {
        filterSubj[i].textContent = filterSubj[i].textContent.toLowerCase();
        filterGenre[i].textContent = filterGenre[i].textContent.toLowerCase();
        if ((filterSubj[i].textContent.indexOf(textFind) != -1) || (filterGenre[i].textContent.indexOf(textFind) != -1)) {
            blockSub[i].style.display = 'block';
            zero = 1;
        } else {
            blockSub[i].style.display = 'none';
            document.getElementById('InfoH1').style.display = 'block';
            document.getElementById('courseslist').style.margin = '0px 0 20px';
        }
    }
    if (zero == 0) {
        document.getElementById('InfoH1span').style.display = 'block';
    }
}