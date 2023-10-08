import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { PriorityEnum } from '../types';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../app/hooks';
import { addJob } from '../features/jobs/jobSlice';

interface IFormInput {
    name: string;
    priority: PriorityEnum;
}

export const CreateJob = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>();

    const onSubmit = (values: IFormInput) => {
        dispatch(addJob(values));
        setValue("name", "")
    }
    return (
        <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            autoComplete="off"
            sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
        >
            <Box sx={{ flex: 1 }}>
                <FormControl fullWidth variant="standard">
                    <TextField
                        id="outlined-basic"
                        label="Job Name"
                        variant="standard"
                        {...register("name", {
                            required: "Job name is required", minLength: {
                                message: "Min lenght: 3",
                                value: 3,
                            }, maxLength: {
                                message: "Max length: 50", value: 50
                            }
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <FormHelperText>Type your job description</FormHelperText>
                </FormControl>
            </Box>
            <Box sx={{ flexShrink: 0, minWidth: 140 }}>
                <FormControl fullWidth variant="standard" >
                    <TextField
                        select
                        fullWidth
                        label="Job Priority"
                        defaultValue=''
                        inputProps={register("priority", { required: "Priority is required" })}
                        id="demo-simple-select"
                        variant="standard"
                        error={!!errors.priority}
                    >
                        <MenuItem value={PriorityEnum.URGENT}>Urgent</MenuItem>
                        <MenuItem value={PriorityEnum.REGULAR}>Regular</MenuItem>
                        <MenuItem value={PriorityEnum.TRIVIAL}>Trivial</MenuItem>
                    </TextField>
                    {errors.priority && <FormHelperText error>{errors.priority?.message}</FormHelperText>}
                    <FormHelperText>Select job's priority</FormHelperText>
                </FormControl>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
                <Button type='submit' title='Create' variant='contained' >Create</Button>
            </Box>
        </Box>
    )
}
