import { INCREMENT,
         DECREMENT,
         INPUT_TEXT, 
         COMMENT_CREATE, 
         COMMENT_UPDATE, 
         COMMENT_DELETE, 
         COMMENTS_LOAD,
         LOADER_DISPLAY_OFF,
         LOADER_DISPLAY_ON,
         ERROR_DISPLAY_OFF,
         ERROR_DISPLAY_ON,
        
        } from "./types";

export function incrementLikes(){
    return{
        type: INCREMENT
    }
}

export function decrementLikes(){
    return{
        type: DECREMENT
    }
}

export function inputText(text){
    return{
        type: INPUT_TEXT,
        text
    }
}

export function commentCreate(text, id){
    return{
        type: COMMENT_CREATE,
        data: {text, id}
    }
}

export function commentUpdate(text, id){
    return{
        type: COMMENT_UPDATE,
        data: {text, id}
    }
}

export function commentDelete(id){
    return{
        type: COMMENT_DELETE,
        id
    }
}

export function loaderOn(){
    return{
        type: LOADER_DISPLAY_ON,
    }
}

export function loaderOff(){
    return{
        type: LOADER_DISPLAY_OFF,
    }
}

export function errorOn(text){
    return dispatch => {
        console.log('error on')
        dispatch({
            type: ERROR_DISPLAY_ON,
            text
        });
        setTimeout(()=>{
            console.log('timeout')
            // dispatch({
            //     type: COMMENTS_LOAD,
            //     data: jsonData
            // });
            dispatch(errorOff())
        }, 1000)
        // setTimeout(()=>{
        //     console.log('timeout')
        //     dispatch(errorOff());
        // }, 200)
    }
}   

export function errorOff(){
    console.log('error off')
    return{
        type: ERROR_DISPLAY_OFF,
    }
}
export function commentsLoad(){
    return async dispatch => {
        try{
            dispatch(loaderOn());
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
            const jsonData = await response.json();
            setTimeout(()=>{
                dispatch({
                    type: COMMENTS_LOAD,
                    data: jsonData
                });
                dispatch(loaderOff())
            }, 1000)
        }catch(err){
            dispatch(errorOn('API error'))
            dispatch(loaderOff())
        }
        
        
    }
}