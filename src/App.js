import { useCallback, useEffect, useRef, useState } from "react";



function App() {
	const [length, setLength] = useState(8);
	const [number, setNumber] = useState(false);
	const [char, setChar] = useState(false);
	const[password, setPassword] = useState("");

	const passwordGenerator = useCallback(() =>{
      let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	  let pass=""
	  let splchar = "\.[]{}()<>*+-=!?^$|"
	  let num = "1234567890"

	  if(number)
	  characters+=num
	  if(char)
	  characters+=splchar
      
	  for(let i=1; i<=length; i++)
	  {
      let index = Math.floor(Math.random()*characters.length + 1);
	  pass+= characters[index];
	  }

	  setPassword(pass);
	},[length, number, char, setPassword])

	useEffect(()=>{
		passwordGenerator()
	}, [length, number, char, passwordGenerator])

	const passwordRef = useRef(null);

	const copytoClipboard=()=>{
		window.navigator.clipboard.writeText(password);
		passwordRef.current?.select()
	}

	
  return (
	<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
	<h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
	  <input
		  type="text"
		  value={password}
		  className="outline-none w-full py-1 px-3"
		  placeholder="Password"
		  ref={passwordRef}
	  />
	  
	  <button onClick={copytoClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
	  </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={() => {
              setNumber((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                  setChar((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
	  
	    
		

		
  );
}

export default App;
