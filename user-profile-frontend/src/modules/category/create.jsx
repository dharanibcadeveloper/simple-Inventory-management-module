"use client"

import { Badge } from "../../components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { CategoryForm } from "./components/CategoryForm";



export default function CreateCategory() {
    return (
           <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Category</CardDescription>
          <CardTitle className="text-ml font-semibold tabular-nums @[250px]/card:text-xl">
           Create Category
          </CardTitle>
          {/* <CardAction>
            <button>View Users</button>
          </CardAction> */}
        </CardHeader>
       
          <CategoryForm/>
        
      </Card>
    
    </div>
    )
}