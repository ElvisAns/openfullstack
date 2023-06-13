interface BodyInfos {
    height: number;
    weight: number;
}

type indexTypes = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

interface BMI {
    bmi: number,
    type: indexTypes
}

const parseArguments = (args: string[]): BodyInfos => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        if (Number(args[3]) < 1 || Number(args[2]) < 1) {
            throw new Error("Provided values can't be zero or negative, only positive integers greater than 0")
        }
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const bmi_calculator = (height: number, weight: number): BMI => {
    const height_m = height / 100;
    const bmi = weight / (height_m ** 2);
    if (bmi < 18.5) {
        return {
            bmi,
            type: 'Underweight'
        }
    }
    if (bmi < 25) {
        return {
            bmi,
            type: 'Normal'
        }
    }
    if (bmi < 30) {
        return {
            bmi,
            type: 'Overweight'
        }
    }
    return {
        bmi,
        type: 'Obese'
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    const {bmi,type} = bmi_calculator(height, weight)
    console.log(`Your BMI is ${bmi} and is classified as ${type}`)
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}