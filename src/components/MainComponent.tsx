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
  const { register, control, handleSubmit, formState } = form;

  //form error handlers
  const { errors } = formState;

  //multiple fields array
  const { fields, append, remove } = useFieldArray({
    name: "data",
    control,
  });

  //handle Submit
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <select
                {...register(`data.${index}.name`, {
                  required: {
                    value: true,
                    message: `Please select your name for ${index}`,
                  },
                })}
              >
                <option value="">Please Select Your Name</option>

                {nameOption.map((data, index) => (
                  <option key={index} value={data.value}>
                    {data.lable}
                  </option>
                ))}
              </select>

              <p className="text-[#ab4102]">
                {errors?.data?.[index]?.name?.message}
              </p>

              <select
                {...register(`data.${index}.surName`, {
                  required: {
                    value: true,
                    message: `Please select your surname for ${index}`,
                  },
                })}
              >
                <option value="">Please Select Your Surname</option>
                {surNameOption.map((data, index) => (
                  <option key={index} value={data.value}>
                    {data.lable}
                  </option>
                ))}
              </select>

              <p className="text-[#ab4102]">
                {errors?.data?.[index]?.surName?.message}
              </p>

              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove Field
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", surName: "" })}
          >
            Add Field
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default MainComponent;
