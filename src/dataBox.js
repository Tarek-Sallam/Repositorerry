// Function to create and add a faded box to the scene
export function createInfoBox() {
    const infoBox = document.createElement('div');
    infoBox.style.position = 'absolute';
    infoBox.style.top = '10px';
    infoBox.style.left = '10px';
    infoBox.style.width = '200px'; // Increased width to accommodate live time
    infoBox.style.height = '150px'; // Increased height to accommodate live time
    infoBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // Black with 20% opacity for fade effect
    infoBox.style.color = 'white';
    infoBox.style.padding = '10px';
    infoBox.style.borderRadius = '5px';
    //infoBox.style.border = '2px solid white';
    infoBox.style.display = 'flex';
    infoBox.style.flexDirection = 'column';
    infoBox.style.justifyContent = 'space-around';
    infoBox.style.alignItems = 'center';

    // Store current time
    let currentTime = new Date();
    let live = true;

    // Display current time
    const text = document.createElement('div');
    text.style.padding = '3px'
    text.style.border = '2px solid grey'
    text.innerHTML = `Time: ${currentTime.toLocaleString()}`; // Corrected to show full date and time
    infoBox.appendChild(text);

    // Button to direct live time
    const button = document.createElement('button');
    button.innerHTML = 'LIVE';
    button.style.width = '60%';
    button.style.padding = '5px';
    button.style.borderRadius = '4px';
    button.style.border = '2px solid white';
    button.style.backgroundColor = 'rgba(0,0,0,0)';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    infoBox.appendChild(button);

    // Slider to go through years
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '-100';
    slider.max = '100';
    slider.value = '0'; // Set to middle by default
    slider.style.width = '80%';
    infoBox.appendChild(slider);

    // Update time display every second only in live mode
    setInterval(() => {
        if (live) {
            currentTime = new Date();
            text.innerHTML = `Time: ${currentTime.toLocaleString()}`; // Show full date and time
        }
    }, 1000);

    // Update year with slider
    slider.addEventListener('input', () => {
        live = false;
        const adjYears = new Date(currentTime); // Create a new Date object
        adjYears.setFullYear(currentTime.getFullYear() + parseInt(slider.value)); // Adjust the year
        text.innerHTML = `Time: ${adjYears.toLocaleDateString()}`; // Display the adjusted date
    });

    // Set live mode when "LIVE" button is clicked
    button.addEventListener('click', () => {
        live = true;
        slider.value = '0'; // Reset slider to the middle
    });

    document.body.appendChild(infoBox);
}
