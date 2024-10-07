// Function to create and add a faded box to the scene
import { camera, planets} from './createScene.js'
let following = "Default";
export function createInfoBox() {
    const infoBox = document.createElement('div');
    infoBox.style.position = 'absolute';
    infoBox.style.top = '10px';
    infoBox.style.left = '10px';
    infoBox.style.width = '300px'; // Increased width to accommodate live time
    infoBox.style.height = '400px'; // Increased height to accommodate extra controls
    infoBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // Black with 20% opacity for fade effect
    infoBox.style.color = 'white';
    infoBox.style.padding = '10px';
    infoBox.style.borderRadius = '5px';
    infoBox.style.display = 'flex';
    infoBox.style.flexDirection = 'column';
    infoBox.style.justifyContent = 'space-around';
    infoBox.style.alignItems = 'center';

    const info = document.createElement('div');
    info.style.padding = '3px';
    info.style.border = '2px solid grey';
    info.innerHTML = "Note: The position of the planets along the orbits is accurate, however, the size of the planets, and their orbits are scaled artistically";
    infoBox.appendChild(info);
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

    // Container for checkboxes
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.display = 'flex';
    checkboxContainer.style.flexDirection = 'column';
    checkboxContainer.style.alignItems = 'flex-start'; // Align checkboxes to the left
    checkboxContainer.style.marginTop = '5px';
    checkboxContainer.style.rowGap = '2px'; // Decrease line spacing between checkboxes

    // Orbit lines checkbox
    const orbitContainer = document.createElement('div');
    orbitContainer.style.display = 'flex';
    orbitContainer.style.alignItems = 'center';

    const orbitCheck = document.createElement('input');
    orbitCheck.type = 'checkbox';
    orbitCheck.style.marginRight = '5px';
    orbitCheck.id = 'toggleOrbitLine';

    const orbitLabel = document.createElement('label');
    orbitLabel.htmlFor = 'toggleOrbitLine';
    orbitLabel.innerHTML = 'Hide Orbit Lines';

    orbitContainer.appendChild(orbitCheck);
    orbitContainer.appendChild(orbitLabel);
    checkboxContainer.appendChild(orbitContainer);

    // Planet names checkbox
    const nameContainer = document.createElement('div');
    nameContainer.style.display = 'flex';
    nameContainer.style.alignItems = 'center';

    const nameCheck = document.createElement('input');
    nameCheck.type = 'checkbox';
    nameCheck.style.marginRight = '5px';
    nameCheck.id = 'togglePlanetNames';

    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'togglePlanetNames';
    nameLabel.innerHTML = 'Hide Planet Names';

    nameContainer.appendChild(nameCheck);
    nameContainer.appendChild(nameLabel);
    checkboxContainer.appendChild(nameContainer);

    infoBox.appendChild(checkboxContainer);

    // Placeholder functions for toggling orbit lines and planet names
    function toggleOrbitLines(visible) {
        console.log(`Orbit lines are now: ${visible ? 'visible' : 'hidden'}`);
        for (const [p_name, planet] of Object.entries(planets)) {
            if (p_name !== "Sun") {
                planet.ellipse.visible = visible;
            }
        }
        // Add logic to show/hide orbit lines in your scene
    }

    function togglePlanetNames(visible) {
        console.log(`Planet names are now: ${visible ? 'visible' : 'hidden'}`);
        for (const [p_name, planet] of Object.entries(planets)) {
            if (p_name !== "Sun") {
                planet.floatingText.visible = visible;
            }
        }
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

    // Container for planet selection radio buttons
    const planetsContainer = document.createElement('form');
    planetsContainer.style.marginTop = '10px';
    planetsContainer.style.display = 'flex';
    planetsContainer.style.flexDirection = 'column'; 
    planetsContainer.style.alignItems = 'flex-start'; // Align to the left for better layout control
    planetsContainer.style.rowGap = '5px'; // Space between rows
    planetsContainer.style.width = '100%';

    const planetNames = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

    planetNames.forEach(planet => {
        const planetRadioContainer = document.createElement('div');
        planetRadioContainer.style.display = 'flex';
        planetRadioContainer.style.alignItems = 'center'; 

        const planetRadio = document.createElement('input');
        planetRadio.type = 'radio';
        planetRadio.name = 'options';
        // planetRadio.name = 'planetSelection';
        planetRadio.value = planet;
        planetRadio.style.marginRight = '5px'; 

        console.log("planetRadio.value: ", planetRadio.value)

        const planetLabel = document.createElement('label');
        planetLabel.innerHTML = planet;

        planetRadioContainer.appendChild(planetRadio);
        planetRadioContainer.appendChild(planetLabel);
        planetsContainer.appendChild(planetRadioContainer);
    });

    const defaultRadioContainer = document.createElement('div');
    defaultRadioContainer.style.display = 'flex';
    defaultRadioContainer.style.alignItems = 'center'; 

    const defaultRadio = document.createElement('input');
    defaultRadio.type = 'radio';
    defaultRadio.name = 'options';
    // planetRadio.name = 'planetSelection';
    defaultRadio.value = "Default";
    defaultRadio.style.marginRight = '5px'; 
    defaultRadio.checked=true;

    console.log("planetRadio.value: ", defaultRadio.value)

    const defaultLabel = document.createElement('label');
    defaultLabel.innerHTML = "Default";

    defaultRadioContainer.appendChild(defaultRadio);
    defaultRadioContainer.appendChild(defaultLabel);
    planetsContainer.appendChild(defaultRadioContainer);
    function getSelectedOption(e) 
    {
        let pName = e.target.value;
        following = pName;
    }
    infoBox.appendChild(planetsContainer);


    planetsContainer.addEventListener('change', getSelectedOption);
    document.body.appendChild(infoBox);

}
export {following}
