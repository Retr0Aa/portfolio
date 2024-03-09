function updateDateTime() {
    // Create a new `Date` object
    const now = new Date();

    // Get the current time as a string in the desired format
    let currentTime = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    // Capitalize PM/AM
    currentTime = currentTime.replace(/(\b[aApP]\w+)/, match => match.toUpperCase());

    // Update the `textContent` property of the `span` element with the `id` of `time-display`
    document.querySelector('#time-display').textContent = currentTime;
}

// Call the `updateDateTime` function every second
setInterval(updateDateTime, 1000);
