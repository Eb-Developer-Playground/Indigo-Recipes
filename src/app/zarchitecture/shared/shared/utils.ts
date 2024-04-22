import { Subject, takeUntil } from "rxjs"
import { CardManagementService } from "../../../recipe-management/services/card-management.service"
import { MessageService } from "../../services/notification-services/message.service"
import { Recipe } from "../../../../assets/db-arrays/interfaces"


let cardManService: CardManagementService
let notificationManService: MessageService
let detroy$: Subject<any> = new Subject<boolean>();
detroy$.next(true)
detroy$.complete();

export function onSearchRecipe(id: number): [] {
    let formData: [] = [];
    detroy$.next(true);
    detroy$.complete();
    cardManService
        .searchRecipeById(id)
        .pipe(takeUntil(detroy$))
        .subscribe({
            next: (res) => {
                if (res.statusCode == 200) {
                    formData = res.entity
                } else {
                    notificationManService.showNotificationMessage(res.message, "snackbar-danger")
                }
            },
            error: (err) => {
                notificationManService.showNotificationMessage(err.message, "snackbar-danger")
            }
        });
    return formData
}