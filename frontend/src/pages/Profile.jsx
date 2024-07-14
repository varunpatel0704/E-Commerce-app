import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";

function Profile() {
  const [fullName, setFullName] = useState("Varun Patel");
  const [email, setEmail] = useState("varunpatel0704@gmail.com");
  const [password, setPassword] = useState("13451431");
  const [phoneNumber, setPhoneNumber] = useState(7436018769);
  const [avatarPreview, setAvatarPreview] = useState({
    isEditing: false,
    value: undefined,
  }); //just to show a preview to the user
  const [avatar, setAvatar] = useState(); // will be actually sent back to the server.
  const [shippingInfo, setShippingInfo] = useState({
    address: "A6 New Vaibhav apartments",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380006",
  });

  function handleShippingInfoChange(e) {
    setShippingInfo({ ...shippingInfo, [e.target.name]: [e.target.value] });
  }

  const navigate = useNavigate();

  function changeImageHandler(e) {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        // after reading the file, if successful, assign the url to the state var
        if (typeof reader.result === "string") {
          setAvatarPreview({ ...avatarPreview, value: reader.result });
          setAvatar(file);
        }
      };
      reader.readAsDataURL(file); // read the file locaiton as string url
    }
    // if (e.target.files && e.target.files[0]) {
    //   setImage(URL.createObjectURL(e.target.files[0]));
    // }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        [fullName, email, password, role].some(
          (item) => item === undefined || item === ""
        )
      ) {
        console.log("fill all inputs");
        return;
      }

      const formData = new FormData();
      formData.set("fullName", fullName);
      formData.set("email", email.toLowerCase());
      formData.set("password", password);
      formData.set("role", role.toLowerCase());
      formData.set("avatar", avatar);
      formData.set("phoneNumber", phoneNumber.toString());

      const res = await createUser(formData).unwrap();
      if (res.data) {
        console.log(res.data);
        toast.success("User added");
        navigate("/admin/dashboard/users");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create user");
    }
  }

  return (
    <main className="min-h-[98vh] p-3 pl-7 w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full py-5 flex items-start gap-8 profile-form"
      >
        {/* left side */}
        <section className="w-[30%] bg-white flex flex-col gap-7">
          {/* image */}
          <AvatarSection
            avatarPreview={avatarPreview}
            setAvatarPreview={setAvatarPreview}
            fullName={fullName}
            changeImageHandler={changeImageHandler}
          />
        </section>

        {/* right side */}
        <section className="w-[60%] bg-white border rounded-lg p-10 shadow-md flex flex-col gap-10">
          {/* account info */}
          <div className="flex flex-col gap-7">
            <h2 className="w-full text-xl font-bold text-black text-opacity-70 tracking-wide">
              Account Information
            </h2>
            <InputField
              title="Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />

            <InputField
              title="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <InputField
              title="Password"
              type="password"
              value={password}
              minLength={8}
              maxLength={24}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <InputField
              title="Phone Number"
              type="tel"
              pattern="[1-9]{1}[0-9]{9}"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(Number(e.target.value))}
              placeholder="Phone Number"
            />
          </div>

          {/* shipping info */}
          <div className="flex flex-col gap-7 w-full">
            <h2 className="w-full text-xl font-bold text-black text-opacity-70 tracking-wide">
              Shipping Address
            </h2>
            <ShippingInfo
              shippingAddress={shippingInfo}
              onChange={handleShippingInfoChange}
            />
          </div>
        </section>
      </form>
    </main>
  );
}

