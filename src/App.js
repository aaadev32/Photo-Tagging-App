import './App.css';
import Leaderboards from './components/Leaderboards.js'

//the components themselves are treated as pages in themselves so there is no pages directory
function App() {

  return (
    <div id='root'>
      <Leaderboards />
    </div>
  );
}

export default App;
