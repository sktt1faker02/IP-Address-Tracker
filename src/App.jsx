import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import iconArrow from "./assets/images/icon-arrow.svg";
import { useGlobalContext } from "./hooks/useGlobalContext";
import icon from "./icon";

const App = () => {
  const detailsContainerStyle = "ip-details grid gap-1";
  const labelStyle = "text-xs uppercase font-fw-700 tracking-widest text-center md:text-left text-dark-gray";
  const valueStyle = "font-fw-700 text-very-dark-gray";

  const { data, getIP, loading, ip, handleChangeIP } = useGlobalContext();
  const geoLocation = [data?.location?.lat, data?.location?.lng];

  return (
    <main>
      <div className="top-header px-5 py-6 max-w-[390px] mx-auto">
        <h1 className="text-2xl text-white font-fw-500 text-center tracking-wide mb-6">IP Address Tracker</h1>
        <form className="flex mb-5 md:max-w-[30rem] md:mx-auto md:mb-10">
          <input type="text" className="py-3 px-6 outline-none w-full rounded-l-xl text-very-dark-gray" placeholder="Search for any IP address or domain" value={ip} onChange={handleChangeIP} />
          <button onClick={getIP} className="bg-very-dark-gray px-6 rounded-r-xl">
            <img src={iconArrow} alt="Track IP Address" />
          </button>
        </form>

        <div className="track-details bg-white shadow-md flex items-center flex-col rounded-xl py-5 gap-6 relative z-[999] md:grid grid-cols-4 md:items-start md:p-6">
          <div className={detailsContainerStyle}>
            <span className={labelStyle}>ip address</span>
            <span className={valueStyle}>{loading ? <Skeleton /> : data.ip ? data.ip : "not available"}</span>
          </div>
          <div className={detailsContainerStyle}>
            <span className={labelStyle}>location</span>
            <span className={valueStyle}>{loading ? <Skeleton /> : data.location ? `${data.location.city}, ${data.location.country} ${data.location.postalCode}` : "not available"}</span>
          </div>
          <div className={detailsContainerStyle}>
            <span className={labelStyle}>timezone</span>
            <span className={valueStyle}>{loading ? <Skeleton /> : data.location ? `UTC ${data.location.timezone}` : "not available"}</span>
          </div>
          <div className={detailsContainerStyle}>
            <span className={labelStyle}>isp</span>
            <span className={valueStyle}>{loading ? <Skeleton /> : data.isp ? data.isp : "not available"}</span>
          </div>
        </div>
      </div>

      <div className="map">
        {loading ? (
          <Skeleton count={10} />
        ) : data.location ? (
          <MapContainer key={geoLocation.join(",")} center={geoLocation} zoom={13} zoomControl={false} attributionControl={false} scrollWheelZoom={true} style={{ height: "600px", width: "100%" }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker icon={icon} position={geoLocation}>
              <Popup>{data?.location?.city}</Popup>
            </Marker>
          </MapContainer>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default App;
