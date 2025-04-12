import { RsvpEntry, RsvpStatus } from './rsvp.types.js';
import { Logger } from './logger.js';

export class RsvpService {
  private entries: Map<string, RsvpEntry> = new Map();

  constructor(private logger: Logger) {}

  clearAll(): void {
    this.entries.clear();
    this.logger.log('All RSVPs cleared.');
  }
  

  addOrUpdate(entry: RsvpEntry): void {
    this.entries.set(entry.playerId.toLowerCase(), entry);
    this.logger.log(`RSVP updated: ${entry.name} → ${entry.status}`);
  }

  getConfirmedAttendees(): RsvpEntry[] {
    return Array.from(this.entries.values()).filter(e => e.status === 'Yes');
  }

  getCounts(): { total: number; yes: number; no: number; maybe: number } {
    let yes = 0, no = 0, maybe = 0;

    for (const entry of this.entries.values()) {
      if (entry.status === 'Yes') yes++;
      else if (entry.status === 'No') no++;
      else if (entry.status === 'Maybe') maybe++;
    }

    return {
      total: this.entries.size,
      yes,
      no,
      maybe
    };
  }
}
