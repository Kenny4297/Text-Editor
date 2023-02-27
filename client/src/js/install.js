const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //storing the triggered event
    window.deferredPrompt = event;

    //Showing/hiding the button
    butInstall.classList.toggle('hidden', false);
  });

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  //access the stored event when the button is clicked
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {
      return;
    }
  
    promptEvent.prompt();
    //Resetting the deferredPrompt 
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  //Clearing the prompt
  window.deferredPrompt = null;
});
