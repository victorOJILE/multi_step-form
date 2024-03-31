import { useState } from "react";
import { AppContext } from "@/context";

export default function PersonalInfo({}) {
  const { state, setState, checkForError } = AppContext();
  // Adding personal info is the first step, hence 0
  const [data, setData] = useState(state.data[0]);

  function handleBlur() {
    setState((prev) => {
      const personalInfo = prev.data;

      // Adding personal info is the first step, hence 0
      personalInfo[0] = {
        ...personalInfo[0],
        ...data,
        completed: Object.values(data)
          .filter((e) => typeof e !== "boolean") // To remove the completed: Boolean, field
          .every(Boolean),
      };

      // returning a new object so state can be updated
      return {
        ...prev,
      };
    });
  }
	
  function handleChange(e) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  
  return (
    <form className="marine text-xs fontMedium">
      <Input
        name="name"
        text="Name"
        type="text"
        placeholder="Stephen King"
        data={data}
        checkForError={checkForError}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <Input
        name="email"
        text="Email Address"
        type="email"
        placeholder="e.g stephenking@lorem.com"
        data={data}
        checkForError={checkForError}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <Input
        name="phoneNo"
        text="Phone Number"
        type="tel"
        placeholder="e.g +1 234 567 890"
        data={data}
        checkForError={checkForError}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
    </form>
  );
}

function Input({ name, type, text, placeholder, data, checkForError, handleBlur, handleChange }) {
  return (
    <label htmlFor={name} className="block py-2">
      <div className="flex-ac justify-between">
        <div className="md:mb-1">{text}</div>
        <div className={"strawberry" + ((checkForError && !data[name]) ? "" : " hidden")}>This field is required</div>
      </div>
      <input
        type={type}
        id={name}
        name={name}
        className={"w-full rounded py-2 px-3 border border-gray-300 hover:border-blue-800 focus:border-blue outline-none" + ((checkForError && !data[name]) ? " invalid:border-red-600" : "")}
        placeholder={placeholder}
        value={data[name] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
    </label>
  )
}
