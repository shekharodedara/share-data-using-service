import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closing-time-calculator',
  templateUrl: './closing-time-calculator.component.html',
  styleUrl: './closing-time-calculator.component.scss',
})
export class ClosingTimeCalculatorComponent implements OnInit {
  effectTimeInterval: any = '';
  currentTimeInterval: any = '';
  breaks: any = [''];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.resetBreakNumbers();
  }

  addBreakTime() {
    this.breaks.push('');
    this.resetBreakNumbers();
  }

  deleteBreakTime(btn: any) {
    btn.parentNode.remove();
    this.resetBreakNumbers();
  }

  resetBreakNumbers() {
    this.cdr.detectChanges();
    const cardNumbers = document.querySelectorAll('.card-number');
    cardNumbers.forEach((number: any, index: any) => {
      number.textContent = index + 1;
    });
    this.breaks = cardNumbers.length ? this.breaks : [];
  }

  calculateEndTime() {
    let startTime: any = (
      document.getElementById('start-time') as HTMLInputElement
    ).value;
    let startAmPm: any = (
      document.getElementById('start-am-pm') as HTMLInputElement
    ).value;
    let duration: any = (
      document.getElementById('duration') as HTMLInputElement
    ).value;

    let start: any = this.parseTime(startTime, startAmPm);

    let initInputVal: any = (
      document.getElementById('initial-time') as HTMLInputElement
    ).value;
    let initAmPM: any = (
      document.getElementById('initial-am-pm') as HTMLInputElement
    ).value;
    let initialTime: any = this.parseTime(initInputVal, initAmPM);

    let lateDuration: any = start < initialTime ? false : start - initialTime;

    let durationParts: any = duration.split(':');
    let durationHours: any = parseInt(durationParts[0]);
    let durationMinutes: any = parseInt(durationParts[1]);

    let totalDuration: any =
      durationHours * 60 * 60 * 1000 + durationMinutes * 60 * 1000;
    let breakStartTimes: any = document.querySelectorAll('.break-start-time');
    let breakStartAmPms: any = document.querySelectorAll('.break-start-am-pm');
    let breakEndTimes: any = document.querySelectorAll('.break-end-time');
    let breakEndAmPms: any = document.querySelectorAll('.break-end-am-pm');

    let totalBreakTime: any = 0;

    let end = new Date(start.getTime() + totalBreakTime + totalDuration);

    // Calculate total break time
    for (let i = 0; i < breakStartTimes.length; i++) {
      let breakStart: any = this.parseTime(
        breakStartTimes[i].value,
        breakStartAmPms[i].value
      );
      let breakEnd: any = this.parseTime(
        breakEndTimes[i].value,
        breakEndAmPms[i].value
      );
      if (
        totalBreakTime !== false &&
        breakEnd > start &&
        breakEnd < end &&
        breakStart > start &&
        breakStart < end
      ) {
        totalBreakTime += breakEnd - breakStart;
      } else {
        totalBreakTime = false;
      }
    }

    end = new Date(start.getTime() + totalBreakTime + totalDuration);

    // Calculate end time
    let endHours = end.getHours();
    let endMinutes = end.getMinutes();
    let endSeconds = end.getSeconds();
    let endAmPm = endHours < 12 ? 'AM' : 'PM';

    endHours = endHours % 12;
    endHours = endHours ? endHours : 12;
    let result: any = document.getElementById('result');
    result.style.display = 'block';
    this.getEndTime(endHours, endMinutes, endSeconds, endAmPm);

    clearInterval(this.effectTimeInterval);
    this.getEffectiveTime(start, totalBreakTime);
    this.effectTimeInterval = setInterval(() => {
      this.getEffectiveTime(start, totalBreakTime);
    }, 1000);

    this.getTotalBreakTime(totalBreakTime);

    this.getLateDuration(lateDuration, initInputVal, initAmPM);

    clearInterval(this.currentTimeInterval);
    this.getCurrentTime();
    this.currentTimeInterval = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  getEndTime(endHours: any, endMinutes: any, endSeconds: any, endAmPm: any) {
    (<HTMLElement>document.getElementById('end-time')).innerHTML =
      'Wrapping Up at ' +
      this.formatTime(endHours) +
      ':' +
      this.formatTime(endMinutes) +
      ':' +
      this.formatTime(endSeconds) +
      ' ' +
      endAmPm;
  }

  getEffectiveTime(start: any, totalBreakTime: any) {
    const filterCurrentTime: any = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds()
    );
    if (start.getHours() > filterCurrentTime.getHours()) {
      (<HTMLElement>document.getElementById('effective-time')).innerHTML =
        'Effective Time: Launch time cannot be greater than current time!';
    } else {
      let effectiveTime =
        filterCurrentTime -
        start -
        (totalBreakTime !== false ? totalBreakTime : 0);
      (<HTMLElement>document.getElementById('effective-time')).innerHTML =
        'Effective Time: ' +
        this.formatTime(Math.floor(effectiveTime / (1000 * 60 * 60))) +
        ':' +
        this.formatTime(
          Math.floor((effectiveTime % (1000 * 60 * 60)) / (1000 * 60))
        ) +
        ':' +
        this.formatTime(Math.floor((effectiveTime % (1000 * 60)) / 1000));
    }
  }

  getTotalBreakTime(totalBreakTime: any) {
    if (totalBreakTime !== false) {
      (<HTMLElement>document.getElementById('total-break-time')).innerHTML =
        'Overall Break Time: ' +
        this.formatTime(Math.floor(totalBreakTime / (1000 * 60 * 60))) +
        ':' +
        this.formatTime(
          Math.floor((totalBreakTime % (1000 * 60 * 60)) / (1000 * 60))
        ) +
        ':' +
        this.formatTime(Math.floor((totalBreakTime % (1000 * 60)) / 1000));
    } else {
      (<HTMLElement>document.getElementById('total-break-time')).innerHTML =
        'Overall Break Time: Invalid time entry!';
    }
  }

  getLateDuration(lateDuration: any, initInputVal: any, initAmPM: any) {
    if (lateDuration === false) {
      (<HTMLElement>document.getElementById('late-duration')).innerHTML =
        'Behind Time: Launch time cannot be less than usual kickoff time ' +
        initInputVal +
        ' ' +
        initAmPM +
        '!';
    } else {
      (<HTMLElement>document.getElementById('late-duration')).innerHTML =
        'Behind Time: ' +
        this.formatTime(Math.floor(lateDuration / (1000 * 60 * 60))) +
        ':' +
        this.formatTime(
          Math.floor((lateDuration % (1000 * 60 * 60)) / (1000 * 60))
        ) +
        ':' +
        this.formatTime(Math.floor((lateDuration % (1000 * 60)) / 1000));
    }
  }

  getCurrentTime() {
    const currentDateTime = new Date();
    let currentHours = currentDateTime.getHours();
    let currentAmPm = currentHours < 12 ? 'AM' : 'PM';
    currentHours = currentDateTime.getHours() % 12;
    currentHours = currentHours ? currentHours : 12;
    (<HTMLElement>document.getElementById('current-time')).innerHTML =
      'Current Time: ' +
      this.formatTime(currentHours) +
      ':' +
      this.formatTime(currentDateTime.getMinutes()) +
      ':' +
      this.formatTime(currentDateTime.getSeconds()) +
      ' ' +
      currentAmPm;
  }

  parseTime(timeString: any, amPm: any) {
    let timeParts = timeString.split(':');
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    let seconds = 0;

    if (timeParts.length > 2) {
      seconds = parseInt(timeParts[2]);
    }

    if (amPm === 'PM' && hours < 12) {
      hours += 12;
    }

    if (amPm === 'AM' && hours === 12) {
      hours = 0;
    }

    return new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      hours,
      minutes,
      seconds
    );
  }

  formatTime(time: any) {
    return (time < 10 ? '0' : '') + time;
  }
}
