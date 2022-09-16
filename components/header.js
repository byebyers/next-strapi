import {useState, useEffect, useContext} from 'react';
import FancyLink from '@/components/fancyLink'
import { useLocationContext } from '@/context/location'
import { NearestLocation } from '@/helpers/location'

export default function Header({ locations, route }) {

  const [sharedState, setShareState] = useLocationContext();
  const [locationItem, setLocationItem] = useState('');
  const [position, setPosition] = useState({});
  const [error, setError] = useState(true);

  //Sets coordinates
  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setError(false)
  };

  //Get user location --Next I need to check for cookie
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      return;
    }
    let watcher = geo.getCurrentPosition(onChange);
    return () => geo.clearWatch(watcher);
  }, []);

  //Pass user location to find closest store location --Next I need to set a cookie
  useEffect(() => {
  if (error === false) {
    const nearest = NearestLocation(locations, position, error);
    setShareState({
      id: nearest.id,
      title: nearest.title,
      slug: nearest.slug
    })
  }  
  },[error])


  //Changes Location manually
  const handleLocationChange = (item, locations) => {
    const location = locations.filter(node => node.attributes.title === item)
    setShareState({
      id: location[0].id,
      title: location[0].attributes.title,
      slug: location[0].attributes.slug
    })
    setLocationItem(item);
 };
  
  return (
    <header className="p-5 absolute z-50 w-full font-bold text-base md:text-4xl ">
        <div className="flex border-b border-black">
          <FancyLink destination="/" a11yText="Navigate to the home page" label="Front Burner" extraClasses="mb-1 no-underline md:mb-0" />

          <div 
            className="mx-auto w-[40rem] text-center text-3xl  font-light "
          >
        
          <select name="select" value={locationItem} onChange={event => handleLocationChange(event.target.value, locations)} className="bg-transparent">
            {sharedState.id === 0 && (<option key={sharedState.id} value={sharedState.title} >{sharedState.title}</option>)}
            {locations.map(function(n, s=0) { 
                return (<option key={n.attributes.title} value={n[s]}>{n.attributes.title}</option>);
            })}
          </select>
          </div>

          <nav className="flex ml-auto  space-x-6 md:w-auto">
            <FancyLink destination="/" a11yText="Navigate to the home page" label="Home" extraClasses={`${route === '/' ? 'bigDot' : ''} no-underline`} />
            <FancyLink destination="/menu" a11yText="Navigate to the Menu page" label="Menu" extraClasses={`${route === '/menu' ? 'bigDot' : ''} no-underline`} />
            <FancyLink destination="/locations" a11yText="Navigate to the Locations page" label="Locations" extraClasses={`${route === '/locations' ? 'bigDot' : ''} no-underline`} />
          </nav>
        </div>
    </header>
  )
}