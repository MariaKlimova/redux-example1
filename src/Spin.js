import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const Spin = (props)=>{
    const spinner = useSelector(state => state.appReducer.loading)
    console.log('spinner', spinner)
    return(
        <div className='loader-styles'>
            <Loader
                type='Puff'
                color='#00BFFF'
                width={100}
                height={100}
                visible={spinner}
            />
        </div>
    )
}

export default Spin;