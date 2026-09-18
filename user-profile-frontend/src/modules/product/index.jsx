import { useEffect, useState } from "react"
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Button } from "../../components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IndexProduct() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {

      const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-product"
      );

      setProducts(response.data.data);

    } catch (error) {
      console.error(error);
    }
    };
    
    getProducts();

  }, [])

  
  const handleDelete = async (id) => {
  try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/delete/${id}`
      );

      console.log(response.data);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

    } catch (error) {
      console.error(error);
    }
    };
  
  return (

     <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Product</CardDescription>
          <CardTitle className="text-ml font-semibold tabular-nums @[250px]/card:text-xl">
           List Category
          </CardTitle>
          {/* <CardAction>
            <button>View Users</button>
          </CardAction> */}
        </CardHeader>
       
          <Table>
      {(products > 0) &&  <TableCaption>No Products</TableCaption>}
     
      <TableHeader>
        <TableRow>
          <TableHead >Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead >Price</TableHead>
          <TableHead>Stocks</TableHead>
          <TableHead >Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell >{product.product_name}</TableCell>
            <TableCell>{product.category_name}</TableCell>
            <TableCell >{product.sku}</TableCell>
            <TableCell >{product.price}</TableCell>
            <TableCell >{product.stock_quantity}</TableCell>
            <TableCell > <Button type="button"   onClick={() => navigate(`/edit-product/${product.id}`)}><Edit/></Button> <Button type="submit"  onClick={() => handleDelete(product.id)} ><Trash/></Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
        
      </Card>
    
    </div>
 
  )
}
