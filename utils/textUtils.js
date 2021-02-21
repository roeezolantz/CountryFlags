const hypenToSpace = (text) => text.replace(/-/g, ' ');
const spaceToHypen = (text) => text.replace(/ /g, '-');

module.exports = { 
    hypenToSpace,
    spaceToHypen
}