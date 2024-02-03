import { DevTool } from "@hookform/devtools";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { nameOption, surNameOption } from "../constants";

interface selectProps {
  data: {
    name: string;
    surName: string;
  }[];
}

const MainComponent = () => {
  const form = useForm<selectProps>({
    defaultValues: {
      data: [
        {
          name: "",
          surName: "",
        },
      ],
    },
  });

  //form handlers
  const { register, control, handleSubmit, formState, watch } = form;

  //form error handlers
  const { errors } = formState;

  //multiple fields array
  const { fields, append, remove } = useFieldArray({
    name: "data",
    control,
  });

  //selected names from the option
  const selectedName: string[] = [];

  //const get currentvalues
  const data = watch(["data"]);

  //handle Submit
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-top items-center pt-[5%] w-[100vw] h-[100vh]">
      <div className="w-[100%] flex justify-between items-center px-[5rem]">
        <h1 className="text-white sm:text-[45px] text-[35px] font-bold ">
          Dynamic Select Form
        </h1>
        <button
          type="button"
          className="bg-black text-[#feadb9] text-[25px] px-[2rem] py-[1rem] rounded-[10px]"
          onClick={() => append({ name: "", surName: "" })}
        >
          Add Field
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-[100%] pt-[30px]">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col w-[100%] justify-between items-center"
            >
              <div className="pt-[1rem]">
                <select
                  className="w-[100%] bg-transparent text-white p-[1rem] sm:px-[2rem] text-[25px] outline-none border-white border-[2px] "
                  {...register(`data.${index}.name`, {
                    required: {
                      value: true,
                      message: `Please select your name for ${index}`,
                    },
                  })}
                >
                  <option className="bg-[#8d988d] text-white" value="">
                    Please Select Your Name
                  </option>

                  {nameOption.map((data, index) => (
                    <option
                      className="bg-[#8d988d] text-white"
                      key={index}
                      value={data.value}
                    >
                      {data.lable}
                    </option>
                  ))}
                </select>

                <p className="text-[#ab4102]">
                  {errors?.data?.[index]?.name?.message}
                </p>
              </div>

              <div className="pt-[1rem] sm:px-[1rem]">
                <select
                  className="w-[100%] bg-transparent text-white p-[1rem] sm:px-[2rem] text-[25px] outline-none border-white border-[2px] "
                  {...register(`data.${index}.surName`, {
                    required: {
                      value: true,
                      message: `Please select your surname for ${index}`,
                    },
                  })}
                >
                  <option className="bg-[#8d988d] text-white" value="">
                    Please Select Your Surname
                  </option>
                  {surNameOption.map((data, index) => (
                    <option
                      className="bg-[#8d988d] text-white"
                      key={index}
                      value={data.value}
                    >
                      {data.lable}
                    </option>
                  ))}
                </select>

                <p className="text-[#ab4102]">
                  {errors?.data?.[index]?.surName?.message}
                </p>
              </div>

              {index > 0 && (
                <div className="pt-[1rem]">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-black text-[#feadb9] text-[25px] px-[2rem] py-[1rem] rounded-[10px]"
                  >
                    Remove Field
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pt-[1rem] flex items-center justify-center">
          <button
            className="bg-black text-[#feadb9] text-[25px] px-[2rem] py-[1rem] rounded-[10px]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default MainComponent;
