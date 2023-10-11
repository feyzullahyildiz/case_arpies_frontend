import React from "react";
import { JobType, PriorityEnum } from "../types";
import { useRenderInDialog } from "../context";
import Button from "@mui/material/Button";
import { Box, FormControl, MenuItem, TextField } from "@mui/material";
import { CustomSelect } from "./Custom/Select";
import { useForm } from "react-hook-form";

interface IFormInput {
  priority: PriorityEnum;
}

interface Props {
  job: JobType;
}
export const EditJob: React.FC<Props> = ({ job }) => {
  const { onClose } = useRenderInDialog();
  const { register, watch, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      priority: job.priority,
    },
  });
  const priority = watch("priority");
  const onSubmit = (values: IFormInput) => {
    onClose(values.priority);
  };

  return (
    <div>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          p: 2,
        }}
      >
        <FormControl fullWidth variant="standard">
          <TextField
            label="Job Name"
            variant="standard"
            value={job.name}
          ></TextField>
        </FormControl>

        <FormControl fullWidth variant="standard">
          <CustomSelect
            fullWidth
            label="Job Priority"
            variant="standard"
            value={priority}
            register={register("priority", {
              required: "Priority is required",
            })}
          >
            <MenuItem value={PriorityEnum.URGENT}>Urgent</MenuItem>
            <MenuItem value={PriorityEnum.REGULAR}>Regular</MenuItem>
            <MenuItem value={PriorityEnum.TRIVIAL}>Trivial</MenuItem>
          </CustomSelect>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            type="button"
            onClick={() => onClose(null)}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </Box>
      </Box>
    </div>
  );
};
