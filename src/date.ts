// expects dateString format like '2018-02-01 22:37:20'
export function GMT(dateString: string): Date {
  return new Date(`${dateString} GMT`);
}
