// Toggle Dark Mode
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

document.getElementById("theme-button").addEventListener("click", toggleDarkMode);

// Add Signature Function
const addSignature = (person) => {
  const newSignature = document.createElement('p');
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown}`;
  const signaturesDiv = document.querySelector('.signatures');
  signaturesDiv.appendChild(newSignature);

  // Call toggleModal to display modal
  toggleModal(person);
  
}

// Validate Form Function
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  };

  // Name validation
  if (person.name.length < 2) {
    containsErrors = true;
    // Add relevant error display logic
  }

  // Hometown validation
  if (person.hometown.length < 2) {
    containsErrors = true;
    // Add relevant error display logic
  }

  // Email validation
  if (!person.email.includes('.com')) {
    containsErrors = true;
    // Add relevant error display logic
  }

  if (!containsErrors) {
    addSignature(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
  }
}

const signNowButton = document.getElementById('sign-now-button');
signNowButton.addEventListener('click', validateForm);

// Reveal Animations
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

const revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

// Reduce Motion
const reduceMotion = () => {
  animation.transitionDuration = 'none';
  animation.revealDistance = 0;
  animation.initialOpacity = 1;

  revealableContainers.forEach(container => {
    container.style.transition = `all ${animation.transitionDuration} ${animation.transitionTimingFunction}`;
    container.style.transform = `translateY(${animation.revealDistance}px)`;
    container.style.opacity = animation.initialOpacity;
  });
}

document.getElementById('reduceMotionBtn').addEventListener('click', reduceMotion);


// Function to close the modal
const closeModal = () => {
  const modal = document.getElementById('thanks-modal');
  modal.style.display = 'none';
}

// Select the close button and add an event listener
const closeButton = document.getElementById('close-modal-btn');
closeButton.addEventListener('click', closeModal);


// toggle modal function
const toggleModal = (person) => {
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('thanks-modal-content');

  // Set the display of the modal to flex to make it visible
  modal.style.display = "flex";

  // Display a thank you message including the user's name
  modalContent.textContent = `Thank you so much ${person.name}! Your support is appreciated.`;

  // Hide the modal after a set time (e.g., 4000 milliseconds = 4 seconds)
  setTimeout(() => {
    closeModal();
  }, 4000);
  
}
