// State
filters = new Set();
let added_exercises = []
count_of_exercises = 0;

// Display msg if added exercises is 0
if (added_exercises.length === 0) {
    const msg = document.createElement("p");
    msg.innerHTML = "Your workout currently has no exercises. Click the 'Add Exercise' button to add one.";
    msg.className = "no-workouts-msg";

    if (document.getElementById("added-exercises"))
        document.getElementById("added-exercises").appendChild(msg);
}

const triggerModal = (e) => {
    const discardBtn = document.getElementById("discard-button-modal");
    discardBtn.href = e.target.href;
}

const closeAlert = () => {
    const alert = document.querySelector(".alert");
    alert.style = "display: none";
}

const saveWorkout = () => {
    // Set input back to original style
    const name_input = document.getElementById('wname');
    name_input.style = "";

    // Check if workout has name
    const workoutName = document.getElementById("wname");
    if (workoutName.value === '') {
        const alert = document.querySelector(".alert");
        alert.style = "display: flex";

        const alert_msg = document.querySelector(".alert-msg");
        alert_msg.innerHTML = "<strong>Error:</strong> A workout must include a name!";

        // Highlight input
        name_input.style = "background-color: rgba(255,121,80, 0.3); border-color: rgba(255,121,80, 0.5);"
        return
    }

    // Check if workout has at least one exercise
    if (added_exercises.length === 0) {
        const alert = document.querySelector(".alert");
        alert.style = "display: flex";

        const alert_msg = document.querySelector(".alert-msg");
        alert_msg.innerHTML = "<strong>Error:</strong> A workout must include at least one exercise!";
        return
    }

    // Create workout object
    const workout = {
        "name": workoutName.value,
        "exercises": added_exercises
    }

    // Get current workout items from localStorage and append
    let user_workouts = []
    
    if (localStorage.user_workouts) {
        user_workouts = JSON.parse(localStorage.user_workouts);
        user_workouts.push(workout);
    } else {
        user_workouts = [workout]
    }
    localStorage.user_workouts = JSON.stringify(user_workouts);

    // Save alert to localstorage
    localStorage.setItem("suc-alert", workout.name);

    // Redirect to workouts-home
    location.href = 'workouts-home.html';
}

const openAddExerciseDiv = () => {
    // Show add-exercise div
    const add_exercise_div = document.getElementById("add-exercise");
    add_exercise_div.style = "display: block"

    // Hide add exercise button
    const add_exercise_btn = document.getElementById("add-exercise-btn");
    add_exercise_btn.style = "display: none";

    // Hide no workouts msg
    const msg = document.querySelector(".no-workouts-msg");
    if (msg) msg.style = "display: none";
}

const closeAddExerciseDiv = () => {
    // Hide add-exercise div
    const add_exercise_div = document.getElementById('add-exercise');
    add_exercise_div.style = "display: none"

    // Show add exercise button
    const add_exercise_btn = document.getElementById("add-exercise-btn");
    add_exercise_btn.style = "display: block";

    // Show no workouts msg
    const msg = document.querySelector(".no-workouts-msg");
    if (msg) msg.style = "display: block";

    // Reset form and clear filters
    let form = document.querySelector('#filter-exercises');
    form.reset();
    filters.clear();
}

const listExercises = (e) => {
    if (e) e.preventDefault();
    count_of_exercises = 0;

    // Check input
    const search_input = document.getElementById("exercise-search");
    if (search_input.value !== '') {
        handleInput({"target": search_input });
        return
    } 

    // Clear current exercises
    const list_of_exer_div = document.getElementById("list-of-exercises");
    list_of_exer_div.innerHTML = '';

    // Add each exercise to the div
    for (const [key, value] of Object.entries(exerciseList)) {
        for (const exerciseObject of value.exercises) {
            if (filters.size === 0 || filters.has(key))
                createExerciseDiv(key, exerciseObject);
        }
    }
    document.getElementById("count_of_exercises").innerHTML = `(${count_of_exercises})`
    openAddExerciseDiv();
}

