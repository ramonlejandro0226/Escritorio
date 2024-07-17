import "./App.css";
import Announcement from "./components/Announcement";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonalAnnouncement from "./components/PersonalAnnouncement";

function App() {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col"><Announcement></Announcement></div>
          <div className="col"><PersonalAnnouncement></PersonalAnnouncement></div>
        </div>
      </div>
    </>
  );
}

export default App;
