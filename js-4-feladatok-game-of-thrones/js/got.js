'use strict';

const getLivingChars = async () => {
    const response = await fetch("./json/got.json");
    const data = await response.json();
    const livingChars = data.filter(char => !(char.dead));
    return livingChars.sort((a,b) => compare(a.name, b.name));
}