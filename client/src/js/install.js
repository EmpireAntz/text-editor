const butInstall = document.getElementById('buttonInstall');
let deferredPrompt
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredPrompt = event
    butInstall.style.display = 'block'
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, log the outcome of the prompt
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, clear it
        deferredPrompt = null;
        // Hide the install button after installation is done
        butInstall.style.display = 'none';
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed')
});