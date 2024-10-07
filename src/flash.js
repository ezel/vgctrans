import { useRef, useEffect } from 'react';
import flashStyles from '../flash.module.css'

export default function Flash({text, fadeTime=2000}) {
    const myRef = useRef(null);
    
    useEffect(()=>{
        setTimeout(()=>{
            //myRef.current.parentElement.removeChild(myRef.current);
        }, fadeTime);
    }, [fadeTime]);

    function closeHandle(e) {
        let div = e.target.parentElement;
        if (div.className === 'flashDiv') {
            div.parentElement.removeChild(div);
        }
    }

    return (
    <div ref={myRef} className={flashStyles.flashDiv} >
      <p className={flashStyles.flashP} >{text}</p>
      <button onClick={closeHandle} >X</button>
      <div className={flashStyles.flashClear}></div>
    </div>
  );
}

export { Flash };
