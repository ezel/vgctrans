import { useRef, useEffect } from 'react';

export default function Flash({text, fadeTime=2000}) {
    const myRef = useRef(null);
    
    useEffect(()=>{
        setTimeout(()=>{
            //myRef.current.parentElement.removeChild(myRef.current);
        }, fadeTime);
    }, [fadeTime]);

    function closeHandle(e) {
        let div = e.target.parentElement;
        if (div.className === 'flash-div') {
            div.parentElement.removeChild(div);
        }
    }

    return (
    <div ref={myRef} className="flash-div">
      <p className="flash-p">{text}</p>
      <button onClick={closeHandle} >X</button>
      <div className="flash-clear"></div>
    </div>
  );
}

export { Flash };
