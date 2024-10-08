

export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) {
        return undefined;
    }
    return "Обязательное поле"
}

//функция вызывает внутреннюю функцию для того, чтобы можно было вызывать разной длины
//пример: maxLengthCreator(15) или maxLengthCreator(30) и т.п.
export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) return `Максимальная длина - ${maxLength} символов`;
    return undefined
}