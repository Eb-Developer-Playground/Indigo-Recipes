import { Subject, takeUntil } from "rxjs"
import { CardManagementService } from "../../../recipe-management/services/card-management.service"
import { MessageService } from "../../services/notification-services/message.service"
import { Recipe } from "../../../../assets/db-arrays/interfaces"


let cardManService: CardManagementService
let notificationManService: MessageService
let detroy$: Subject<any> = new Subject<boolean>();
detroy$.next(true)
detroy$.complete();
