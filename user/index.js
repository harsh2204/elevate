// import fields from './profile.js'
import workouts from './workouts.json' assert {type: 'json'};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

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

let muscle_totals = {};
for (let m in muscle_datasets){
  let total = muscle_datasets[m].map((x) => x.total).reduce((a, b) => a + b, 0);
  muscle_totals[m] = total 
}
// console.log(muscle_datasets)

let muscle_months = {}
for (let m in muscle_datasets){
  let dates = muscle_datasets[m]
  let months = {};
  dates.forEach((x)=>{
    const dt = new Date(x.date*1000);
    const month =  dt.toLocaleString('default', { month: 'long' });
    //dt.getMonth()
    if (!(month in months))
      months[month]= 0
    months[month] += x.total 
  })
  muscle_months[m] = months;
}
console.log(muscle_months)

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
        label:`${k} Workouts`,
        data: v,
        hidden: true,
        parsing:{
            xAxisKey:'date',
            yAxisKey:'total',
        }
    })
})



function get_lastn_days(n){
  let muscles = {};
  for (let m in muscle_datasets){
    let total = muscle_datasets[m].map((x) => {
      const dt = new Date(x.date*1000);
      const now = Date.now();
      const diffTime = Math.abs(now - dt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return  (diffDays < n) ? x.total : 0
    }).reduce((a, b) => a + b, 0);
    muscles[m] = total
  }
  return muscles

}

const muscles_lastweek = get_lastn_days(14);
const muscles_lastmonth = get_lastn_days(30);
const muscles_lastyear = get_lastn_days(365);

const donut_data = {
  labels : Object.keys(muscle_totals),
  datasets: [
    {
      label: 'Total Muscle Distribution in Exercises',
      data: Object.values(muscle_totals)
    },
    {
      label: 'Workouts Last Year',
      data: Object.values(muscles_lastyear),
    },
    {
      label: 'Workouts Last Month',
      data: Object.values(muscles_lastmonth)
    },
    {
      label: 'Workouts Last Week',
      data: Object.values(muscles_lastweek)
    },
  ]
}
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const radar_data = {
  labels : monthNames,
  datasets: Object.entries(muscle_months).map(([k,v]) =>{ 
    return {
      label: k,
      data : monthNames.map((m) =>{
        return (m in v) ? v[m] : 0
      }),
    }
  }), 
}
const radar = document.getElementById('radar');
  new Chart(radar, {
    type: 'radar',
    data: radar_data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Monthly Breakdown per Muscle'
        }
      }
    },
  });

const donut1 = document.getElementById('donut');
  new Chart(donut1, {
    type: 'doughnut',
    data: donut_data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Weekly, Monthly, Yearly Totals'
        }
      }
    },
  });

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

  // Object.entries(work).forEach(([k,v])=>{

    // console.log(calendarInstance)
  // })

  let muscles = ['Chest', 'Biceps', 'Back', 'Triceps', 'Shoulders', 'Abs', 'Legs', 'Traps']
  let colors = ['#ffff00', '#ff7f00', '#cc00af', '#ff0000', '#00ff00', '#7308a5', '#00aeae', '#0000ff']
  let colormap = {};
  muscles.forEach((m, i) => {
    colormap[m] = colors[i];
  })

  var calendarInstance = new calendarJs( "myCalendar", {
    exportEventsEnabled: true, 
    manualEditingEnabled: true, 
    showTimesInMainCalendarEvents: false,
    // minimumDayHeight: 0,
    manualEditingEnabled: true,
    organizerName: "Your Name",
    organizerEmailAddress: "your@email.address",
    visibleDays: [ 0, 1, 2, 3, 4, 5, 6 ]
  } ); 
  function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 70 * 1000);

  return date;
}
  
  calendarInstance.addEvents( getEvents() );

  function getEvents() {
    let events = [];
    workouts.forEach((w)=>{
      if (w.workouts.length != 0){
      let counter = 0;
      Object.entries(w.workouts).map(([k,v])=>{
        let desc =  v.map((e)=> `\n\t* ${e}  - ${getRandomArbitrary(2,4)} SETS X ${getRandomArbitrary(3,8)} REPS`).join('')
        let new_d = {}
        new_d.title = `${k} Workouts`
        new_d.description = desc
        new_d.color = colormap[k]
        new_d.from = addHours(counter, new Date(w.date*1000))
        new_d.to = addHours(counter+1, new Date(w.date*1000))
        new_d.group = k;
        counter= counter + 1;
        // console.log(new_d)
        if (new_d.color == '#ffff00')
          new_d.colorText = '#000000'
        events.push(new_d);
      });
      }
    })
    // console.log(events)
    return events;
  }