const options = {
  fullScreen: { enable: false },
  background: {
    color: "rgba(124, 158, 236, 0.471)",
  },
  particles: {
    number: {
      value: 100,
    },
    color: {
      value: "random",
      animation: {
        enable: true,
        speed: 50,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: 5,
      random: true,
      animation: {
        enable: true,
        speed: 16,
        minimumValue: 0.1,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 100,
      color: "random",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "bubble",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 20,
        duration: 3,
        opacity: 0.8,
      },
      repulse: {
        distance: 100,
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
    },
  },
  detectRetina: true,
};

tsParticles.load("home", options);

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.15, // Trigger when 15% of the element is visible
  rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      // Optional: unobserve if we only want it to animate once
      // observer.unobserve(entry.target);
    } else {
        // Optional: remove class to animate out when scrolling away
        // entry.target.classList.remove("active");
    }
  });
}, observerOptions);

const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach((el) => observer.observe(el));

// Formspree Integration for Contact Form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Change button state
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    formStatus.innerText = "";

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("https://formspree.io/f/mdazjnnl", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.style.color = "green";
        formStatus.innerText = "Thanks! Your message has been sent successfully.";
        contactForm.reset();
      } else {
        const result = await response.json();
        formStatus.style.color = "red";
        formStatus.innerText = result.errors ? result.errors.map(error => error.message).join(", ") : "Oops! There was a problem submitting your form.";
      }
    } catch (error) {
      formStatus.style.color = "red";
      formStatus.innerText = "Oops! There was a problem connecting to the server.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message";
    }
  });
}
