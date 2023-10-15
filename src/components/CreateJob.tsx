import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { PriorityEnum } from "../types";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../app/hooks";
import { addJob } from "../features/jobs/jobSlice";
import { CustomSelect } from "./Custom/Select";
import React, { useMemo } from "react";

interface IFormInput {
  name: string;
  priority: PriorityEnum | "";
}
interface Props {
  naviteSelect?: boolean;
}
export const CreateJob: React.FC<Props> = ({ naviteSelect = false }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      priority: "",
    },
  });
  const priority = watch("priority");
  const onSubmit = (values: IFormInput) => {
    if (values.priority === "") {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(addJob(values as any));
    setValue("name", "");
  };
  const options = useMemo(() => {
    const list = [
      { value: PriorityEnum.URGENT, displayName: "Urgent" },
      { value: PriorityEnum.REGULAR, displayName: "Regular" },
      { value: PriorityEnum.TRIVIAL, displayName: "Trivial" },
    ];
    return list.map((item) => {
      if (naviteSelect) {
        return (
          <option key={item.value} value={item.value}>
            {item.displayName}
          </option>
        );
      }
      return (
        <MenuItem key={item.value} value={item.value}>
          {item.displayName}
        </MenuItem>
      );
    });
  }, [naviteSelect]);
  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      autoComplete="off"
      sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}
    >
      <Box sx={{ flex: 1 }}>
        <FormControl fullWidth variant="standard">
          <TextField
            label="Job Name"
            variant="standard"
            {...register("name", {
              required: "Job name is required",
              minLength: {
                message: "Min lenght: 3",
                value: 3,
              },
              maxLength: {
                message: "Max length: 50",
                value: 50,
              },
            })}
            inputProps={{ "data-testid": "createJobInputText" }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <FormHelperText>Type your job description</FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ flexShrink: 0, minWidth: 140 }}>
        <FormControl fullWidth variant="standard">
          <CustomSelect
            fullWidth
            label="Job Priority"
            variant="standard"
            SelectProps={{ native: naviteSelect }}
            value={priority}
            error={!!errors.priority}
            // data-testid="prioritySelect"
            inputProps={{ "data-testid": "prioritySelect" }}
            register={register("priority", {
              required: "Priority is required",
            })}
          >
            {options}
          </CustomSelect>
          {errors.priority && (
            <FormHelperText error>{errors.priority?.message}</FormHelperText>
          )}
          <FormHelperText>Select job's priority</FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <Button
          type="submit"
          title="Create"
          variant="contained"
          data-testid="submit-button"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};
