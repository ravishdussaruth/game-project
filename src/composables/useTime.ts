export function useTime() {
  function convert(time: string) {
    const [minutes, seconds] = time.split(':').map(Number);

    return minutes * 60 + seconds;
  }

  return {
    convert
  };
}
