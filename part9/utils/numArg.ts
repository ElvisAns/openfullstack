const numArg = (num: any,pos=0): number => {
    if (!isNaN(num)) {
        return Number(num);
    }
    throw new Error(`Argument at position ${pos} not a number`)
}

export default numArg