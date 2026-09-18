import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
  FieldDescription,
} from "../../../components/ui/field";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { useReducer, useState } from "react";

import axios from 'axios'

export function CategoryForm() {
  const initialState = {
    name: "",
  };

  const reducer = (state, action) => {
    return {
      ...state,
      [action.name]: action.value
    }
  }

  const [form, dispatch] = useReducer(reducer, initialState);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = {
      ...form, 
    }

    setSuccess("");
    setError("");

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-categories",
        categoryData
      );

      console.log(response.data);
       setSuccess(response.data.message);
     
      
    } catch (error) {
      if (error.response?.status === 409) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong");
    }
    }
    
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <FieldGroup className="p-5">
        <FieldSet>
          <FieldLegend>Category</FieldLegend>


          <FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
          
            <Field>

              <Input id="name" type="text" placeholder="Enter name"
                value={form.name}
                onChange={(e) => dispatch({name: "name", value: e.target.value})}
              />
            </Field>
            
          </FieldGroup>

        </FieldSet>

        {/* Buttons */}
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>   
           {success && (
          <p className="text-sm text-green-600">
            {success}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
        </Field>
       
      </FieldGroup>
    </form>
  );
}

export default CategoryForm;
