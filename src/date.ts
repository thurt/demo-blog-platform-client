export function isGtDay(start: Date, end: Date): boolean {
  const day = 86400000; // 24hrs*60mins*60s*1000ms = x ms/day
  if (end.getTime() - start.getTime() > day) {
    return true;
  }
  return false;
}

// expects dateString format like '2018-02-01 22:37:20'
export function GMT(dateString: string): Date {
  // adding GMT at the end of the dateString causes Date constructor to interpret timezone as GMT
  return new MyDate(`${dateString} GMT`);
}

class MyDate extends Date {
  static options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  };
  constructor(dateString: string) {
    super(dateString);
  }
  toLocaleString() {
    return super.toLocaleString(undefined, MyDate.options);
  }

  toLocaleDateString() {
    return super.toLocaleDateString(undefined, MyDate.options);
  }

  toLocaleTimeString() {
    return super.toLocaleTimeString(undefined, MyDate.options);
  }
}
