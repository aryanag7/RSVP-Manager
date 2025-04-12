export class RsvpService {
    constructor(logger) {
        this.logger = logger;
        this.entries = new Map();
    }
    clearAll() {
        this.entries.clear();
        this.logger.log('All RSVPs cleared.');
    }
    addOrUpdate(entry) {
        this.entries.set(entry.playerId.toLowerCase(), entry);
        this.logger.log(`RSVP updated: ${entry.name} → ${entry.status}`);
    }
    getConfirmedAttendees() {
        return Array.from(this.entries.values()).filter(e => e.status === 'Yes');
    }
    getCounts() {
        let yes = 0, no = 0, maybe = 0;
        for (const entry of this.entries.values()) {
            if (entry.status === 'Yes')
                yes++;
            else if (entry.status === 'No')
                no++;
            else if (entry.status === 'Maybe')
                maybe++;
        }
        return {
            total: this.entries.size,
            yes,
            no,
            maybe
        };
    }
}
