import React, { useEffect, useRef, useState } from "react";
import { ErrorConstants, getMicroServiceUserAgent, LanguageKey } from "../../../dwtc-common-utility/src";
import { useNavigate, useParams } from "react-router-dom";
import MapPicker from "./MapPicker";

export function AddOrEditAddress() {
    const oAuth2Client = getMicroServiceUserAgent();
    const { accountId, addressId } = useParams();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      name: "",
      phoneNumber: "",
      postalCode: "",
      addressRegion: "",
      addressLocality: "",
      streetAddressLine1: "",
      externalReferenceCode: "",
      streetAddressLine3: "", // coordinates as JSON string
    });
  
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
  
    const [mapCoords, setMapCoords] = useState({ lat: 25.276987, lng: 55.296249 });
  
    // Fetch existing address
    useEffect(() => {
      if (!addressId || addressId === "0") return;
  
      const fetchAddress = async () => {
        setLoading(true);
        setError("");
  
        try {
          const res = await oAuth2Client?.fetch(
            `/o/headless-admin-user/v1.0/postal-addresses/${addressId}`
          );
  
          if (!res) {
            setError("Failed to fetch address");
            return;
          }
  
          setFormData({
            name: res.name || "",
            phoneNumber: res.phoneNumber || "",
            postalCode: res.postalCode || "",
            addressRegion: res.addressRegion || "",
            addressLocality: res.addressLocality || "",
            streetAddressLine1: res.streetAddressLine1 || "",
            externalReferenceCode: res.externalReferenceCode || "",
            streetAddressLine3: res.streetAddressLine3 || "",
          });
  
          if (res.streetAddressLine3) {
            try {
              const coords = JSON.parse(res.streetAddressLine3);
              setMapCoords(coords);
            } catch (err) {
              console.warn("Invalid coordinates in streetAddressLine3");
            }
          }
        } catch (err) {
          setError("Failed to fetch address");
        } finally {
          setLoading(false);
        }
      };
  
      fetchAddress();
    }, [addressId]);
  
    // Fetch regions
    useEffect(() => {
      const fetchRegions = async () => {
        try {
          const res = await oAuth2Client?.fetch(
            `/o/headless-admin-address/v1.0/countries/by-a2/AE`
          );
  
          if (res?.regions) {
            const activeRegions = res.regions.filter((r) => r.active);
            setRegions(activeRegions);
  
            if (!addressId || addressId === "0") {
              setFormData((prev) => ({
                ...prev,
                addressRegion: activeRegions[0]?.name || "",
              }));
            }
          }
        } catch (err) {
          console.error("Failed to fetch regions", err);
        }
      };
  
      fetchRegions();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleMapSelect = ({ coords, address }) => {
      setMapCoords(coords);
      setFormData((prev) => ({
        ...prev,
        streetAddressLine1: address,
        streetAddressLine3: JSON.stringify(coords),
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      const payload = {
        ...formData,
        addressCountry: "United Arab Emirates",
        addressCountry_i18n: {},
        addressType: "shipping",
        primary: true,
        externalReferenceCode: formData.externalReferenceCode || "",
      };
  
      const url = !addressId || addressId === "0"
        ? `/o/headless-admin-user/v1.0/accounts/${accountId}/postal-addresses`
        : `/o/headless-admin-user/v1.0/postal-addresses/${addressId}`;
  
      const method = !addressId || addressId === "0" ? "POST" : "PUT";
  
      try {
        const res = await oAuth2Client?.fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        if (!res) {
          setError("Failed to save address");
          return;
        }
  
        setShowSuccessModal(true);
      } catch (err) {
        setError("Failed to save address");
      } finally {
        setLoading(false);
      }
    };
  
    const handleCloseBtnClick = () => {
      setShowSuccessModal(false);
      navigate("/");
    };
  
    return (
      <section className="Take_Away_Section">
        <div className="hospi_take_away_wrapper">
          <div className="container">
            <div className="hospi_tab_wrapper">
              <div className="tab tab-active">
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
  
                <form className="hospi_form_box" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Full Name*"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="Phone Number*"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    placeholder="Pincode*"
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="addressRegion"
                    value={formData.addressRegion}
                    onChange={handleChange}
                    required
                  >
                    {regions.map((region) => (
                      <option key={region.id} value={region.name}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="addressLocality"
                    value={formData.addressLocality}
                    placeholder="City"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="streetAddressLine1"
                    value={formData.streetAddressLine1}
                    placeholder="Address*"
                    onChange={handleChange}
                    required
                  />
  
                  {/* Map Picker */}
                  <MapPicker
                    key={addressId || "new-address"} // force remount on navigation
                    coords={mapCoords}
                    onSelect={handleMapSelect}
                  />
  
                  <button type="submit">Save Address</button>
                </form>
              </div>
            </div>
          </div>
        </div>
  
        {showSuccessModal && (
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">Address saved successfully!</div>
                <div className="modal-footer">
                  <button onClick={handleCloseBtnClick}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
}