import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoriesState, categoryState } from "../atoms";
import { useForm } from "react-hook-form";

interface IForm {
  category: string;
}

function CreateCategory() {
  const setCategories = useSetRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategories(({ oldCategories }: any) => ({ ...oldCategories, category }));
    console.log({ Categories, category });
    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
