import { Component, ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'jimsTimer';
  percentsDone = 0;
  percentsDoneString = '';
  timeLeft = '';
  totalHoursLeft = 1440;
  correspondingTime = '';
  // timerId: NodeJS.Timeout;
  timerId: NodeJS.Timeout;
  //timerId: number | undefined;
  // cd: ChangeDetectorRef;
  // test = 1;

  constructor(private ref: ChangeDetectorRef) {
    this.timerId = setInterval(this.calculateEverything, 10000);
    this.calculateEverything();

    setInterval(() => {
      // this.test++;
      // require view to be updated
      this.calculateEverything();
      this.ref.markForCheck();
    }, 1000);

  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }

  public calculateEverything () {

    let endDate = new Date(2020, 6, 12, 10, 30);
    let startDate = new Date(endDate.getTime() - (1000 * 60 * 60 * 24 * 60));
    let timeNow = new Date();
    this.percentsDone = 100 * (timeNow.valueOf() - startDate.valueOf()) / (endDate.valueOf() - startDate.valueOf());
    let msLeft = endDate.getTime() - timeNow.getTime();
    let daysLeft = Math.floor(msLeft / (1000 * 3600 * 24));
    let remainingMs = msLeft % (1000 * 3600 * 24); // Ms som ska bli timmar och minuter
    let hoursLeft = Math.floor(remainingMs / (1000 * 3600));
    remainingMs = remainingMs % (1000 * 3600); // ms som ska bli minuter
    let minutesLeft = Math.floor(remainingMs / (1000 * 60));
    remainingMs = remainingMs % (1000 * 60); // ms som ska bli sekunder
    let secondsLeft = Math.floor(remainingMs / (1000));

    this.totalHoursLeft = Math.ceil(msLeft / (1000 * 3600));
    let correspondingTime = new Date(timeNow.getTime() - msLeft);

    this.percentsDoneString = this.percentsDone.toFixed(5) + '%';
    this.timeLeft = daysLeft + " d " + hoursLeft + " h " + minutesLeft + " m " + secondsLeft + " s"
    this.correspondingTime = correspondingTime.toLocaleString();
    //this.totalHoursLeft = totalHoursLeft.toString();

    //Detta motsvarar tiden det gatt sedan: " + correspondingTime.toLocaleString();
  }

}
