
type CardProps = {
  title: string;  
};

function Card(props:CardProps) {
  return (
    <div className="bg-white text-gray-500 w-96 rounded-md p-4 shadow-md">
      <h2 className="text-xl ">{props.title}</h2>
      <p>image here</p>
    </div>
  );
}

function App() {
  return (
    // main container
    <div className="bg-pink-500 text-white p-4">
      <h1 className="text-3xl">Luta!</h1>

      <div className="flex flex-row gap-3">
        <Card title="Super Mario"/>
        <Card title="Bowser"/>
        
      </div>
    </div>
  );
}

export default App;
