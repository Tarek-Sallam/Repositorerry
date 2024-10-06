
// Function to create and add a faded box to the scene
export function createInfoBox() {
    const infoBox = document.createElement('div');
    infoBox.style.position = 'absolute';
    infoBox.style.top = '10px';
    infoBox.style.left = '10px';
    infoBox.style.width = '150px';
    infoBox.style.height = '100px';
    infoBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Black with 50% opacity for fade effect
    infoBox.style.color = 'white';
    infoBox.style.padding = '10px';
    infoBox.style.borderRadius = '5px';
    infoBox.innerHTML = 'This is a box';
    document.body.appendChild(infoBox);
}
