import { Subject } from 'rxjs';
import type { ErrorAlert } from '@/apis/errorAlert';

export const errorAlertSubject = new Subject<ErrorAlert>(); 