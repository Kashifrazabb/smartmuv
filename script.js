const words = document.querySelectorAll(".word");
let index = 0;
const interval = 4000;

function SlideIn() {
    words.forEach((word) => {
        word.style.animation = "none";
        word.style.display = "none";
    });
    words[index].style.animation = "slideIn 1.5s ease forwards";
    words[index].style.display = "inline-block";
    index = (index + 1) % words.length;
}

SlideIn();
setInterval(SlideIn, interval);
/////////////////////////////////////////////////////////////////
const ul = document.querySelector('.popularList ul');

ul.onclick = e => {
    e.preventDefault();
    const clickedItem = e.target.closest('li');
    const index = Array.from(ul.children).indexOf(clickedItem);
    document.querySelectorAll(".popularTable table tr:not(.headRow)").forEach(i => i.remove());
    ul.querySelectorAll("li").forEach(item => item.classList.remove('active'));
    clickedItem.classList.add("active");
    /////////////////////////// FETCHING //////////////////////////////////
    document.querySelector(".popularTableLoader").style.display = "block"
    document.querySelector(".popularTable").style.display = "none"
    fetch(`data/main_list_data${index + 1}.json`).then(res => res.json()).then(data => {
        var data__size = data.length;
        if (data__size > 5) {
            data__size = 5;
            document.querySelector(".popularMore").style.display = "block"
        }
        else {
            document.querySelector(".popularMore").style.display = "none"
        }
        document.querySelector(".popularTableLoader").style.display = "none"
        document.querySelector(".popularTable").style.display = "block"
        document.querySelector(".popularMore button").onclick = () => {
            document.querySelector(".popularMore").style.display = "none"
            document.querySelectorAll(".popularTable table tr:not(.headRow)").forEach(i => i.remove())
            DATA(data, data.length)
        }
        DATA(data, data__size)
    });
}

fetch("data/main_list_data1.json").then(res => res.json()).then(data => {
    var data__size = 5;
    if (data.length > 5) {
        document.querySelector(".popularMore").style.display = "block"
    }
    else {
        document.querySelector(".popularMore").style.display = "none"
    }
    document.querySelector(".popularTableLoader").style.display = "none"
    document.querySelector(".popularTable").style.display = "block"
    document.querySelector(".popularMore button").onclick = () => {
        data__size = data.length
        document.querySelector(".popularMore").style.display = "none"
        document.querySelectorAll(".popularTable table tr:not(.headRow)").forEach(i => i.remove())
        DATA(data, data__size)
    }
    DATA(data, data__size)
});

var DATA = (data, data__size) => {
    for (let i = 0; i < data__size; i++) {
        document.querySelector(".popularTable table")
            .insertAdjacentHTML("beforeend", `<tr onclick="window.location.href='./result.html'">
            <td>${i + 1}</td>
            <td><img src="https://loremflickr.com/20/20" style="border-radius:50%"/></td>
                            <td>${data[i].name}</td>
                            <td>${data[i].data.total_mapping}</td>
                            <td>${data[i].data.total_variables}</td>
                            <td>${data[i].data.total_key_sources}</td>
                            <td>${data[i].data.complexity_score.toFixed(2)} <div style="position:relative;"><img src="asset/score.png" style="position:absolute;left:0;height:5px;width:100%"/><div class="score__pos" style="position:absolute;right:0;height:5px;background:white"></div></div></td>
                            </tr>
                            `);
        var element = document.querySelector('.popularTable');
        if (element.scrollWidth > element.clientWidth) {
            element.querySelectorAll("tr td:nth-child(1)").forEach(i => i.style = "position: sticky;background: #041938;left: 0px;");
            element.querySelectorAll("tr th:nth-child(1)").forEach(i => i.style = "position: sticky;background: #006aff;left: 0px;")
            element.querySelectorAll("tr td:nth-child(2)").forEach(i => i.style = "position: sticky;background: #041938;left: 60px;")
            element.querySelectorAll("tr th:nth-child(2)").forEach(i => i.style = "position: sticky;background: #006aff;left: 60px;")
        }
    }
    (function exists() {
        const els = document.querySelectorAll(".popularTable table tr:not(.headRow)");
        console.log(els)
        if (els.length<2) {
            return setTimeout(exists)
        }
        els.forEach(el => {
            el.querySelector(".score__pos").style.width=(100 - el.querySelector("td:nth-child(7)").innerText) + "%";
        })
    })();
}