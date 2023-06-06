import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { v4 as uuid } from "uuid";

export const NewAddressInput = ({ setAddNewAddress }) => {
  const { setAllData } = useContext(AppContext);
  const [addressForm, setAddressForm] = useState({
    id: uuid(),
    name: "",
    house: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobileNumber: "",
  });
  const addAddressHandler = (e) => {
    e.preventDefault();
    setAllData({ type: "SET_USER_ADDRESS", payload: addressForm });
    setAddNewAddress(false);
    alert("New Address Added");
  };
  return (
    <div>
      <div>
        <h3>Add New Address</h3>
        <form onSubmit={addAddressHandler}>
          <label htmlFor="name">Name: </label>
          <input
            placeholder="Enter Name"
            id="name"
            type="text"
            value={addressForm.name}
            onChange={(e) =>
              setAddressForm((addressForm) => ({
                ...addressForm,
                name: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="house">House: </label>
          <input
            placeholder="Enter house details"
            id="house"
            type="text"
            value={addressForm.house}
            onChange={(e) =>
              setAddressForm((addressForm) => ({
                ...addressForm,
                house: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="city">City: </label>
          <input
            placeholder="Enter City"
            id="city"
            type="text"
            value={addressForm.city}
            onChange={(e) =>
              setAddressForm((addressForm) => ({
                ...addressForm,
                city: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="state">State: </label>
          <input
            placeholder="Enter state"
            id="state"
            type="text"
            value={addressForm.state}
            onChange={(e) =>
              setAddressForm((addressForm) => ({
                ...addressForm,
                state: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="country">Country: </label>
          <input
            placeholder="Enter Country"
            id="country"
            type="text"
            value={addressForm.country}
            onChange={(e) =>
              setAddressForm((addressForm) => ({
                ...addressForm,
                country: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="pincode">Pincode: </label>
          <input
            placeholder="Enter Pincode"
            id="pincode"
            type="number"
            value={addressForm.pincode}
            onChange={(e) =>
              setAddressForm((addressForm) => ({
                ...addressForm,
                pincode: e.target.value,
              }))
            }
          />
          <br />

          <label htmlFor="mobileNumber">Mobile No.: </label>
          <input
            placeholder="Enter Mobile Number"
            id="mobileNumber"
            type="number"
            value={addressForm.mobileNumber}
            onChange={(e) =>
              setAddressForm((addressForm) => ({
                ...addressForm,
                mobileNumber: e.target.value,
              }))
            }
          />
          <br />

          <button type="submit">Add</button>
          <button onClick={() => setAddNewAddress(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};
