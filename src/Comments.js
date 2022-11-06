import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import uniqid from 'uniqid';

import { commentCreate, commentsLoad } from "./redux/actions";
import SingleComment from "./SingleComment";

function Comments(props){
    const dispatch = useDispatch()
    const [textComment, setTextComment] = useState('');
    const comments = useSelector( state => {
        
        const { commentsReducer } = state;
        return commentsReducer.comments;
    })
    //console.log('comments props >>', props)
    const handleInput = (e) =>{
        //console.log('input >>', e.target.value);
        setTextComment(e.target.value);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        const id = uniqid()
        dispatch(commentCreate(textComment, id))
        //console.log('submit textComment')
    }

    useEffect(()=> {dispatch(commentsLoad())}, []);
    //console.log( 'COMMENTS ', comments)
    return(
        <div className="card-comments">
            <form className="comments-item-create" onSubmit={handleSubmit}>
                <input type='text' value={textComment} onChange={handleInput}/>
                <input type='submit' hidden/>
            </form>
            {!!comments.length && comments.map(res => {
                return <SingleComment key ={res.id} data={res}/>
            })}
        </div>
    )
}

export default Comments;