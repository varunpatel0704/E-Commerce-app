import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../features/users/usersApiSlice.js";
import toast from "react-hot-toast";

function CreateUserForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(); //just to show a preview to the user
  const [avatar, setAvatar] = useState(); // will be actually sent back to the server.

  const navigate = useNavigate();

  const [createUser, { isLoading, isError, isSuccess }] =
    useCreateUserMutation();

  function changeImageHandler(e) {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        // after reading the file, if successful, assign the url to the state var
        if (typeof reader.result === "string") {
          setAvatarPreview(reader.result);
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
        // [fullName, email, password].some(
        //   (item) => item === undefined || item === ""
        // )
        !fullName
      ) {
        toast.error('Provide Full Name');
        return;
      }
      if (
        !email
      ) {
        toast.error('Provide Email');
        return;
      }
      if (
        !password
      ) {
        toast.error('Provide Password');
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
      if(res.data){
        console.log(res.data);
        toast.success('User added');
        navigate('/admin/dashboard/users');
      }
    } catch (error) {
      if(error.status === 409){
        toast.error('User already exists');
      }
      else{
        toast.error('Failed to create user');
        console.log(error);        
      }
    }
  }
  if(isLoading) return <h1>Loading...</h1>;
  // if(isError) return <h1>Error...</h1>;

  return (
    <main className="min-h-[98vh] bg-white p-3 pl-7 border shadow-md rounded w-full relative">
      <Link to={"/admin/dashboard/users"}>
        <BiArrowBack />
      </Link>

      <h2 className="mt-1 w-full text-xl font-bold text-black text-opacity-70 tracking-wide">
        Create User
      </h2>
     
      <form className="w-full py-5 flex items-start gap-8 product-form">
        {/* left side */}
        <section className="w-[46%] flex flex-col gap-8">
          {/* name */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Full Name</legend>
              <input
                className="product-form-input"
                required
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </fieldset>
          </div>

          {/* Email */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Email</legend>
              <input
                className="product-form-input"
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>

          {/* Password */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Password</legend>
              <input
                required
                className="product-form-input"
                type="password"
                minLength={8}
                maxLength={24}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>

          {/* Phone number */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Phone Number</legend>
              <input
                // required
                min={0}
                className="product-form-input"
                type="tel"
                pattern="[1-9]{1}[0-9]{9}"
                minLength={10}
                maxLength={10}
                title="Enter 10 digit Indian phone number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(Number(e.target.value))}
              />
            </fieldset>
          </div>

          {/* Role */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Role</legend>
              <select
                className="product-form-input"
                required
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </fieldset>
          </div>
        </section>

        {/* right side */}
        <section className="w-[50%] flex flex-col gap-7">
          {/* image */}
          <div className="flex flex-col gap-6">
            <fieldset className="border rounded p-4 pt-3 shadow-sm flex flex-col justify-between items-start gap-2">
              <legend className="text-[0.8rem] px-[0.3rem] text-black text-opacity-60">
                Avatar
              </legend>
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Profile picture"
                  className="h-64 w-64 object-cover rounded-md border"
                />
              )}
              <input
                type="file"
                className="p-0.5 text-sm cursor-pointer rounded "
                onChange={changeImageHandler}
              />
            </fieldset>

            <button type="submit" onClick={handleSubmit}>
              Create User
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}

export default CreateUserForm;
