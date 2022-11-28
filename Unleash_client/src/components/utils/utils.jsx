export const filterOsaka = (v) => [...v].filter(item => item.token.to === "ITM");
export const filterRoma = (v) => [...v].filter(item => item.token.to === "FCO");
export const filterSydney = (v) => [...v].filter(item => item.token.to === "SYD");
export const filterNewYork = (v) => [...v].filter(item => item.token.to === "JFK");
export const filterParis = (v) => [...v].filter(item => item.token.to === "CDG");