function AvatarSection({ avatarPreview, setAvatarPreview, fullName, changeImageHandler }) {
  return (
    <div className="flex flex-col gap-6">
      <fieldset className="border rounded p-4 pt-3 shadow-md flex flex-col justify-between items-start gap-2">
        {avatarPreview.isEditing ? (
          <>
            <input
              type="file"
              className="p-0.5 text-sm cursor-pointer rounded"
              onChange={changeImageHandler}
            />
            <p className="flex gap-2">
              <button
                className=""
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setAvatarPreview({
                    ...avatarPreview,
                    isEditing: false,
                  });
                }}
              >
                <MdSave />
              </button>

              <button
                className=""
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setAvatarPreview({
                    ...avatarPreview,
                    isEditing: false,
                  });
                }}
              >
                <MdCancel />
              </button>
            </p>
          </>
        ) : (
          <div className="flex gap-4 justify-center items-center">
            <p className="flex items-end">
              <img
                src={
                  avatarPreview.value
                    ? avatarPreview.value
                    : "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                }
                alt="Profile picture"
                className="h-20 w-20 object-cover rounded-full"
              />
              <button
                className=""
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setAvatarPreview({ ...avatarPreview, isEditing: true });
                }}
              >
                <MdEdit />
              </button>
            </p>
            <p>
              Hello,
              <p className="font-bold text-black text-opacity-70 text-xl">
                {fullName}
              </p>
            </p>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export function InputField({
  title,
  type = "text",
  minLength = 5,
  maxLength = 40,
  value,
  onChange,
  placeholder = "",
  className = "",
  pattern,
}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex justify-start items-end gap-2 w-full">
      <fieldset className="profile-form-fieldset">
        <legend>{title}</legend>
        <input
          disabled={!isEditing}
          required
          className={className ? className : "profile-form-input"}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          pattern={pattern}
          value={value}
          onChange={onChange}
        />
      </fieldset>
      {isEditing ? (
        <button
          className="product-form-btn"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsEditing(false);
          }}
        >
          <MdSave />
        </button>
      ) : (
        <button
          className="product-form-btn"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsEditing(true);
          }}
        >
          <MdEdit />
        </button>
      )}
    </div>
  );
}

export function ShippingInfo({
  shippingAddress: { address, city, state, pincode },
  onChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const addressString = `${address}, ${city}-${pincode}, ${state}`;
  console.log(addressString);
  let content;
  if (!isEditing) {
    content = (
      <div className="flex justify-start items-end gap-2 w-full">
        <fieldset className="profile-form-fieldset">
          <legend>Shipping Address</legend>
          <p className="profile-form-input">{addressString}</p>
        </fieldset>
        <button
          className="product-form-btn"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsEditing(true);
          }}
        >
          <MdEdit />
        </button>
      </div>
    );
  } else {
    content = (
      <section className="w-full flex flex-col gap-6">
        {/* address */}
        <div>
          <fieldset className="profile-form-fieldset">
            <legend>Address</legend>
            <input
              required
              className="profile-form-input"
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={onChange}
            />
          </fieldset>
        </div>
        {/* city */}
        <div>
          <fieldset className="profile-form-fieldset">
            <legend>City</legend>
            <input
              required
              className="profile-form-input"
              type="text"
              name="city"
              placeholder="City"
              value={city}
              onChange={onChange}
            />
          </fieldset>
        </div>
        {/* state */}
        <div>
          <fieldset className="profile-form-fieldset">
            <legend>State</legend>
            <input
              required
              className="profile-form-input"
              type="text"
              name="state"
              placeholder="State"
              value={state}
              onChange={onChange}
            />
          </fieldset>
        </div>
        {/* pincode */}
        <div className="flex flex-col gap-6">
          <fieldset className="profile-form-fieldset">
            <legend>Pincode</legend>
            <input
              required
              className="profile-form-input"
              type="number"
              minLength={6}
              maxLength={6}
              pattern="[0-9]{6}"
              title="Enter 6 digit pincode"
              name="pincode"
              placeholder="Pincode"
              value={pincode}
              onChange={onChange}
            />
          </fieldset>
          <button
            className="public-site-btn w-[70%] product-form-btn"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </div>
      </section>
    );
  }

  return content;
}

export default Profile;
