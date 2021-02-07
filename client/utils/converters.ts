export const toTermName = (termNumber: number): string | undefined => {
  if (termNumber === 10) return 'Spring';
  if (termNumber === 50) return 'Summer';
  if (termNumber === 80) return 'Fall';
  return undefined;
};

export const toFormattedTime = (time: string): string => {
  const [hour, minutes] = time.split(':');
  const date = new Date();
  date.setHours(+hour, +minutes, 0);
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};
