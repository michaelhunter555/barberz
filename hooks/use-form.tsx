import { useReducer, useCallback } from 'react';
import { Inputs, Action, State } from '@/types';

type InputHandlerValue = string | number | boolean

const formReducer = (state: State, action: Action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;

            for(const inputId in state.inputs) {
                if(!state.inputs[inputId]){
                    continue;
                }
                if(inputId === action.inputId) {
                    formIsValid = formIsValid && (action.isValid || false)
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId as string]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid,
            }
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid,
            }
        default:
            return state;
    }
}

export const useForm = (inputs: Record<string, Inputs>, isValid: boolean): [
    State, 
    (id: string, value: InputHandlerValue, isValid: boolean) => void,
    (inputData: Record<string, Inputs>, formValidity: boolean) => void,

] => {
    const [formState, dispatch] = useReducer<(state: State, action: Action) => any>(
        formReducer, { inputs, isValid });

        const inputHanlder = useCallback((id: string, value: InputHandlerValue, isValid: boolean) => {
            dispatch({
                type: 'INPUT_CHANGE',
                value,
                isValid,
                inputId: id,
            })
        }, [])

        const setFormData = useCallback((inputData: Record<string, Inputs>, formValidity: boolean) => {
            dispatch({
                type: 'SET_DATA',
                inputs: inputData,
                formIsValid: formValidity
            })
        }, [])

        return [formState, inputHanlder, setFormData];
}