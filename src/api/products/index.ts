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

export const useUpdateProduct=()=>{
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; image: string | null; price: number }) => {
      const { error, data: updatedProduct } = await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq('id',data.id)
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error.message);
        throw new Error(error.message);
      }

      return updatedProduct;
    },
    onSuccess: (data) => {
      console.log("✅ Product inserted successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products",data.id] });
    },
    onError: (error) => {
      console.error("❌ Insert failed:", error);
    },
  });
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (_, id) => {
      // Invalidate the product list and the specific product if it's cached
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", id] });
    },
    onError: (err) => {
      console.error("❌ Delete failed:", err);
    },
  });
};
