import bowser from "./assets/bowser.png";
import mario from "./assets/mario.png";

type CardProps = {
  title: string;
  img: string;
  imgWidth?: number;
  offsetLeft?: number;
  offsetRight?: number;
};

function Card(props: CardProps) {
  const stl = {} as React.CSSProperties;

  if (props.offsetLeft) stl.left = props.offsetLeft;
  if (props.offsetRight) stl.right = props.offsetRight;
  if (props.imgWidth) stl.width = props.imgWidth;

  return (
    <div className="bg-white text-gray-500 w-96 h-[540px] px-4 shadow-lg rounded-2xl border-2 border-pink-500">
      <h2 className="text-2xl mb-20 bg-pink-500 text-white uppercase font-semibold py-4 text-center mt-8 -mx-4">{props.title}</h2>

      <div style={stl} className="relative z-10 drop-shadow">
        <img src={props.img} alt={props.title} className="border-solid" />
      </div>
    </div>
  );
}

function PlayBtn() {
  function handleClick() {
    console.log("Play!");
  }
  return (
    <button onClick={handleClick} className="bg-white z-20 text-pink-500 h-fit px-4 py-2 font-bold uppercase rounded-md shadow-md hover:text-white hover:bg-pink-500">
      Play
    </button>
  );
}

function App() {
  return (
    // main container
    <div className=" text-white p-4">
      {/* <h1 className="text-3xl">Luta!</h1> */}

      <div className="flex flex-row gap-10 items-center">
        <Card
          title="Super Mario"
          img={mario}
          offsetRight={-100}
          imgWidth={300}
        />
        <PlayBtn />
        <Card title="Bowser" img={bowser} offsetLeft={-100} imgWidth={450} />
      </div>
    </div>
  );
}

export default App;
