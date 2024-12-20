import { Subject } from 'rxjs';

export const deviceSelectSubject = new Subject<Record<string, string> | null>(); 