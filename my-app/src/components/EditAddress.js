import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";

export const EditAddress = ({ editAddressId }) => {
  const { allData, setAllData } = useContext(AppContext);
  const [editAddress, setEditAddress] = useState({
    id: editAddressId,
    name: allData?.address?.find(({ id }) => id === editAddressId)?.name,
    house: allData?.address.find(({ id }) => id === editAddressId)?.house,
    city: allData?.address?.find(({ id }) => id === editAddressId)?.city,
    state: allData?.address?.find(({ id }) => id === editAddressId)?.state,
    country: allData?.address.find(({ id }) => id === editAddressId)?.country,
    pincode: allData?.address.find(({ id }) => id === editAddressId)?.pincode,
    mobileNumber: allData?.address?.find(({ id }) => id === editAddressId)
      ?.mobileNumber,
  });

  return (
    <div>
      <div style={{ border: "1px solid lightgray" }}>
        <h3>Edit Address</h3>
        <form>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={editAddress.name}
            onChange={(e) =>
              setEditAddress((editAddress) => ({
                ...editAddress,
                name: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="house">House: </label>
          <input
            type="text"
            id="house"
            placeholder="Enter house details"
            value={editAddress.house}
            onChange={(e) =>
              setEditAddress((editAddress) => ({
                ...editAddress,
                house: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="city">City: </label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={editAddress.city}
            onChange={(e) =>
              setEditAddress((editAddress) => ({
                ...editAddress,
                city: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="state">State: </label>
          <input
            type="text"
            id="state"
            placeholder="Enter State"
            value={editAddress.state}
            onChange={(e) =>
              setEditAddress((editAddress) => ({
                ...editAddress,
                state: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="country">Country: </label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            value={editAddress.country}
            onChange={(e) =>
              setEditAddress((editAddress) => ({
                ...editAddress,
                country: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="pincode">Pincode: </label>
          <input
            type="text"
            id="pincode"
            placeholder="Enter Pincode"
            value={editAddress.pincode}
            onChange={(e) =>
              setEditAddress((editAddress) => ({
                ...editAddress,
                pincode: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="mobNumber">Mobile No.: </label>
          <input
            type="text"
            id="mobNumber"
            placeholder="Enter Mobile number"
            value={editAddress.mobileNumber}
            onChange={(e) =>
              setEditAddress((editAddress) => ({
                ...editAddress,
                mobileNumber: e.target.value,
              }))
            }
          />
          <br />
          <div>
            <button
              type="submit"
              onClick={() => {
                setAllData({
                  type: "SAVE_ADDRESS",
                  payload: [editAddress, editAddressId],
                });
              }}
            >
              Save
            </button>
            <button
              type="submit"
              onClick={() => {
                setAllData({
                  type: "CANCEL_ADDRESS",
                  payload: editAddressId,
                });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
