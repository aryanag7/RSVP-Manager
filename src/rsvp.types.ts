export type RsvpStatus = 'Yes' | 'No' | 'Maybe';

export interface RsvpEntry {
  playerId: string; // Unique ID (can be name for now)
  name: string;
  status: RsvpStatus;
}
