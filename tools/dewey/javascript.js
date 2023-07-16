// OPTIONS
const luminance = 50
const saturation = 100


document.querySelectorAll('h2 span.mw-headline').forEach(heading => {
  // console.log(heading.textContent)
  let content = heading.textContent
  content = content.replace('Class ', '')
  // content = content.replace(' – ', '')

  let number = content.substring(0, 3)
  let name = content.substring(6)

  content = '<span class="number">' + number + '</span>' + '<span class="label">' + name + '</span>'
  heading.innerHTML = content
})

//add class to level 1 list
document.querySelectorAll('.mw-parser-output > ul').forEach(item => {
  item.classList.add('sub-list')
})

document.querySelectorAll('.mw-parser-output > ul > li').forEach(item => {
  item.classList.add('sub-list-item')
})

// add class to level 2 list
document.querySelectorAll('.mw-parser-output > ul li > ul').forEach(item => {
  item.classList.add('deep-list')
})

document.querySelectorAll('.mw-parser-output > ul li > ul > li').forEach(item => {
  item.classList.add('deep-list-item')
})


// set up top level
let top_levels = document.querySelectorAll('.mw-parser-output > h2')
top_levels.forEach(heading => {
  let index = Array.from(top_levels).indexOf(heading)
  heading.style.borderColor = `hsl(${36*index},${saturation}%,${luminance}%)`
  heading.nextElementSibling.style.borderColor = `hsl(${36*index},${saturation}%,${luminance}%)`
  heading.nextElementSibling.setAttribute('baseHue', 36*index)

  // set up top level opening
  heading.addEventListener('click', () => {
    heading.nextElementSibling.classList.toggle('open')
  })
})

// set up deep level opening
document.querySelectorAll('.mw-parser-output .sub-list-item b').forEach(item => {

  // let base_hue = item.parentNode.parentNode.getAttribute('baseHue')
  //
  // let index = Array.from(item.parentNode.parentNode.children).indexOf(item.parentNode)
  // console.log(index)

  // item.parentNode.style.borderColor = `hsl(${base_hue + (index * 3.6)},${saturation}%,${luminance}%)`

  item.addEventListener('click', () => {
    item.nextElementSibling.classList.toggle('open')
  })
})


// remove hyperlinks

document.querySelectorAll('#bodyContent a').forEach(link => {
  link.removeAttribute('href')
})

// classer function for name and label
const seperateNumberAndLabel = (input) => {
  let content = input

  let number = content.substring(0, 3)
  let name = content.substring(3)

  content = '<span class="number">' + number + '</span>' + '<span class="label">' + name + '</span>'

  return content
}

// seperate number and label for deep list
document.querySelectorAll('.deep-list-item').forEach(item => {
  item.innerHTML = seperateNumberAndLabel(item.textContent)
})

// seperate number and label for deep list
document.querySelectorAll('.sub-list-item b').forEach(item => {
  item.innerHTML = seperateNumberAndLabel(item.innerHTML)

})
