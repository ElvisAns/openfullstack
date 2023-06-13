import numArg from "./utils/numArg";

interface calculatedExercice {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: 0 | 1 | 2 | 3;
    ratingDescription: string;
    target: number,
    average: number;
}

const getArgs = (): Array<number> => {
    if (process.argv.length < 4) {
        throw new Error("You did not specify enough value, at least you need the target value and one day")
    }
    const [ts, file, ...args] = process.argv
    const exerciceData = args.map((v, i) => numArg(v, i + 1))
    return exerciceData
}

const computeExercices = (target: number, exercices: Array<number>): calculatedExercice => {
    let periodLength = exercices.length;
    let trainingDays = exercices.filter(v => v > 0).length

    let average = exercices.reduce((prev, current) => prev + current, 0) / periodLength;
    let success = average >= target;
    let rating: 0 | 1 | 2 | 3 = !success ? 0 : (target == average ? 1 : (average - target >= 3 ? 3 : 2))
    let ratingDescription;
    switch (rating) {
        case 0: {
            ratingDescription = 'You need more workout';
            break;
        }
        case 1: {
            ratingDescription = 'Well, you have reached your target but could be better';
            break;
        }
        case 2: {
            ratingDescription = 'Well, you did a great job!';
            break
        }
        case 3: {
            ratingDescription = 'Excellent, you have perfomed very well during this perid!';
        }
    }
    return { target, periodLength, trainingDays, average, success, rating, ratingDescription }
}

try{
const [target, ...exercices] = getArgs()
const result = computeExercices(target, exercices)
console.log(result)
}
catch (error:unknown){
    console.error('Something went wrong')
    if(error instanceof Error){
        console.log(error.message)
    }
}
