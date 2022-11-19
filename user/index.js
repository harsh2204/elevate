import fields from './profile.js'
import workouts from './workouts.json' assert {type: 'json'};
// console.log(workouts)

// let data_set = []
// for (let x of workouts){
//     let d = {x:x['date'], y:x['workouts'].length}
//     date_set.push(d)
// }

// let point_data = []
// for (let x of workouts){
//     let d = {x:x['date'], y:x['workouts'].length}
//     point_data.push(d)
// }
// const data = {
//     datasets: [{
//         data: workouts,
//     }],
//     // labels:['Date', 'Workouts']
// }
let muscle_datasets = {};
for (let x of workouts){
    let d = x['date']
    Object.entries(x.workouts).forEach(([k,v]) => {
        if (!(k in muscle_datasets))
            muscle_datasets[k] = []
        muscle_datasets[k].push({date:d, total:v.length})
    })
    // console.log(d, JSON.stringify(lens))
}

let datasets = [{
            label: 'Total Daily Exercises',
            data: workouts,
            parsing:{
                xAxisKey:'date',
                yAxisKey:'total',
            }
        },
]

Object.entries(muscle_datasets).forEach(([k,v])=>{
    datasets.push({
        label:`Muscle Group (${k})`,
        data: v,
        hidden: true,
        parsing:{
            xAxisKey:'date',
            yAxisKey:'total',
        }
    })
})

const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: datasets,
    },
    options: {
      scales: {
       x: {
            title: {
                display: true,
                text: 'Date'
            },
            ticks: {
                callback: (val, idx, ticks)=> new Date(workouts[idx].date*1000).toString().split(' ').splice(0,4).join(' '),
        
        }
        },
        y: {
            title: {
                display: true,
                text: 'Total Exercises'
            },
            stacked:true,
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: (ctx)=>{
              return new Date().toString(parseInt(ctx[0].label)*1000).split(' ').splice(0,4).join(' ')
            },
          }
        }
      }
    },
  });