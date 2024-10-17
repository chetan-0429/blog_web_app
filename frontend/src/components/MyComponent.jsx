import React, { useState, useEffect } from 'react';

function MyComponent() {
  // Mounting: useEffect with an empty dependency array ([]) runs only once, similar to componentDidMount.
  useEffect(() => {
    console.log('Component mounted , 49'); // This runs only once when the component is first added to the DOM.
    setCount(49)
  }, []);
  
  const [count, setCount] = useState(0);
  
  // Rendering: This function is called every time the component re-renders, which happens when `count` changes.
  console.log('Component rendered');
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default MyComponent;
