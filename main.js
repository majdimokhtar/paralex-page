import './style.css'


const slideBtns= document.querySelectorAll("[data-slideBtn]")
const slideContainer = document.querySelector('[data-slideContainer]');
const slides= [...document.querySelectorAll("[data-slide]")]
let currentIndex =  0
let isMoving=false


function handleSlide(e){
    //TODO :see if slider already moving
    if (isMoving)return;
    isMoving=true
    e.currentTarget.id==="prev"
    ? currentIndex--
    : currentIndex++
    slideContainer.dispatchEvent(new Event("sliderMove"))
}
// remove add atribute fct
const removedisabledAttribute =(els)=>els.forEach(
    el=>el.removeAttribute("disabled")
)
// add 
const addDisabledAttribute =(els)=>els.forEach(
    el=>el.setAttribute("disabled","true")
)


//event Listners
slideBtns.forEach(btn=>btn.addEventListener("click",handleSlide))

slideContainer.addEventListener("sliderMove" , ()=>{
    // translate the container to right or left
    slideContainer.style.transform =`translateX(-${currentIndex*slides[0].clientWidth}px)`
    //remove disable attribute
     removedisabledAttribute(slideBtns)
    // renable disableattribute
    currentIndex === 0 && addDisabledAttribute([slideBtns[0]])
})
slideContainer.addEventListener("transitionend",()=>isMoving=false)

//disable img drag select

document.querySelectorAll("[data-slide] img").forEach(img=>img.ondragstart=()=>false)

// intersection observer slider

const sliderObserver = new IntersectionObserver((slide)=>{
if(slide[0].isIntersecting){
    addDisabledAttribute([slideBtns[1]])
}
},{threshold: .75})

sliderObserver.observe(slides[slides.length -1])


// form handler
const contactForm=document.querySelector("#contact-form")
const contactBtn=document.querySelector("#contact-btn")
const contactInput=document.querySelector("#email")
// fake sending email
function postEmailToDatabase(email){
    console.info(`Your email is ${email}`);
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

// options for submit button
const contactBtnOptions = {
    pending: `
      <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
      <span class="uppercase tracking-wide animate-pulse">
      Sending...
      </span>
    `,
    success: `
    <span class="uppercase tracking-wide">
      Thank you!
      </span>
      <span class="uppercase tracking-wide">
      ✌️
      </span>`,
  };


async function handleSubmit (e){
e.preventDefault()
addDisabledAttribute([contactForm,contactBtn])
contactBtn.innerHTML =contactBtnOptions.pending
const userEmail= contactInput.value
contactInput.style.display= "none"
await postEmailToDatabase(userEmail)
contactBtn.innerHTML =contactBtnOptions.success
}
//form submit event
contactForm.addEventListener("submit" ,handleSubmit)


// fade up obsorver
const fadeUpCallback =(elemsToWatch)=>{
    elemsToWatch.forEach((elem)=>{
    if (elem.isIntersecting) {
        elem.target.classList.add("faded")
        fadeUpObserver.unobserve(elem.target)
        elem.target.addEventListener("transitionend", () => {
        elem.target.classList.remove("fade-up", "faded");
          }, { once: true })
    }
})
}
const FadeUpoptions = {
    threshold: .6,
  }
const fadeUpObserver = new IntersectionObserver (
    fadeUpCallback,FadeUpoptions
    )


document.querySelectorAll(".fade-up").forEach((item)=>{
    fadeUpObserver.observe(item)
})