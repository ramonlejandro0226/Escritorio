import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface IPersonalAnnouncement {
  id: number;
  title: string;

}

const PersonalAnnouncement = () => {
  const [announcements, setAnnouncements] = useState<IPersonalAnnouncement[]>([]);
  const [request, setRequest] = useState<IPersonalAnnouncement>();
  const [number, setNumber] = useState<number>(0);


  const HandleRequest =(e:React.ChangeEvent<HTMLInputElement>)=>{
    setRequest({
        
        id:number,
        title:e.target.value
        
    })
    setNumber(prevCount => prevCount + 1);
  }

  const Submit = async()=>{
    try {

      const response= await fetch( 'https://localhost:7182/api/Announcement',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
  
  
        },
        body: JSON.stringify(request)
      })
      if (response.ok) {
    
        const data = await response.json();
        setAnnouncements(data);
        console.log('Respuesta del servidor:', data);
        
      } else {
        console.error('Error en la solicitud:', response);
      }
      
    } catch (error) {
      console.error(error)
    }
    

  }

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://localhost:7182/api/Announcement');
        if (response.ok) {
          const data: IPersonalAnnouncement[] = await response.json();
          setAnnouncements(data);
        } else {
          console.error('Error fetching announcements:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

 
  return (
    <div>
      <h1>Informacion del personal announcement</h1>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={request?.title}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>HandleRequest(e)}
          
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>

      <button type="button" className="btn" onClick={()=>Submit()}>
        submit
      </button>

      <table className="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Title</th>
      
    </tr>
  </thead>
         <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <th scope="row">{announcement.id}</th>
              <td>{announcement.title}</td>
            </tr>
          ))}
        </tbody>

</table>

    </div>
  );
};

export default PersonalAnnouncement;
