const getRootPath = (currentDir: string): string => {
  const paths = currentDir.split('\\');
  const index = paths.indexOf('src');

  if (index === -1) {
    return '';
  }
  return paths.slice(0, index).join('\\');
};

export default getRootPath;
