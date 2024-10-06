// Function to create and add a faded box to the scene
export function createInfoBox() {
    const infoBox = document.createElement('div');
    infoBox.style.position = 'absolute';
    infoBox.style.top = '10px';
    infoBox.style.left = '10px';
    infoBox.style.width = '300px'; // Increased width to accommodate live time
    infoBox.style.height = '250px'; // Increased height to accommodate extra controls
    infoBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // Black with 20% opacity for fade effect
    infoBox.style.color = 'white';
    infoBox.style.padding = '10px';
    infoBox.style.borderRadius = '5px';
    infoBox.style.display = 'flex';
    infoBox.style.flexDirection = 'column';
    infoBox.style.justifyContent = 'space-around';
    infoBox.style.alignItems = 'center';

    // Store current time
    let currentTime = new Date();
    let live = true;

    // Display current time
    const text = document.createElement('div');
    text.style.padding = '3px';
    text.style.border = '2px solid grey';
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

    // Container for orbit lines checkbox and label
    const orbitContainer = document.createElement('div');
    orbitContainer.style.display = 'flex';
    orbitContainer.style.alignItems = 'center';
    orbitContainer.style.marginTop = '5px';

    const orbitCheck = document.createElement('input');
    orbitCheck.type = 'checkbox';
    orbitCheck.style.marginRight = '5px';
    orbitCheck.id = 'toggleOrbitLine';

    const orbitLabel = document.createElement('label');
    orbitLabel.htmlFor = 'toggleOrbitLine';
    orbitLabel.innerHTML = 'Hide Orbit Lines';

    orbitContainer.appendChild(orbitCheck);
    orbitContainer.appendChild(orbitLabel);
    infoBox.appendChild(orbitContainer);

    // Container for planet names checkbox and label
    const nameContainer = document.createElement('div');
    nameContainer.style.display = 'flex';
    nameContainer.style.alignItems = 'center';
    nameContainer.style.marginTop = '5px';

    const nameCheck = document.createElement('input');
    nameCheck.type = 'checkbox';
    nameCheck.style.marginRight = '5px';
    nameCheck.id = 'togglePlanetNames';

    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'togglePlanetNames';
    nameLabel.innerHTML = 'Hide Planet Names';

    nameContainer.appendChild(nameCheck);
    nameContainer.appendChild(nameLabel);
    infoBox.appendChild(nameContainer);

    // Placeholder functions for toggling orbit lines and planet names
    function toggleOrbitLines(visible) {
        console.log(`Orbit lines are now: ${visible ? 'visible' : 'hidden'}`);
        // Add logic to show/hide orbit lines in your scene
    }

    function togglePlanetNames(visible) {
        console.log(`Planet names are now: ${visible ? 'visible' : 'hidden'}`);
        // Add logic to show/hide planet names in your scene
    }

    // Event listeners for checkboxes
    orbitCheck.addEventListener('change', () => {
        toggleOrbitLines(!orbitCheck.checked);
    });

    nameCheck.addEventListener('change', () => {
        togglePlanetNames(!nameCheck.checked);
    });

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
