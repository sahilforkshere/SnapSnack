import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

export const useProductList=()=>{
  return useQuery({
        queryKey: ['products'],
        queryFn:async () => {
          const {data,error}= await supabase.from('products').select("*")
          if (error) {
            throw new Error(error.message)
          }
    
          return data;
        }
      })
}

export const useProduct=(id:number)=>{
    return useQuery({
        queryKey:['products',id],
        queryFn:async()=>{
            const {data,error}=await supabase.from('products').select("*").eq('id',id).single();
            if (error) {
                throw new Error(error.message   )


            }
            return data;
        }
    })
}


export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; image: string | null; price: number }) => {
      const { error, data: newProduct } = await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .single();

      if (error) {
        console.error("Supabase insert error:", error.message);
        throw new Error(error.message);
      }

      return newProduct;
    },
    onSuccess: (data) => {
      console.log("✅ Product inserted successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("❌ Insert failed:", error);
    },
  });
};