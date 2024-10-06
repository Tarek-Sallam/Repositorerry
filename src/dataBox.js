
// Function to create and add a faded box to the scene
export function createInfoBox() {
    const infoBox = document.createElement('div');
    infoBox.style.position = 'absolute';
    infoBox.style.top = '10px';
    infoBox.style.left = '10px';
    infoBox.style.width = '150px';
    infoBox.style.height = '100px';
    infoBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // Black with 50% opacity for fade effect
    infoBox.style.color = 'white';
    infoBox.style.padding = '10px';
    infoBox.style.borderRadius = '5px';
    infoBox.style.border = '2px solid white';
    infoBox.style.display = 'flex';
    infoBox.style.flexDirection = 'column';
    infoBox.style.justifyContent = 'space-around';
    infoBox.style.alignItems = 'center';

    let currentTime = new Date();

    const text = document.createElement('div');
    text.innerHTML = `Time: ${currentTime.toLocaleString()}`;
    infoBox.appendChild(text);


    const button = document.createElement('Button');
    button.innerHTML = 'LIVE';
    button.style.width = '60%';
    button.style.padding = '5px';
    button.style.borderRadius = '4px';
    button.style.border = '2px solid black';
    button.style.backgroundColor = 'grey';
    button.style.color = 'Black';
    button.style.cursor = 'pointer';
    infoBox.appendChild(button);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '-24';
    slider.max = '24';
    slider.style.width = '80%';
    infoBox.appendChild(slider);

    slider.addEventListener('input', () => {

        const currentTime = new Date(currentTime);
        currentTime.setHours(currentTime.getDay() + parseInt(slider.value));
        text.innerHTML = `Time: ${currentTime.toLocaleString()}`;
    });


    
    document.body.appendChild(infoBox);
}