const cancelAddExercise = () => {
    closeAddExerciseDiv();
}

const handleChange = (e) => {
    const exerciseName = e.target.value
    
    if (e.target.type === 'text') return

    if (e.target.checked) {
        filters.add(exerciseName);
    } else {
        filters.delete(exerciseName);
    }
    listExercises();
}

const handleInput = (e) => {
    // Clear current exercises
    const list_of_exer_div = document.getElementById("list-of-exercises");
    list_of_exer_div.innerHTML = '';
    count_of_exercises = 0;

    // Show exercises that start with search input
    for (const [key, value] of Object.entries(exerciseList)) {
        for (const exerciseObject of value.exercises) {

            const exercise = exerciseObject.exercise.toLowerCase();
            if (exercise.startsWith(e.target.value.toLowerCase())) {

                // Check filters
                if (filters.size === 0 || filters.has(key))
                    createExerciseDiv(key, exerciseObject);
            }
        }
    }
    document.getElementById("count_of_exercises").innerHTML = `(${count_of_exercises})`
}

const createExerciseDiv = (exerciseGroup, exerciseObject) => {
    count_of_exercises += 1;
    const list_of_exer_div = document.getElementById("list-of-exercises");
    const exerciseDiv = document.createElement("div");

    exerciseDiv.classList.add(`list-of-exercises__${exerciseGroup}`);
    exerciseDiv.classList.add(`list-group-item`);
    exerciseDiv.innerHTML = `
        <p class="list-of-exercises__name">${exerciseObject.exercise} (${exerciseGroup})</p>
        <div class="list-of-exercises__add tooltip1">
            <span 
                class="list-of-exercises__add__btn"
                data-id=${exerciseObject.id} 
                onClick="addExercise(event)">

                &plus;
            </span>
            <span class="tooltiptext">Add exercise</span>
        </div>
    `
    list_of_exer_div.appendChild(exerciseDiv);
}

const addExercise = (e) => {
    const id = parseInt(e.target.dataset.id);

    // Check if exercise is already in added exercises
    for (const exercise of added_exercises) {
        if (exercise.id === id) return
    }

    let exercise = {}

    // Find id in exerciseList
    for (const [key, value] of Object.entries(exerciseList)) {
        for (const exerciseObject of value.exercises) {
            if (exerciseObject.id === id) {
                exercise = exerciseObject
                break
            }
        }
    }

    // Append to array
    added_exercises.push(exercise);

    // Display the exercise
    const exerciseDiv = document.createElement("div");
    exerciseDiv.id = `added-exercises__${exercise.id}`;
    exerciseDiv.innerHTML = `
        <li id="added-exercise-${id}" class="added-exercise list-group-item">
            <p class="added-exercise-name">${exercise.exercise}</p>
            <div class="tooltip1">
                <button 
                    type="button" 
                    class="btn-close" 
                    aria-label="Close" 
                    data-idremove=${id} 
                    onClick="removeExercise(event)"></button>
                <span class="tooltiptext tooltiptext2">Remove exercise</span>
            </div>
        </li>
    `
    const added_exercises_div = document.querySelector(".added-exercises-list");
    added_exercises_div.appendChild(exerciseDiv);

    // Clear no workouts msg
    const msg = document.querySelector(".no-workouts-msg");
    if (msg) msg.remove();

    closeAddExerciseDiv();
}

const removeExercise = (e) => {
    const id = e.target.dataset.idremove

    // Remove from added_exercises
    added_exercises = added_exercises.filter(x => x.id !== parseInt(id));

    // Remove from DOM
    const element = document.getElementById(`added-exercise-${id}`)
    element.remove();

    // Possible add no-workouts-msg back
    if (added_exercises.length === 0) {
        const msg = document.createElement("p");
        msg.innerHTML = "Your workout currently has no exercises. Click the 'Add Exercise' button to add one.";
        msg.className = "no-workouts-msg";

        document.getElementById("added-exercises").appendChild(msg);
    }
}