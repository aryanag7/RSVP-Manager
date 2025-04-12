import { ConsoleLogger } from './logger.js';
import { RsvpService } from './rsvp.service.js';
// Initialize the service with a logger
const logger = new ConsoleLogger();
const rsvpService = new RsvpService(logger);
// Get DOM elements
const nameInput = document.getElementById('nameInput');
const statusInput = document.getElementById('statusInput');
const submitBtn = document.getElementById('submitBtn');
const confirmedList = document.getElementById('confirmedList');
const summary = document.getElementById('summary');
const clearBtn = document.getElementById('clearBtn');
// Handle submit
submitBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const status = statusInput.value;
    if (!name) {
        alert('Please enter a name');
        return;
    }
    const entry = {
        playerId: name.toLowerCase(),
        name,
        status
    };
    rsvpService.addOrUpdate(entry);
    nameInput.value = '';
    statusInput.value = 'Yes';
    updateUI();
});
// Update UI
function updateUI() {
    // Update confirmed attendees
    const confirmed = rsvpService.getConfirmedAttendees().sort((a, b) => a.name.localeCompare(b.name));
    confirmedList.innerHTML = '';
    confirmed.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player.name;
        confirmedList.appendChild(li);
    });
    // Update summary
    const counts = rsvpService.getCounts();
    summary.textContent = `Total: ${counts.total}, Yes: ${counts.yes}, No: ${counts.no}, Maybe: ${counts.maybe}`;
}
clearBtn.addEventListener('click', () => {
    rsvpService.clearAll();
    nameInput.value = '';
    statusInput.value = 'Yes';
    updateUI();
});
