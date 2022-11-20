import {exerciseList } from './data.js'

let fields = {
    'username': 'Test User',
    'email': 'test@test.com',
    'password': 'test',
    'birthday': '1994-03-21',
    'height': '185cm',
    'weight': '135lbs',
    'bodyfat' : '7%',
    'workout_preferences': [1,2,3,4]
}


const content = $('.profile')
 const capitalize = (str) => {
   return `${str[0].toUpperCase()}${str.slice(1)}`
 }

let profile_picture = `
      <div class="col-md-3">
        <div class="text-center">
          <img src="https://www.shareicon.net/data/512x512/2016/07/21/799367_user_512x512.png" class="avatar img-circle img-thumbnail" alt="avatar">
          <h6>Upload a different photo...</h6>
          <input type="file" class="form-control">
        </div>
      </div>
`

const unitSplit = (test) => {
    let unit  = test.trim().split(/\d+/g).filter(n=>n).pop().trim();
    let value = test.trim().split(unit).filter(n=>n)[0].trim()
    return [value, unit]
}

content.append('<div class="row">')
const row = $('.row')
row.append(profile_picture)

let personal_info = `<div class="col-md-9 info">
        <h3>Personal info</h3>
        <form class="form-horizontal" role="form">
`
row.append(personal_info)
const info = $('.form-horizontal') 

const measurements = ['bodyfat','height','weight']

Object.entries(fields).forEach(([k,v])=>{
    let group = `
          <div class="form-group">
            <label class="col-lg-3 control-label">${capitalize(k)}</label>
            <div class="col-lg-8">
    `
    let input = `<input class="form-control" type="text" value="${v}">`

    if (measurements.includes(k)){
        let [value, unit] = unitSplit(v);
        input = `
        <div class="input-group mb-3">
        <input type="number" class="form-control" placeholder="${value}">
        <span class="input-group-text">${unit}</span>
        </div>`
    }
    if (k == 'birthday'){
        input = `<input class="form-control birthday" id="date" type="date" value="${v}">`
    }
    if (k == 'workout_preferences'){
        input = `
            <select id="user_pref" class="form-select" multiple>
                ${exerciseList.map((val, idx)=>{
                    return `<option value="${idx+1}" ${(v.includes(idx+1) ? 'selected' : '')}>${val.muscle}</option>`
                })}
            </select>
        `
    }
    info.append($(group + input))
});


info.append($('<div class="mt-4"><button id="btn-save" type="button" class="btn btn-primary">Save</button>'))

$('.container').on('click', '#btn-save', ()=>{
    // alert('Your data has been saved')
    $('#btn-save').text('Your data has been saved')
    $('#btn-save').addClass('btn-success')
    setTimeout(()=>{
        $('#btn-save').removeClass('btn-success')
        $('#btn-save').text('Save')
    }, 1500)
})

export default {fields}