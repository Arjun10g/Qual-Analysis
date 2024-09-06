document.addEventListener('DOMContentLoaded', () => {
    const papers = document.querySelectorAll('.paper');
    const contentBox = document.getElementById('contentBox');
    const contents = document.querySelectorAll('.content');
    let activePaper = null;

    // Set height for contentBox based on height of header so it fits the entire page
    const headerHeight = document.querySelector('.header').clientHeight;
    contentBox.style.height = `calc(90vh - ${headerHeight
        + parseInt(getComputedStyle(contentBox).marginTop, 10)
        + parseInt(getComputedStyle(contentBox).marginBottom, 30)}px)`;




  
    // Hide all content sections initially
    contents.forEach(content => content.style.display = 'none');
  
    papers.forEach(paper => {
      paper.addEventListener('click', () => {
        const contentId = `content${paper.id.replace('paper', '')}`;
  
        // Only allow one paper to be clickable at a time
        if (activePaper === paper) return;
  
        // Hide all content sections and stop GSAP animations
        gsap.to('.content', { opacity: 0, duration: 0.5});
        gsap.set('.content', { display: 'none' }, { delay: 0.5 });
  
        // If no content is visible, reveal the content box
        if (getComputedStyle(contentBox).display === 'none') {
          gsap.set(contentBox, { display: 'block' });
          gsap.to(contentBox, { opacity: 1,  duration: 0.5 });
        }
  
        // Show the content associated with the clicked paper
        const contentToShow = document.getElementById(contentId);
        gsap.set(contentToShow, { display: 'block' });
        gsap.from(contentToShow, { y: -300,duration: 0.5 });
        gsap.to(contentToShow, { opacity: 1,duration: 0.5 });
  
        // Set the active paper
        activePaper = paper;
  
        // Add animation for paper click
        gsap.fromTo(paper, { scale: 1 }, { scale: 1.1, duration: 0.3, yoyo: true, ease: 'power1.inOut' });
      });
    });
  });
  