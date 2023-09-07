const generateFarm = (colors, animals) => {
    return colors.reduce((carry, color) => {
        return [...carry, ...animals.map((animal) => {
            return animal + color + carry.length;
        })]
    }, [])
}

export default generateFarm;