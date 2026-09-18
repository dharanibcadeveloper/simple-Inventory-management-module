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
import { useParams } from "react-router-dom";

import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { useReducer, useState, useEffect } from "react";

import axios from 'axios'

export function ProductForm() {

  const { id } = useParams();

  const initialState = {
    category_id: "",
    product_name: "",
    sku: "",
    price: "",
    stock_quantity: "",
  };

  const reducer = (state, action) => {
    return {
      ...state,
      [action.name]: action.value
    }
  }

  const [form, dispatch] = useReducer(reducer, initialState);
  const [categories, setCategories] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...form, 
    }

     setSuccess("");
    setError("");

    try {

      const response = id
        ? await axios.put( `http://127.0.0.1:8000/api/update-product/${id}`, productData )
        : await axios.post("http://127.0.0.1:8000/api/create-product", productData);

       console.log(response.data);
       setSuccess(response.data.message);
      
    } catch (error) {
        if (error.response?.status === 422) {

    const errors = error.response.data.errors;

    const firstError = Object.values(errors)[0][0];

    setError(firstError);

  } else if (error.response?.status === 409) {

    setError(error.response.data.message);

  } else {

    setError(
      error.response?.data?.message || "Something went wrong"
    );

  }
    }
    
  }

  useEffect(() => {
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-categories"
      );

      setCategories(response.data.data);

    } catch (error) {
      console.error(error);
    }
    };
    
    getCategories();
    
  }, []);
  
 useEffect(() => {
  if (!id) return;

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/edit-product/${id}`
      );

      const product = response.data.data;

      dispatch({ name: "category_id", value: String(product.category_id) });
      dispatch({ name: "product_name", value: product.product_name });
      dispatch({ name: "sku", value: product.sku });
      dispatch({ name: "price", value: product.price });
      dispatch({ name: "stock_quantity", value: String(product.stock_quantity) });

    } catch (error) {
      console.error(error);
    }
  };

  getProduct();
 }, [id]);
  

  return (

     <form className="w-full" onSubmit={handleSubmit}>
      <FieldGroup className="p-5">
        <FieldSet>
          <FieldLegend>Product</FieldLegend>

       
          <FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-4">
              <Field>
              <FieldLabel>Category Name</FieldLabel>
            
              <Select
              value={form.category_id} onValueChange={(value) => dispatch({name: "category_id", value: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={String(category.id)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          
            <Field>
              <FieldLabel htmlFor="name">Product Name</FieldLabel>

              <Input id="name" type="text" placeholder="Enter Product name"
                value={form.product_name}
                onChange={(e) => dispatch({name: "product_name", value: e.target.value})}
              />
            </Field>
           
            <Field>
              <FieldLabel htmlFor="name">SKU</FieldLabel>

              <Input id="name" type="text" placeholder="Enter SKU"
                value={form.sku}
                onChange={(e) => dispatch({name: "sku", value: e.target.value})}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Price</FieldLabel>

              <Input id="name" type="number" placeholder="Enter name" step="0.01"
                value={form.price}
                onChange={(e) => dispatch({ name: "price", value: e.target.value ? Number(e.target.value).toFixed(2) : "" })}
                // onBlur={() =>
                //     dispatch({
                //       name: "price",
                //       value: form.price ? Number(form.price).toFixed(2) : ""
                //     })
                //   }
              />
            </Field>
          
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-4">
  <Field>
              <FieldLabel htmlFor="name">stock quantity</FieldLabel>

              <Input id="name" type="number" placeholder="Enter SKU"
                value={form.stock_quantity}
                onChange={(e) => dispatch({name: "stock_quantity", value: e.target.value})}
              />
            </Field>
          </FieldGroup>

        </FieldSet>

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

export default ProductForm;
