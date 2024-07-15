import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";
import {
  useUpdateUserMutation,
  useGetUserQuery,
  useDeleteAccountMutation
} from "../features/users/usersApiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { loggedOut } from "../features/auth/authSlice.js";

function Profile() {
  const email = useSelector((state) => state.auth.id);
  console.log(email);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess } = useGetUserQuery(email);
  const [updateUser, update] = useUpdateUserMutation();
  const [deleteAccount, del] = useDeleteAccountMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [avatarPreview, setAvatarPreview] = useState({
    isEditing: 'false',
    value: ''
  });
  const [avatar, setAvatar] = useState();


  useEffect(() => {
    if (data) {
      const user = data.data;
      const shippingAddress = user.shippingAddress;

      setFormData({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });

      setShippingInfo({
        address: shippingAddress?.address,
        city: shippingAddress?.city,
        state: shippingAddress?.state,
        pincode: shippingAddress?.pincode,
      });

      setAvatarPreview({
        isEditing: false,
        value: user.avatar,
      });
    }
  }, [data]); //wrapped in a useEffect to prevent infinite rerenders.

  function handleInputChange(e) {
    //account info
    const { name: property, value } = e.target;
    setFormData({ ...formData, [property]: value });
  }
  async function handleInputSave({ name: property, value, title }) {
    const user = data.data;
    console.log("input save: ", property, value);
    if (!value) {
      setFormData({ ...formData, [property]: user?.[`${property}`] });
      toast.error(`Please provide ${title}`);
      return;
    }

    try {
      const details = new FormData();
      details.set(`${property}`, value);
      const res = await updateUser({ details, email }).unwrap();
      if (res.data) {
        toast.success(`${property} updated`);
        setFormData({ ...formData, [property]: res.data[`${property}`] });
      }
    } catch (error) {
      if(error.status === 409)
      toast.error(`This email is already under use`);
      else
      toast.error(`Failed to update ${title} `);

      setFormData({ ...formData, [property]: user?.[`${property}`] });
    }
  }

  function handleShippingInfoChange(e) {
    const { name: property, value } = e.target;
    setShippingInfo({ ...shippingInfo, [property]: value });
  }

  async function handleShippingInfoSave() {
    const shippingAddress = data.data.shippingAddress;
    for (const field in shippingInfo) {
      if (!shippingInfo[field]) {
        setShippingInfo({
          address: shippingAddress?.address,
          city: shippingAddress?.city,
          state: shippingAddress?.state,
          pincode: shippingAddress?.pincode,
        });

        toast.error("Please provide all address fields");
        return;
      }
    }

    try {
      // const details = new FormData();
      // details.set('shippingAddress', {...shippingInfo});
      console.log("shipping address to be sent", shippingInfo);
      const res = await updateUser({ email, details: {shippingAddress: shippingInfo} }).unwrap();
      if (res.data) {
        toast.success("Shipping address updated");
        setShippingInfo(res.data.shippingAddress);
      }
    } catch (error) {
      toast.error("Failed to update shipping address");
      console.log(error);
      setShippingInfo({
        address: shippingAddress?.address,
        city: shippingAddress?.city,
        state: shippingAddress?.state,
        pincode: shippingAddress?.pincode,
      });
    }
  }

  async function handleAvatarSave() {
    try {
      if (!avatar) return;

      const details = new FormData();
      details.set("avatar", avatar);
      const res = await updateUser({ details, email }).unwrap();
      if (res.data) {
        toast.success("Avatar updated");
        setAvatarPreview(res.data.avatar);
      }
    } catch (error) {
      toast.error("Failed to update avatar");
      setAvatarPreview(null);
    }
  }

  async function handleDeleteAccount(){
    try {
      await deleteAccount(email).unwrap();
      toast.success('Account deleted');
      navigate('/');
      dispatch(loggedOut());
    } catch (error) {
      toast.error('Failed to delete account');
      console.log('error deleting account', error);
    }
  }

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
  }

  if (!data || isLoading || update.isLoading) return <h1>Loading...</h1>;

  return (
    <main className="min-h-[98vh] p-3 pl-7 w-full">
      <form
        className="w-full py-5 flex items-start gap-8"
      >
        {/* left side */}
        <section className="w-[30%] bg-white flex flex-col gap-7">
          {/* image */}
          <AvatarSection
            avatarPreview={avatarPreview}
            setAvatarPreview={setAvatarPreview}
            fullName={formData.fullName}
            handleAvatarSave={handleAvatarSave}
            changeImageHandler={changeImageHandler}
          />

          <button className="delete-account-btn" onClick={(e)=>{
            e.preventDefault();
            handleDeleteAccount();
          }}>Delete Account <BsTrash/></button>

        </section>

        {/* right side */}
        <section className="w-[60%] bg-white border rounded-md p-10 shadow-md flex flex-col gap-10 profile-form">
          {/* account info */}
          <div className="flex flex-col gap-7">
            <h2 className="w-full text-xl font-bold text-black text-opacity-70 tracking-wide">
              Account Information
            </h2>
            <InputField
              title="Name"
              name="fullName"
              value={formData.fullName}
              // onChange={(e) => setFullName(e.target.value)}
              onChange={handleInputChange}
              onSave={handleInputSave}
              placeholder="Full Name"
            />

            <InputField
              title="Email"
              type="email"
              name="email"
              value={formData.email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleInputChange}
              onSave={handleInputSave}
              placeholder="Email"
            />

            <InputField
              title="Phone Number"
              type="tel"
              name="phoneNumber"
              pattern="[1-9]{1}[0-9]{9}"
              value={formData.phoneNumber}
              // onChange={(e) => setPhoneNumber(Number(e.target.value))}
              onChange={handleInputChange}
              onSave={handleInputSave}
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
              onSave={handleShippingInfoSave}
            />
          </div>
        </section>
      </form>
    </main>
  );
}

