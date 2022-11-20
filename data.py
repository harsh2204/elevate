from datetime import timedelta, date
import random
import json
 
x =  '[{"muscle":"Chest","id":1,"exercises":[{"id":101,"exercise":"Dumbell Bench Press"},{"id":102,"exercise":"Close-Grip Bench Press"},{"id":103,"exercise":"Incline Bench Press"},{"id":104,"exercise":"Decline Bench Press"},{"id":105,"exercise":"Barbell Bench Press"},{"id":106,"exercise":"Dumbell Flyes"},{"id":107,"exercise":"Pushups"},{"id":108,"exercise":"Cables Flyes"},{"id":109,"exercise":"Chest Dips"},{"id":110,"exercise":"Machine Chest Press"}]},{"muscle":"Biceps","id":2,"exercises":[{"id":201,"exercise":"Hammer Curls"},{"id":202,"exercise":"EZ Bar Curls"},{"id":203,"exercise":"Dumbell Bicep Curls"},{"id":204,"exercise":"Barbell Bicep Curls"},{"id":205,"exercise":"Cable Curls"},{"id":206,"exercise":"Machine Bicep Curls"},{"id":207,"exercise":"Preacher Curls"}]},{"muscle":"Back","id":3,"exercises":[{"id":301,"exercise":"Pullups"},{"id":302,"exercise":"Bent-Over Row"},{"id":303,"exercise":"Back Extension"},{"id":304,"exercise":"Deadlift"},{"id":305,"exercise":"Lat Pulldown"},{"id":306,"exercise":"Seated Cable Row"},{"id":307,"exercise":"Single Arm Dumbell Row"},{"id":308,"exercise":"Incline Dumbbell Row"},{"id":309,"exercise":"Chinups"},{"id":310,"exercise":"Deficit Deadlift"},{"id":311,"exercise":"Chest Supported Row"}]},{"muscle":"Triceps","id":4,"exercises":[{"id":401,"exercise":"Triceps Dip"},{"id":402,"exercise":"Dumbell Floor Press"},{"id":403,"exercise":"EX Bar Skullcrusher"},{"id":404,"exercise":"Lying Triceps Extension"},{"id":405,"exercise":"Cable Triceps Pushdowns"},{"id":406,"exercise":"Seated Triceps Press"},{"id":407,"exercise":"One-Arm Overhead Extension"},{"id":408,"exercise":"Close-Grip Pushups"}]},{"muscle":"Shoulders","id":5,"exercises":[{"id":501,"exercise":"Military Press"},{"id":502,"exercise":"Dumbell Press"},{"id":503,"exercise":"Barbell Overhead Press"},{"id":504,"exercise":"Lateral Raises"},{"id":505,"exercise":"Face Pulls"},{"id":506,"exercise":"Clean and Press"},{"id":507,"exercise":"Front Raises"},{"id":508,"exercise":"Machine Shoulder Press"},{"id":509,"exercise":"Bent-Over Reverse Flyes"},{"id":510,"exercise":"Upright Rows"}]},{"muscle":"Abs","id":6,"exercises":[{"id":601,"exercise":"Crunches"},{"id":602,"exercise":"Ab Wheel Rollout"},{"id":603,"exercise":"Mountain Climbers"},{"id":604,"exercise":"Leg Raises"},{"id":605,"exercise":"Planks"},{"id":606,"exercise":"Deadbug"},{"id":607,"exercise":"Russian Twist"},{"id":608,"exercise":"Flutter Kick"},{"id":609,"exercise":"Seated Knee Tuck"},{"id":610,"exercise":"Side Plank"},{"id":611,"exercise":"Situps"},{"id":612,"exercise":"V-Ups"},{"id":613,"exercise":"Woodchoppers"}]},{"muscle":"Legs","id":7,"exercises":[{"id":701,"exercise":"Front Squat"},{"id":702,"exercise":"Back Squat"},{"id":703,"exercise":"Leg Press"},{"id":704,"exercise":"Lunges"},{"id":705,"exercise":"Bulgarian Split Squat"},{"id":706,"exercise":"Step Up"},{"id":707,"exercise":"Leg Extensions"},{"id":708,"exercise":"Romanian Deadlift"},{"id":709,"exercise":"Lying Leg Curls"},{"id":710,"exercise":"Seated Leg Curls"},{"id":711,"exercise":"Kettlebell Swings"},{"id":712,"exercise":"Hip Thrusts"},{"id":713,"exercise":"Glute Bridges"},{"id":714,"exercise":"Calf Raises"},{"id":715,"exercise":"Goblet Squat"},{"id":716,"exercise":"Single Leg Deadlift"},{"id":717,"exercise":"Hack Squat"},{"id":718,"exercise":"Good Morning"},{"id":719,"exercise":"Dumbbell RDL"},{"id":720,"exercise":"Cable Glute Kickback"},{"id":721,"exercise":"Machine Hip Abductors"},{"id":722,"exercise":"Machine Hip Adductors"}]},{"muscle":"Traps","id":8,"exercises":[{"id":801,"exercise":"Dumbells Shrugs"},{"id":802,"exercise":"Barbell Shrugs"},{"id":803,"exercise":"Farmer\'s Walk"},{"id":804,"exercise":"Rack Pulls"},{"id":805,"exercise":"Pullup Shrug"},{"id":806,"exercise":"Dumbbell Overhead Carry"},{"id":807,"exercise":"Snatch-Grip Barbell High Pull"},{"id":808,"exercise":"Romanian Deadlift"},{"id":809,"exercise":"Leg Curls"},{"id":810,"exercise":"Kettlebell Swings"}]}]'
ex = json.loads(x)

workouts = [{musc['muscle']:random.sample(musc['exercises'], random.randint(1, 3))} for musc in ex]
workouts = {k: [x['exercise'] for x in v] for m in workouts for k, v in m.items()}

# workouts = {musc['muscle']: [x['exercise'] for x in random.sample(musc['exercises'], random.randint(1, len(musc['exercises'])-1))] for musc in ex}

def daterange(start_date, end_date):
     for n in range(0, int((end_date - start_date).days) + 1, 7):
         yield start_date + timedelta(n)
         
def date_range(x, y, inclusive=False):

    inclusive_nr = 1 if inclusive else 0

    if isinstance(x, date) and isinstance(y, date):

        for i in range(x.toordinal(), y.toordinal() + inclusive_nr):
            yield date.fromordinal(i)

    else:
        raise TypeError("Parameters x and y should be dates.")


st = date(2022, 1, 1)
ed = date.today() #date(2022, 11, 15)

output = []
# for dt in daterange(st, ed):
for dt in date_range(st, ed):
    cats = random.sample(workouts.keys(), k=random.randint(1, len(workouts)-2))
    data = {
        'date': dt.strftime('%s'),
        'workouts': {c: random.sample(workouts[c], k=len(workouts[c])) for c in cats},
    }
    data['workouts'] = {k:v for k,v in data['workouts'].items() if v}
    data['total'] =  sum(len(v) for v in data['workouts'].values())
    if random.random() < 0.67:
        output.append(data)
    else:
        data['workouts'] = []
        data['total'] = 0
        output.append(data)
    # print(dt, data['total'])
with open('user/workouts.json', 'w') as F:
    json.dump(output, F, indent=2)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
