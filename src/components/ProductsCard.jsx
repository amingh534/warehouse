import { useDeleteProduct } from "../services/mutation";

function ProductsCard({product}) {
    const { mutate } = useDeleteProduct();
  
    const deleteHandler = (id) => {
      const data = {
        ids: [id],
      };
      
      
      mutate(
        { data },
        {
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    };
    const editHandler = () => {
        console.log("edited");
      };
    
  return (
    <li>
      <p>{product?.name}</p>
      <button onClick={() => deleteHandler(product?.id)}>Delete</button>
      <button onClick={editHandler}>Edit</button>
    </li>
  );
}

export default ProductsCard;
