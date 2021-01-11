import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [speed, setSpeed] = useState(null)
  const [position, setPosition] = useState(null);
  const [baterry, setBattery] = useState(null)

  useEffect(() => {
    let id = null;


    if(navigator.geolocation){
      id = navigator.geolocation.watchPosition(successPosition, error, { timeout: 30000 });
      let batteryIsCharging = false;

      navigator.getBattery().then(function(battery) {
        setBattery(battery.level);
        batteryIsCharging = battery.charging;

        battery.addEventListener('chargingchange', function() {
          batteryIsCharging = battery.charging;
          console.log(batteryIsCharging);
        });
      });
    }

    return () => {
      navigator.geolocation.clearWatch(id);
    }
  }, []);


  const successPosition = (position) => {
    setPosition(position.coords);
    setSpeed(position.coords.speed);
  }

  const error = (err) => {
    console.log(`Error:`+ err.code + err.message);
  }


  return (
    <div className="App">
      <h1>GeoTracker</h1>

      <p>Tu velocidad es de { speed !== null ? (`${speed.toFixed(2)} MS/S`) : '0 MS/S' }</p>
      <p>Tus coordenadas son: {position?.latitude}, {position?.longitude}</p>
      <p>Nivel de Baterria: {`${(baterry * 100)}%`}</p>
    </div>
  );
}

export default App;