function AvatarSection({
  avatarPreview,
  setAvatarPreview,
  fullName,
  changeImageHandler,
  handleAvatarSave
}) {
  return (
    <div className="border rounded-md p-4 pt-3 shadow-md flex flex-col justify-between items-start gap-2">
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
                e.preventDefault();
                handleAvatarSave();                
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
    </div>
     
  );
}

export function InputField({
  title,
  type = "text",
  minLength = 5,
  maxLength = 40,
  value,
  name,
  onChange,
  onSave,
  placeholder = "",
  className = "",
  pattern,
}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex justify-start items-end gap-3 w-full">
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
          name={name}
          value={value}
          onChange={onChange}
        />
      </fieldset>
      {isEditing ? (
        <button
          className="profile-form-btn"
          onClick={(e) => {
            e.preventDefault();
            onSave({ name, value, title });
            setIsEditing(false);
          }}
        >
          <MdSave />
        </button>
      ) : (
        <button
          className="profile-form-btn"
          onClick={(e) => {
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
  className = "profile-form-fieldset",
  shippingAddress: { address, city, state, pincode },
  onChange,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  let addressString;
  if ([address, city, state, pincode].some((field) => !field))
    addressString = "Unavailable";
  else
    addressString = `${address || ""}, ${city || ""}-${pincode || ""}, ${
      state || ""
    }`;

  let content;
  if (!isEditing) {
    content = (
      <div className={`flex justify-start items-end gap-3 w-full ${className}`}>
        <fieldset>
          <legend>Shipping Address</legend>
          <p className="profile-form-input">{addressString}</p>
        </fieldset>
        <button
          // className="profile-form-btn"
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
      <section className={`w-full flex flex-col gap-6 ${className}`}>
        {/* address */}
        <div>
          <fieldset>
            <legend>Address</legend>
            <input
              required
              // className="profile-form-input"
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
              // className="profile-form-input"
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
              // className="profile-form-input"
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
              // className="profile-form-input"
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
            className="public-site-btn w-[70%]"
            onClick={(e) => {
              e.preventDefault();
              onSave();
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
