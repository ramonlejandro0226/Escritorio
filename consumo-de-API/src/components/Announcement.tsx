import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface IAnnouncement {
  id: number;
  title: string;
  link: string;
  date: string;
  content: string;
}

const Announcement = () => {
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/api/v1/Announcement");
        setAnnouncements(response.data);
      } catch (error) {
        setError("Error fetching data from API.");
        console.error("Error fetching data from API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Announcements</h1>
      <div className="accordion" id="accordionExample">
        {announcements.map((announcement, index) => (
          <div className="accordion-item" key={announcement.id}>
            <h2 className="accordion-header" id={"heading" + index}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + index}
                aria-expanded="true"
                aria-controls={"collapse" + index}
              >
                {announcement.title}
              </button>
            </h2>
            <div
              id={"collapse" + index}
              className="accordion-collapse collapse"
              aria-labelledby={"heading" + index}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div
                  dangerouslySetInnerHTML={{ __html: announcement.content }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
