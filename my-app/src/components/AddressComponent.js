import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { EditAddress } from "./EditAddress";
import { NewAddressInput } from "./NewAddressInput";

export const AddressComponent = () => {
  const { allData, setAllData } = useContext(AppContext);
  const [addNewAddress, setAddNewAddress] = useState(false);
  return (
    <div>
      {allData.address.length === 0 && <h3>No Address Added</h3>}
      {allData.address?.map((address) => {
        return (
          <div key={address.id} style={{ border: "1px solid lightgray" }}>
            <h2>Address:</h2>
            <p>
              <span style={{ fontWeight: "bold" }}>Name:</span> {address.name}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
              {address.house},{address.city},{address.country}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Pincode:</span>{" "}
              {address.pincode}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Phone number:</span>{" "}
              {address.mobileNumber}
            </p>
            {address.isEdit && <EditAddress editAddressId={address.id} />}
            <button
              onClick={() =>
                setAllData({
                  type: "EDIT_ADDRESS",
                  payload: address.id,
                })
              }
            >
              Edit
            </button>
            <button
              onClick={() =>
                setAllData({
                  type: "DELETE_ADDRESS",
                  payload: address.id,
                })
              }
            >
              Delete
            </button>
            <br />
            <hr style={{ borderTop: "1px dotted", width: "60%" }} />
            <button onClick={() => setAddNewAddress(true)}>
              Add new address
            </button>
            {addNewAddress && (
              <NewAddressInput setAddNewAddress={setAddNewAddress} />
            )}
          </div>
        );
      })}
    </div>
  );
};
