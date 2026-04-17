import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import getEmojiFlag from "@/app/utils/isoMap";

export const createSimpleMarker = ({ color = "#e53935", label = "", country }) => {
  return L.divIcon({
    className: "custom-div-marker",
    iconSize: [50, 80], // 👈 important
    iconAnchor: [25, 70], // 👈 tip of pin
    popupAnchor: [0, -60],
    html: `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
      ">
        ${
          label
            ? `<div style="
                  min-width:75px;
                  padding:4px 8px;
                  font-size:13px;
                  font-weight:500;
                  background:#222;
                  color:white;
                  border-radius:6px;
                  box-shadow:0 3px 8px rgba(0,0,0,0.35);
                  white-space:nowrap;
                  text-align:center;
                  display: flex;
                  align-items:center;
                  gap:8px;
                ">
                  ${
                    country
                      ? `<img 
                          src="https://flagcdn.com/${getEmojiFlag(country)}.svg"
                          alt=""
                          style="width:20px;height:16px;"
                        />`
                      : ""
                  }
                  <p>${label}</p>
              </div>`
            : ""
          }
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="${color}"
        >
          <path d="M12 2c-4.418 0-8 3.582-8 8 0 5.25 8 12 8 12s8-6.75 8-12c0-4.418-3.582-8-8-8z"/>
          <circle cx="12" cy="10" r="3" fill="white"/>
        </svg>

      </div>
    `,
  });
};
