import { Subject } from 'rxjs/Subject';
import { Observable, of } from 'rxjs';

export class MessageService {
	public messages: Subject<String> = new Subject();
}