let names = document.querySelectorAll('.name');

const colors = [
    '#FAD02E', // Light Yellow
    '#FFC0CB', // Light Pink
    '#ADD8E6', // Light Blue
    '#90EE90', // Light Green
    '#FFA07A', // Light Salmon
    '#FFB6C1', // Light Pink
    '#E6E6FA', // Lavender
    '#FFFACD', // Lemon Chiffon
    '#D3D3D3', // Light Gray
    '#F0E68C', // Khaki
    '#E0FFFF', // Light Cyan
    '#FAFAD2'  // Light Goldenrod Yellow
];

// Loop through each name and assign a different color
names.forEach((nameDiv, index) => {
    // Assign the color from the colors array, loop back if more names than colors
    nameDiv.style.color = colors[index % colors.length];
});

// Create a master timeline for sequential animations with repeat
const masterTimeline = gsap.timeline({ repeat: -1 }); // Endless loop

// Create a function to animate each name and then fade it out
function animateName(nameDiv) {
    // Select all the letter spans inside the name div (both first and last name letters)
    const letters = nameDiv.querySelectorAll('div');

    // Create a timeline for the name
    const tl = gsap.timeline();

    // First, hide all names except the current one
    tl.set(names, { opacity: 0, display: 'none' }); // Hide all other names

    // Show the current name
    tl.set(nameDiv, { display: 'flex', opacity: 1 }); // Make the current name visible

    // Animate each letter in the name with a delay between them
    letters.forEach((letter, index) => {
        tl.fromTo(letter, 
            { opacity: 0, y: -100 },   // Start from higher position for a stronger bounce
            { opacity: 1, y: 0 },      // Animate to the normal position
            index * 0.5               // Slower delay between each letter
        );
    });

    // Once the name is fully displayed, wait 2 seconds, then fade it out
    tl.to(nameDiv, { opacity: 0, duration: 1 }, "+=2")
      .set(nameDiv, { display: 'none' }); // Hide the name after it fades out

    return tl;
}

// Loop through each name in the NodeList and add to master timeline
names.forEach((nameDiv) => {
    // Add the animation for each name to the master timeline
    masterTimeline.add(animateName(nameDiv));
});


