// Stats Animation
document.addEventListener("DOMContentLoaded", () => {
  const statsCards = document.querySelectorAll(".Stats .card");
  let hasAnimated = false;
  const duration = 2000; // Total duration for the animation in milliseconds

  const animateCards = () => {
    statsCards.forEach((card) => {
      const valueElement = card.querySelector("h1");
      const targetValue = parseInt(valueElement.textContent, 10);
      const startTime = performance.now();

      const updateValue = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Normalize progress to 1

        const currentValue = Math.floor(targetValue * progress);
        valueElement.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        } else {
          // Ensure the final value is set
          valueElement.textContent = targetValue;
        }
      };

      requestAnimationFrame(updateValue);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (!hasAnimated) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger the animation once when the first card comes into view
            animateCards();
            hasAnimated = true;
          }
        });
      }
    },
    { threshold: 0.1 }
  );

  statsCards.forEach((card) => {
    observer.observe(card);
  });
});

// Skills Animation
document.addEventListener("DOMContentLoaded", () => {
  const skillsProcesses = document.querySelectorAll(
    ".section-progress .process"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const process = entry.target;
          const width = process.getAttribute("data-width");
          process.style.width = width;
          process.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  skillsProcesses.forEach((process) => {
    observer.observe(process);
  });
});
