import fields from './profile.js'
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