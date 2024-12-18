var copy__btn = document.querySelector(".contractDetail button");
copy__btn.onclick = () => {
    navigator.clipboard.writeText(document.querySelector(".result__addr").innerHTML);
    const tooltip = document.querySelector('.copy__tooltip');

    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';

    setTimeout(() => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    }, 2000);

}
fetch(`data/storage_data.json`).then(res => res.json()).then(data => {
    for(let i=0;i<data.length;i++) {
        document.querySelector(".summaryDetailsBox table")
                .insertAdjacentHTML("beforeend", `<tr>
                                <td>${data[i][4]}</td>
                                <td>${data[i][0]}</td>
                                <td><span>${data[i][1]}</span></td>
                                <td>${data[i][2]}</td>
                            </tr>`)
    }
    var summary__type=document.querySelectorAll(".summaryDetailsBox table tr td:nth-child(3)");
    summary__type.forEach(i=> {
        if(i.innerText=="string") {
            i.querySelector("span").style.background="crimson"
        } else if(i.innerText=="bool") {
            i.querySelector("span").style.background="purple"
        }
    })
});

fetch(`data/storage_data.json`).then(res => res.json()).then(data => {
    for(let i=0;i<data.length;i++) {
        document.querySelector(".layoutDetailsBox table")
                .insertAdjacentHTML("beforeend", `<tr>
                                <td>${data[i][4]}</td>
                                <td>${data[i][0]}</td>
                            </tr>`)
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////

const ctx = document.getElementById('myChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 100, 0);
gradient.addColorStop(0, "green");
gradient.addColorStop(0.25, "limegreen");
gradient.addColorStop(0.5, "yellow");
gradient.addColorStop(0.75, "orange");
gradient.addColorStop(1, "red");

const gaugeChartText = {
    id: 'gaugeChartText',
    afterDatasetsDraw(chart, args, pluginOptions) {
        const { ctx } = chart;
        ctx.save();
        const score = chart.data.datasets[0].data[0];
        const angle = Math.PI + (score / 100) * Math.PI; // Calculate angle
        const xCor =  chart.getDatasetMeta(0).data[0].x;
        const yCor = chart.getDatasetMeta(0).data[0].y - 12;

        const radius = (chart.chartArea.bottom - chart.chartArea.top) / 2;

        const x = xCor + Math.cos(angle) * (radius + 5);
        const y = yCor + Math.sin(angle) * (radius + 5);

        ctx.beginPath();
        ctx.moveTo(x, y); // Triangle tip
        ctx.lineTo(
            xCor + Math.cos(angle - 0.15) * (radius - 5),
            yCor + Math.sin(angle - 0.15) * (radius - 5)
        );
        ctx.lineTo(
            xCor + Math.cos(angle + 0.15) * (radius - 5),
            yCor + Math.sin(angle + 0.15) * (radius - 5)
        );
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.restore();

        ctx.font = '15px sans-serif';
        ctx.textAlign = "center";
        ctx.fillStyle = '#fff';
        ctx.textBaseLine = "top";
        ctx.fillText(`${score}%`, xCor, yCor - 5)
    }
}
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Scale', 'Gray Area'],
        datasets: [{
            label: 'Complexity Score',
            data: [50],
            borderWidth: 1,
            backgroundColor: [
                gradient
            ],
            borderColor: [
                gradient
            ],
            cutout: '90%',
            circumference: 180,
            rotation: 270
        }]
    },
    options: {
        aspectRatio: 1.5,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    },
    plugins: [gaugeChartText]
});