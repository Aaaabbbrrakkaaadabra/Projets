import { useState } from 'react';
import Citation from './components/Citation';
import './App.css';


function App() {

  const [citation, setCitation] = useState({text: "", author:""});

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotify.top/random");
      const data = await response.json();
      setCitation({ text: data.text, author: data.author });
    } catch (error) {
      console.error("Erreur en récupérant la citation :", error);
    }
  };

  return (
    <div className="App">
      <h1>Quote generator</h1>
      <Citation cit={citation}/>
      <button onClick={fetchQuote}>Générer</button>

    </div>
  );
}

export default App;
