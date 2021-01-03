export const termToId = (term: string): number => {
  // Split string
  const [season, year] = term.split(' ');

  // Convert season to an int
  let seasonSuffix: number;
  if (season === 'Spring') {
    seasonSuffix = 1;
  } else if (season === 'Summer') {
    seasonSuffix = 5;
  } else if (season === 'Fall') {
    seasonSuffix = 8;
  } else {
    throw Error(`Unknown season: ${season}`);
  }

  // Put it all together
  return +year * 10 + seasonSuffix;
};
