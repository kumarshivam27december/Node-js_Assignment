

/** fetch question hook to fetch api data and set value to store */

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import data , { answers } from "../database/data"


/** redux actions */
import * as Action from '../redux/question_reducer'
export const useFetchQuestion=()=>{
    const dispatch = useDispatch();
    const [getData,setGetData] =  useState({isLoading : false,apiData: [],serverError : null})

    useEffect(()=>{
        setGetData(prev=>({...prev,isLoading: true}));


        /**async function fetch beckend data */
        (async ()=>{
            try {
                let question  = await data;

                if(question.length > 0){
                    setGetData(prev=>({...prev,isLoading: false}));
                    setGetData(prev=>({...prev,apiData: {question,answers}}));

                    /** dispatch an action */
                    dispatch(Action.startExamAction({question,answers}))

                }else{
                    throw new Error("No question available")
                }
            } catch (error) {
                setGetData(prev=>({...prev,isLoading: false}))
                setGetData(prev=>({...prev,serverError: error}))

            }
        })();
    },[dispatch]);


    return [getData,setGetData];
}


/** MoveAction dispatch function */
export const  MoveNextQuestion = () =>  async (dispatch) => {
    try {
        dispatch(Action.moveNextAction());/**increase the trace value by 1 */
    } catch (error) {
        console.log(error)
    }
}


/** PrevAction dispatch function */
export const  MovePrevQuestion = () =>  async (dispatch) => {
    try {
        dispatch(Action.movePrevAction());/**decrease the trace value by 1 */
    } catch (error) {
        console.log(error)
    }
}



