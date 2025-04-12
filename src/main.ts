import { RsvpEntry } from './rsvp.types.js';
import { ConsoleLogger } from './logger.js';
import { RsvpService } from './rsvp.service.js';

// Initialize the service with a logger
const logger = new ConsoleLogger();
const rsvpService = new RsvpService(logger);

// Get DOM elements
const nameInput = document.getElementById('nameInput') as HTMLInputElement;
const statusInput = document.getElementById('statusInput') as HTMLSelectElement;
const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
const confirmedList = document.getElementById('confirmedList')!;
const summary = document.getElementById('summary')!;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;


// Handle submit
submitBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const status = statusInput.value as 'Yes' | 'No' | 'Maybe';

  if (!name) {
    alert('Please enter a name');
    return;
  }

  const entry: RsvpEntry = {
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
  const confirmed = rsvpService.getConfirmedAttendees().sort((a, b) =>
    a.name.localeCompare(b.name)
  );
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
  