import React, { useContext, useEffect, useState } from "react";
import "./FarmProfile.css";
import { AuthContext } from "../../../context/AuthContext"

const initialProfile = {
  farmName: "",
  ownerName: "",
  farmType: "",
  totalArea: "",
  village: "",
  soilType: "",
  waterSource: "",
  primaryCrops: "",
  equipment: "",
  currentCrop: "",
  sowingDate: "",
  expectedHarvest: "",
  phone: "",
  email: "",
};

export default function FarmProfile() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(initialProfile);
  const [originalProfile, setOriginalProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("/images/farm-placeholder.png");

  useEffect(() => {
    if (!token) return;
    fetch("import.meta.env.VITE_API_URL/farm-profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async r => {
        if (r.status === 404) return null;
        if (!r.ok) throw new Error("Failed to load profile");
        return r.json();
      })
      .then(data => {
        if (data) {
          setProfile(data);
          setOriginalProfile(data);
          if (data.farmPhoto) {
            setPreview(`http://localhost:5000/uploads/${data.farmPhoto}`);
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoto = e => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setEditing(false);
    if (originalProfile.farmPhoto) {
      setPreview(`http://localhost:5000/uploads/${originalProfile.farmPhoto}`);
    }
  };

  const handleSave = async () => {
    try {
      const method = profile.id ? "PUT" : "POST";
      const res = await fetch("import.meta.env.VITE_API_URL/farm-profile", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      if (photo) {
        const fd = new FormData();
        fd.append("photo", photo);
        await fetch("import.meta.env.VITE_API_URL/farm-profile/photo", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: fd
        });
      }

      alert("Profile saved successfully.");
      setOriginalProfile(profile);
      setEditing(false);

    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="farm-profile-page">
      <div className="profile-header">
        <div className="photo-section">
          <img src={preview} alt="Farm" className="farm-photo"/>
          {editing && (
            <input type="file" accept="image/*" onChange={handlePhoto}/>
          )}
        </div>

        <div>
          <h2>{profile.farmName || "Farm Profile"}</h2>
          <p>{user?.name}</p>
          {!editing ? (
          <button onClick={() => setEditing(true)}>Edit</button>
        ) : (
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )}
        </div>

        
      </div>

      <div className="profile-grid">

        <section className="card">
          <h3>Basic Information</h3>
          {[
            ["farmName","Farm Name"],
            ["ownerName","Owner Name"],
            ["farmType","Farm Type"],
            ["totalArea","Total Area"],
            ["village","Village"]
          ].map(([key,label])=>(
            <div className="field" key={key}>
              <label>{label}</label>
              <input
                name={key}
                value={profile[key]}
                disabled={!editing}
                onChange={handleChange}
              />
            </div>
          ))}
        </section>

        <section className="card">
          <h3>Farm Details</h3>
          {[
            ["primaryCrops","Primary Crops"],
            ["soilType","Soil Type"],
            ["waterSource","Water Source"],
            ["equipment","Equipment"]
          ].map(([key,label])=>(
            <div className="field" key={key}>
              <label>{label}</label>
              <input
                name={key}
                value={profile[key]}
                disabled={!editing}
                onChange={handleChange}
              />
            </div>
          ))}
        </section>

        <section className="card">
          <h3>Current Season</h3>
          <div className="field">
            <label>Current Crop</label>
            <input name="currentCrop" value={profile.currentCrop} disabled={!editing} onChange={handleChange}/>
          </div>
          <div className="field">
            <label>Sowing Date</label>
            <input type="date" name="sowingDate" value={profile.sowingDate} disabled={!editing} onChange={handleChange}/>
          </div>
          <div className="field">
            <label>Expected Harvest</label>
            <input type="date" name="expectedHarvest" value={profile.expectedHarvest} disabled={!editing} onChange={handleChange}/>
          </div>
        </section>

        <section className="card">
          <h3>Contact</h3>
          <div className="field">
            <label>Phone</label>
            <input name="phone" value={profile.phone} disabled={!editing} onChange={handleChange}/>
          </div>
          <div className="field">
            <label>Email</label>
            <input name="email" value={profile.email} disabled={!editing} onChange={handleChange}/>
          </div>
        </section>

      </div>
    </div>
  );
}
